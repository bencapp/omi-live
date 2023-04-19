
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
    "url" TEXT,
	"public" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "users_products" (
	"id" SERIAL PRIMARY KEY,
	"user_id" int REFERENCES "users" ON DELETE CASCADE,
	"product_id" int REFERENCES "products" ON DELETE CASCADE
);

CREATE TABLE "streams" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (255),
	"description" TEXT,
	"scheduled" TIMESTAMP
);

CREATE TABLE "streams_products" (
	"id" SERIAL PRIMARY KEY,
	"stream_id" INT REFERENCES "streams" ON DELETE CASCADE,
	"product_id" INT REFERENCES "products" ON DELETE CASCADE,
	"order" INT
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"text" VARCHAR (255),
	"timestamp" TIMESTAMP,
	"user_id" int REFERENCES "users" ON DELETE CASCADE,
	"stream_id" int REFERENCES "streams" ON DELETE CASCADE
);

-- DUMMY DATA FOR PRODUCTS
INSERT INTO "products" ("name", "image_url", "description", "coupon_code", "coupon_expiration", "url")
VALUES ('Nolé Radiance for Sensitive Skins Set', 'https://cdn.shopify.com/s/files/1/0605/8488/6478/products/CAJAS_NOLE_NUEVAS_0710_1728x.jpg?v=1645803244', 'Simply purifies, nourishes and revitalizes the scalp and hair while being extra gentle on the skin.', '1234', '2023-04-24 15:00:00', 'https://nolecare.com/collections/all/products/bundle-shampoo-conditioner-horsetail'), 
('Wild Routed Zion National Park Graphic Tee', 'https://cdn.shopify.com/s/files/1/0340/6843/0979/products/WR_Zion_Algae_Citron_Presale.png?v=1676581535&width=1280', 'A hand-drawn illustration featuring Angel''s Landing at Zion National Park in Utah. This graphic is printed on a Citron color / Bella Canvas tee using carbon-negative algae ink® by Living Ink. Printed in USA. 100% Cotton Crew Neck by Bella Canvas.', '54321', '2023-04-29 15:00:00', 'https://wildrouted.com/collections/graphic-tees/products/zion-national-park-graphic-tee'),
('Earth Breeze Laundry Detergent Eco Sheets', 'https://cdn.shopify.com/s/files/1/0364/3555/8535/files/OP-FS_3.webp?v=1665418197', 'A beautiful fragrance with fresh floral notes that will keep you smelling great.', '89701', '2023-05-24 15:00:00', 'https://www.earthbreeze.com/pages/earthbreeze-ecosheets-laundry-detergent'),
('Hear Me Raw The Brightener Oxygenating Rinse-Off Mask', 'https://cdn.shopify.com/s/files/1/0255/8479/5723/products/HMR_STRAIGHT_JARS_OPEN_CHLOROPHYLL_1200x.jpg?v=1658779813', 'A 10-minute phytobioactive wash-off mask that uses chlorophyll, natural AHAs, and bakuchiol to exfoliate, oxygenate and protect skin to give you naturally firmer, brighter and more radiant, younger-looking skin.', '90874', '2023-05-21 15:00:00', 'https://hearmeraw.com/products/the-brightener-with-chlorophyll'),
('HiBar Hydrate Face Wash', 'https://cdn.shopify.com/s/files/1/0113/0227/3082/products/HiBAR_Face-Wash-HyDrate-Bar.jpg?v=1647302627&width=1206', 'Hydrate face wash is a boost of moisture for your skin. Formulated for sensitive and dry skin types. It is a creamy cleanser that works with your skin’s moisture barrier, ensuring your skin stays hydrated and healthy. Packed with amino acids and squalene to cleanse skin without stripping away natural moisture. The pH of this skin care face wash bar is between 4.5 and 5.5, matching your skin''s pH level. Safe for daily use and sensitive skin.', '49502', '2023-05-18 15:00:00', 'https://hellohibar.com/products/hydrate-face-wash?'),
('Urban Spa Moisture Magnet Shampoo', 'https://cdn.shopify.com/s/files/1/0549/1880/7722/products/US50003_880364db-4d49-450a-892a-6478165699bf_1296x.jpg?v=1615505412', 'IT’S LIKE YOUR 8 GLASSES OF WATER A DAY - BUT FOR YOUR HAIR. Moisture Magnet Moisturizing Shampoo drenches coarse, curly, and wavy hair in vitamins and minerals, plus essential fatty and amino acids for more hydrated hair. Lock in the moisture and throw away the key with this natural shampoo!', '98703', '2023-05-05 15:00:00', 'https://www.urbanspa.ca/collections/hair-care/products/moisture-magnet-shampoo');