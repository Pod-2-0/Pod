const pool = require('../db/models');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    region: process.env.S3_BUCKET_REGION
})

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
        //
        for (const listing of response.rows){
            const getObjectParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: listing.image
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, {expiresIn: 3600 });
            listing.image = url;
        }
        //
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