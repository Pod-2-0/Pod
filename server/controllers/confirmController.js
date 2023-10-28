const pool = require('../db/models');

const confirmController = {};

confirmController.getUserOrder = async (req, res, next) => {
    try {
        console.log("Get user order.");
        const id = req.params.id
        if (!id) return next({
            log: `confirmController.getUserOrder - never received an ID in query`,
            message: {
                err: 'Error in confirmController.getUserOrder. Check server logs'
            }
        });
        const userOrderQuery = `
        SELECT o.quantity, l.product_name, l.price, t.sale_total
        FROM transactions AS t
        JOIN order_items AS o
        ON t._id = o.transaction_id
        JOIN listings AS l
        ON l._id = o.listing_id
        WHERE t._id = $1;
        `

        const response = await pool.query(userOrderQuery, [id]);
        res.locals.userOrder = response.rows;
        return next();
    } catch (err) {
        return next({
            log: `confirmController.getUserOrder - querying user order from db ERROR: ${err}`,
            message: {
                err: 'Error in confirmController.getUserOrder. Check server logs'
            }
        });
    }
}


module.exports = confirmController;