SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';
SET default_table_access_method = heap;

DROP TABLE public.users;
CREATE TABLE public.users (
	"_id" serial PRIMARY KEY,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"pw" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"address" varchar NOT NULL,
	"city" varchar NOT NULL,
	"resident_state" varchar NOT NULL,
	"zip" integer NOT NULL,
	"phone" integer NOT NULL
);

DROP TABLE public.listings;
CREATE TABLE public.listings (
	"_id" serial PRIMARY KEY,
	"product_name" varchar NOT NULL,
	"price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"category" varchar NOT NULL,
	"product_description" varchar NOT NULL,
    "image" varchar NOT NULL,
	"discount_id" integer NOT NULL,
	"seller_id" integer NOT NULL,
	"resident_state" varchar NOT NULL,
	"zip" integer NOT NULL,
	"phone" integer NOT NULL
);

DROP TABLE public.transactions;
CREATE TABLE public.discounts (
    "_id" SERIAL PRIMARY KEY, 
    "valid_discount" boolean,
    "discount_percentage" varchar NOT NULL,
    "created_at" TIMESTAMP,
    "modified_at" TIMESTAMP,
    "deleted_at" TIMESTAMP
);

DROP TABLE public.transactions;
CREATE TABLE public.transactions (
    "_id" SERIAL PRIMARY KEY,
	"user_id" integer,
    "date" TIMESTAMP,
    "sale_total" integer NOT NULL
);

DROP TABLE public.order_items;
CREATE TABLE public.order_items (
    "_id" SERIAL PRIMARY KEY,
    "transaction_id" integer NOT NULL,
    "listing_id" integer NOT NULL,
    "quantity" integer NOT NULL,
    "date" TIMESTAMP,
    "seller_id" integer NOT NULL
--    FOREIGN KEY ("seller_id") REFERENCES public.users("_id")
);

DROP TABLE public.cart_items;
CREATE TABLE public.cart_items(
"_id" SERIAL PRIMARY KEY,
"user_id" integer NOT NULL, 
"listing_id" integer NOT NULL,
"quantity" integer NOT NULL
-- FOREIGN KEY ("user_id") REFERENCES public.users("_id")
);

INSERT INTO public.users VALUES (
	1, 
	'user',
	'fakeEmail@gmail.com',
	'password',
	'John',
	'Doe',
	'Fake Addy',
	'Fake City',
	'LA',
	1111,
	2222
);

-- CREATE TABLE public.transactions (
--     "_id" SERIAL PRIMARY KEY,
-- 	"user_id" integer NOT NULL,
--     "date" TIMESTAMP,
--     "sale_total" integer NOT NULL
-- );
-- INSERT INTO public.transactions VALUES (
-- 	1,
-- 	1,
-- 	0000-11-22 33:44:55,
-- 	3333.44
-- )


-- CREATE TABLE public.comments (
--     comment_id BIGSERIAL UNIQUE NOT NULL,
--     commenter_id BIGINT NOT NULL,
--     creation_timestamp TIMESTAMP NOT NULL,
--     comment VARCHAR(16384),
--     resolved BOOLEAN NOT NULL,
--     PRIMARY KEY (comment_id)
-- )

-- ALTER TABLE public.listings ADD CONSTRAINT "people_fk0" FOREIGN KEY ("species_id") REFERENCES  public.users("_id");
-- ALTER TABLE public.listings FOREIGN KEY ("seller_id") REFERENCES  public.users("_id");


-- ALTER TABLE public.listings ADD CONSTRAINT "listings_fk0" FOREIGN KEY ("seller_id") REFERENCES public.users("_id");
-- ALTER TABLE public.listings ADD CONSTRAINT "listings_fk1" FOREIGN KEY ("discount_id") REFERENCES public.discounts("_id");

-- WORKS 
ALTER TABLE public.transactions ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");

-- ALTER TABLE public.order_items ADD CONSTRAINT "order_items_fk0" FOREIGN KEY ("transaction_id") REFERENCES public.transactions("_id");
-- ALTER TABLE public.order_items ADD CONSTRAINT "order_items_fk1" FOREIGN KEY ("listing_id") REFERENCES public.listings("_id");
-- ALTER TABLE public.order_items ADD CONSTRAINT "order_items_fk2" FOREIGN KEY ("seller_id") REFERENCES public.users("_id");
 
-- ALTER TABLE public.cart_items ADD CONSTRAINT "cart_items_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
-- ALTER TABLE public.cart_items ADD CONSTRAINT "cart_items_fk1" FOREIGN KEY ("listing_id") REFERENCES public.listings("_id");