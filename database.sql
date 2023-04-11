
-- Table creation queries

-- database name: omi_live

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE,
	"stream_key" VARCHAR(20) NOT NULL
);

CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255),
    "image_url" TEXT,
    "description" TEXT,
    "coupon_code" VARCHAR (255),
    "coupon_expiration" TIMESTAMP,
    "url" TEXT
);

CREATE TABLE "users_products" (
	"id" SERIAL PRIMARY KEY,
	"user_id" int REFERENCES "users" ON DELETE CASCADE,
	"product_id" int REFERENCES "users" ON DELETE CASCADE
);

CREATE TABLE "streams" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (255),
	"description" TEXT,
	"scheduled" TIMESTAMP
);

CREATE TABLE "streams_products" (
	"id" SERIAL PRIMARY KEY,
	"stream_id" INT,
	"product_id" INT,
	"order" INT
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"text" VARCHAR (255),
	"timestamp" TIMESTAMP,
	"user_id" int REFERENCES "users",
	"stream_id" int REFERENCES "streams" ON DELETE CASCADE
);
