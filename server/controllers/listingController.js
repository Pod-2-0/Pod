const pool = require('../db/models');
//import multer from 'multer';
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

//MULTR FUNCTIONALITY
//const storage = multer.memoryStorage()
//const upload = multer({ storage: storage })
//'image' must match the input property of the front-end form
//upload.single('image')
//req.file.buffer - to get actual pic info from frontend for S3

process.env.S3_BUCKET_NAME

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    region: process.env.S3_BUCKET_REGION
})
const listingController = {};

listingController.getAllListings = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in listingController.getAllListings. Check server logs'
            }
        }));
    try {
        const listingsQuery = `SELECT l.product_name AS listing,
            l.price,
            l.quantity,
            l.category,
            u.username AS seller,
            u.city,
            u.state,
            l.img_url
        FROM listings l
        JOIN users u
          ON l.seller_id = u._id;`;

        const response = await client.query(listingsQuery);
        res.locals.listings = response.rows;

    } catch (err) {
        return next({
            log: `listingController.getAllListings - querying listings from db ERROR: ${err}`,
            message: {
                err: 'Error in listingController.getAllListings. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

listingController.getListingByCategory = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController.getListingByCategory - pool connection failed ERROR : ${err}`,
            message: {
                err: 'Error in listingController.getListingByCategory. Check server logs'
            }
        }));
    try {
        const { id } = req.params;
        if (!id) return next({
            log: `listingController.getListingByCategory - never received an ID in params ERROR : ${err}`,
            message: {
                err: 'Error in listingController.getListingByCategory. Check server logs'
            }
        });
        const getListingQuery = `SELECT * FROM listings WHERE category = $1;`;
        const response = await client.query(getListingQuery, [ id ]);
        //REPLACE IMAGE PROPERTY FROM DB WITH S3 TEMP LINK BELOW
        for (const listing of response.rows){
            const getObjectParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: listing.image
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, {expiresIn: 3600 });
            listing.image = url;
        }
        //END S3
        res.locals.listing = response.rows;
    } catch (err) {
        return next({
            log: `listingController.getListingByCategory - querying listing from db ERROR: ${err}`,
            message: {
                err: 'Error in listingController.getListingByCategory. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

listingController.getListing = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR : ${err}`,
            message: {
                err: 'Error in listingController.getListing. Check server logs'
            }
        }));
    try {
        const { id } = req.params;
        if (!id) return next({
            log: `listingController.getListing - never received an ID in params ERROR : ${err}`,
            message: {
                err: 'Error in listingController.getListing. Check server logs'
            }
        });
        console.log(`passed in query param: ${id}`);
        const getListingQuery = `SELECT l.product_name AS listing,
            l.price,
            l.quantity,
            l.category,
            u.username AS seller,
            u.city,
            u.state,
            l.img_url,
        FROM listings l
        JOIN users u
            ON l.seller_id = u._id
        WHERE l._id = $1;`;

        const response = await client.query(getListingQuery, [ id ]);
        res.locals.listing = response.rows[0];
    } catch (err) {
        return next({
            log: `listingController.getListing - querying listing from db ERROR: ${err}`,
            message: {
                err: 'Error in listingController.getListing. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

listingController.createListing = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in listingController.createListing. Check server logs'
            }
        }));
    try {
        const createListingQuery = `INSERT INTO listings
                (product_name, price, quantity, category, seller_id, img_url)
            VALUES ($1, $2, $3, $4, $5, $6)`;
        console.log('request body: ', req.body);

        await client.query(createListingQuery, [
            req.body.name,
            req.body.price,
            req.body.qty,
            req.body.category,
            req.body.sellerId,
            req.body.listingUrl
        ]);
    } catch (err) {
        return next({
            log: `listingController.createListing - inserting into listings table ERROR: ${err}`,
            message: {
                err: 'Error in listingController.createListing. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

listingController.updateListing = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in listingController.updateListing. Check server logs'
            }
        }));
    try {
        const { id } = req.params;
        if (!id) return next({
            log: `listingController.updateListing - never received an ID in params ERROR : ${err}`,
            message: {
                err: 'Error in listingController.updateListing. Check server logs'
            }
        });
        console.log('passed in id param: ', id);
        console.log('request body: ', req.body);
        // const { updateVals } = req.body;
        const catsToUpdate = Object.keys(req.body);
        const newVals = Object.values(req.body);
        if (!catsToUpdate || !newVals) return next({
            log: `listingController.updateListing - improper body (categories or values) ERROR: ${err}`,
            message: {
                err: 'Error in listingController.updateListing. Check server logs'
            }
        });

        let setColumns = '';
        catsToUpdate.forEach((category, i, arr) => {
            setColumns += `${category} = $${i + 2}`;
            if (i < arr.length - 1) setColumns += ', ';
        });

        const updateListingQuery = `UPDATE listings
            SET ${setColumns}
            WHERE _id = $1
            RETURNING *`;

        const response = await client.query(updateListingQuery, [id, ...newVals]);
        res.locals.updatedListing = response.rows[0];
    } catch (err) {
        return next({
            log: `listingController.updateListing - querying listings from db ERROR: ${err}`,
            message: {
                err: 'Error in listingController.updateListing. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

listingController.deleteListing = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in listingController.deleteListing. Check server logs'
            }
        }));
    try {
        const { id } = req.params;
        if (!id) return next({
            log: `listingController.deleteListing - never received an ID in params ERROR : ${err}`,
            message: {
                err: 'Error in listingController.deleteListing. Check server logs'
            }
        });
        console.log('passed in id param: ', id);

        const deleteListingQuery = `DELETE FROM listings
            WHERE _id = $1
            RETURNING *`;

        const response = await client.query(deleteListingQuery, [ id ]);
        res.locals.deletedListing = response.rows[0];
    } catch (err) {
        return next({
            log: `listingController.deleteListing - inserting into listings table ERROR: ${err}`,
            message: {
                err: 'Error in listingController.deleteListing. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

module.exports = listingController;