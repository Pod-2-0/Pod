const pool = require('../db/models');

const cartController = {};

cartController.getUserCart = async (req, res, next) => {
    try {
        // TODO:change to actual logic to get userId when login is functional
        // const id = req.user.id;
        const id = 1
        if (!id) return next({
            log: `cartController.getUserCart - never received an ID in query`,
            message: {
                err: 'Error in cartController.getUserCart. Check server logs'
            }
        });
        console.log(`passed in query param: ${id}`);
        const userCartQuery = `
        SELECT c.quantity, c.listing_id, c._id, l.product_name, l.price,
        l.image, u.username AS seller_name
        FROM cart_items AS c
        JOIN listings AS l
        ON l._id = c.listing_id
        JOIN users AS u
        ON u._id = l.seller_id
        WHERE c.user_id = $1;
        `

        const response = await pool.query(userCartQuery, [id]);
        res.locals.userCart = response.rows;
        return next();
    } catch (err) {
        return next({
            log: `cartController.getUserCart - querying user cart from db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.getUserCart. Check server logs'
            }
        });
    }
}

cartController.addToUserCart = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `cartController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in cartController.addToUserCart. Check server logs'
            }
        }));
    try {
        const { userId, listingId, qty } = req.query;
        if (!userId || !listingId || !qty) return next({
            log: `cartController.addToUserCart - never received user and/or listing ID(s) and/or qty in query ERROR`,
            message: {
                err: 'Error in cartController.addToUserCart. Check server logs'
            }
        });
        console.log(`user id: ${userId}`);
        console.log(`listing id: ${listingId}, qty: ${qty}`);

        // check if user already has item in cart
        const checkQuery = `SELECT quantity FROM carts
        WHERE user_id = $1 AND listing_id = $2`;
        const checkResponse = await client.query(checkQuery, [ userId, listingId ]);
        // console.log('what do we got?', checkResponse);
        if (checkResponse.rows.length) {
            console.log('We got something already');
            console.log('we have this many already: ', checkResponse.rows[0].quantity);
            req.query.qty = parseInt(qty) + checkResponse.rows[0].quantity;
            return cartController.updateUserCart(req, res, next);
        }
        
        const addToCartQuery = `INSERT INTO carts
        VALUES ($1, $2, $3);`
        await client.query(addToCartQuery, [ userId, listingId, qty ]);
        client.release();
        return next();
    } catch (err) {
        return next({
            log: `cartController.addToUserCart - inserting into user cart in db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.addToUserCart. Check server logs'
            }
        });
    }
}

cartController.updateUserCart = async (req, res, next) => {
    try {
        const { cartId, quantity} = req.body;
        if (!cartId || !quantity || quantity <= 0) return next({
            log: `cartController.updateUserCart - never received cartId and/or quantity in body ERROR`,
            message: {
                err: 'Error in cartController.updateUserCart. Check server logs'
            }
        });
        console.log(`cart id: ${cartId}`);
        console.log(` NEW qty: ${quantity}`);
        const updateCartQuery = `UPDATE cart_items
        SET quantity = $1
        WHERE _id = $2;`;

        await pool.query(updateCartQuery, [ quantity, cartId ]);
        return next();
    } catch (err) {
        return next({
            log: `cartController.updateUserCart - altering user cart in db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.updateUserCart. Check server logs'
            }
        });
    }
}

cartController.removeCartItem = async (req, res, next) => {

    try {
        console.log("enter removeCartItem controller");
        const { cartId } = req.params;
        if (!cartId) return next({
            log: `cartController.removeCartItem - never received cartId in params ERROR`,
            message: {
                err: 'Error in cartController.removeCartItem. Check server logs'
            }
        });
        console.log(`cart id: ${cartId}`);

        const removeItemQuery = `DELETE FROM cart_items
        WHERE _id = $1;`;
        await pool.query(removeItemQuery, [ cartId ]);
        return next();
    } catch (err) {
        return next({
            log: `cartController.removeFromCart - deleting from user cart in db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.removeFromCart. Check server logs'
            }
        });
    }
}

module.exports = cartController;