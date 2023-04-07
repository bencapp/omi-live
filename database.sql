
-- Table creation queries

-- database name: omi_live

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "products" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255),
	"image_url" VARCHAR (255),
	"description" TEXT,
	"coupon_code" VARCHAR (255),
	"coupon_expiration" TIMESTAMP,
	"url" VARCHAR (255)
);

CREATE TABLE "users_products" (
	"id" SERIAL PRIMARY KEY,
	"user_id" int REFERENCES "users" ON DELETE CASCADE,
	"product_id" int REFERENCES "users" ON DELETE CASCADE
);

CREATE TABLE "streams" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (255),
	"scheduled" TIMESTAMP
);

CREATE TABLE "streams_items" (
	"id" SERIAL PRIMARY KEY,
	"stream_id" VARCHAR (255),
	"product_id" TIMESTAMP,
	"order" int
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"text" VARCHAR (255),
	"timestamp" TIMESTAMP,
	"user_id" int REFERENCES "users",
	"stream_id" int REFERENCES "streams" ON DELETE CASCADE
);
