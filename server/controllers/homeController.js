const pool = require('../db/models');

const homeController = {};

homeController.getDiscountedListings = async (req, res, next) => {
    console.log('------> FROM homeController.getDiscountedListings');
    try {
        const discountedListingsQuery = `
        SELECT 
        l._id, l.product_name, l.price, l.category, l.image, d.discount_percentage
        FROM listings AS l
        INNER JOIN discounts AS d
        ON l.discount_id = d._id
        `;

        const response = await pool.query(discountedListingsQuery);
        res.locals.discountedListings = response.rows;

        return next();
    }
    catch(err) {
        return next({
            log: `homeController.getDiscountedListings: Querying listings that have discount_id from DB ERROR: ${err}`,
            message: {
                err: 'Error in homeController.getDiscountedListings. Check server logs'
            }
        });
    }
};

module.exports = homeController;