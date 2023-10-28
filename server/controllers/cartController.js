const pool = require('../db/models');

const cartController = {};

cartController.getUserCart = async (req, res, next) => {
    try {
        // TODO:change to actual logic to get userId when login is functional
        // const id = req.user;
        const id = 1
        if (!id) return next({
            log: `cartController.getUserCart - never received an ID in query`,
            message: {
                err: 'Error in cartController.getUserCart. Check server logs'
            }
        });
        const userCartQuery = `
        SELECT c.quantity, c.listing_id, c._id, l.product_name, l.price,
        l.image, u.username AS seller_name, u._id AS seller_id
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

// cartController.addToUserCart = async (req, res, next) => {
//     const client = await pool.connect()
//         .catch(err => next({
//             log: `cartController - pool connection failed ERROR: ${err}`,
//             message: {
//                 err: 'Error in cartController.addToUserCart. Check server logs'
//             }
//         }));
//     try {
//         const { listingId, qty } = req.body;
//         if (!listingId || !qty) return next({
//             log: `cartController.addToUserCart - never received listing ID(s) and/or qty in query ERROR`,
//             message: {
//                 err: 'Error in cartController.addToUserCart. Check server logs'
//             }
//         });
//         console.log(`user id: ${req.user}`);
//         console.log(`listing id: ${listingId}, qty: ${qty}`);

//         // check if user already has item in cart
//         const checkQuery = `SELECT quantity FROM cart
//         WHERE user_id = $1 AND listing_id = $2`;
//         const checkResponse = await client.query(checkQuery, [userId, listingId]);
//         // console.log('what do we got?', checkResponse);
//         if (checkResponse.rows.length) {
//             console.log('We got something already');
//             console.log('we have this many already: ', checkResponse.rows[0].quantity);
//             req.query.qty = parseInt(qty) + checkResponse.rows[0].quantity;
//             return cartController.updateUserCart(req, res, next);
//         }

//         const addToCartQuery = `INSERT INTO carts
//         VALUES ($1, $2, $3);`
//         await client.query(addToCartQuery, [userId, listingId, qty]);
//         client.release();
//         return next();
//     } catch (err) {
//         return next({
//             log: `cartController.addToUserCart - inserting into user cart in db ERROR: ${err}`,
//             message: {
//                 err: 'Error in cartController.addToUserCart. Check server logs'
//             }
//         });
//     }
// }

cartController.updateUserCart = async (req, res, next) => {
    try {
        const { cartId, quantity } = req.body;
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

        await pool.query(updateCartQuery, [quantity, cartId]);
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
        await pool.query(removeItemQuery, [cartId]);
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

cartController.addCartItem = async (req, res, next) => {

    try {
        console.log("enter addCartItem controller");
        console.log(req.body)
        const { listingId, qty } = req.body;
        if (!listingId) return next({
            log: `cartController.addCartItem - never received listingId in req.body ERROR`,
            message: {
                err: 'Error in cartController.addCartItem. Check server logs'
            }
        });
        console.log(`listingId: ${listingId}`);
        console.log(`quantity: ${qty}`)
        const checkItemInCartQuery = `SELECT _id, quantity FROM cart_items
        WHERE user_id = $1 AND listing_id = $2`
        const checkItemInCart = await pool.query(checkItemInCartQuery, [1, listingId])
        console.log(checkItemInCart)
        if (checkItemInCart.rows[0]) {
            console.log('this item exists in the cart already')
            const updateItemQuantityQuery = `UPDATE cart_items
            SET quantity = $1
            WHERE _id = $2;`
            const newQuantity = qty + parseInt(checkItemInCart.rows[0].quantity)
            const updateItemQuantity = await pool.query(updateItemQuantityQuery, [newQuantity, checkItemInCart.rows[0]._id])
            res.locals.updateQuantity = newQuantity
            res.locals.cartId = checkItemInCart.rows[0]._id
            return next();
        }
        const addItemQuery = `INSERT INTO cart_items (user_id, listing_id, quantity) VALUES ($1, $2, $3) RETURNING _id`;
        const cartId = await pool.query(addItemQuery, [1, listingId, qty]);
        console.log(cartId)
        res.locals.cartId = cartId.rows[0]._id
        return next();
    } catch (err) {
        return next({
            log: `cartController.addCartItem - add to cart in database, db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.addCartItem. Check server logs'
            }
        });
    }
}

cartController.checkout = async (req, res, next) => {
    const client = await pool.connect()
    try {
        const saleTotal = req.body.saleTotal;
        //TODO: change to userId when login is functional
        const userId = 1;
        if (!userId) return next({
            log: `cartController.checkout - never received a cartId`,
            message: {
                err: 'Error in cartController.checkout Check server logs'
            }
        });
        console.log(`passed in res.locals: ${userId}`);
        await client.query('BEGIN')
        // insert into transaction table
        const transactionQuery = `
        INSERT INTO transactions (user_id, date, sale_total)
        VALUES ($1, CURRENT_TIMESTAMP, $2)
        RETURNING _id AS "transaction_id"
        `

        const transactionParams = [userId, saleTotal]
        const response = await client.query(transactionQuery, transactionParams);
        const transactionId = response.rows[0].transaction_id;

        // insert into order_items table
        const cartItems = res.locals.userCart;
        for (let i = 0; i < cartItems.length; i++) {
            const orderItemQuery = `
            INSERT INTO order_items (transaction_id, listing_id, quantity, date, seller_id)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)
            `
            const orderItemParams = [transactionId, cartItems[i].listing_id, cartItems[i].quantity, cartItems[i].seller_id];
            await client.query(orderItemQuery, orderItemParams);

        }

        // empty cart_items for this user
        const deleteCartQuery = `DELETE FROM cart_items
        WHERE user_id = $1;`;
        await client.query(deleteCartQuery, [userId]);


        await client.query('COMMIT')

        res.locals.checkout = transactionId;
        return next();
    } catch (err) {
        return next({
            log: `cartController.checkout - querying transaction from db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.checkout. Check server logs'
            }
        });
    }
}

module.exports = cartController;