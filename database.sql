
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

-- DUMMY DATA FOR PRODUCTS (SUMMER'S LIST)
INSERT INTO "products" ("name", "image_url", "description", "coupon_code", "coupon_expiration", "url")
VALUES ('Nolé Radiance for Sensitive Skins Set', 'https://cdn.shopify.com/s/files/1/0605/8488/6478/products/CAJAS_NOLE_NUEVAS_0710_1728x.jpg?v=1645803244', 'Simply purifies, nourishes and revitalizes the scalp and hair while being extra gentle on the skin.', '1234', '2023-04-24 15:00:00', 'https://nolecare.com/collections/all/products/bundle-shampoo-conditioner-horsetail'), 
('Wild Routed Zion National Park Graphic Tee', 'https://cdn.shopify.com/s/files/1/0340/6843/0979/products/WR_Zion_Algae_Citron_Presale.png?v=1676581535&width=1280', 'A hand-drawn illustration featuring Angel''s Landing at Zion National Park in Utah. This graphic is printed on a Citron color / Bella Canvas tee using carbon-negative algae ink® by Living Ink. Printed in USA. 100% Cotton Crew Neck by Bella Canvas.', '54321', '2023-04-29 15:00:00', 'https://wildrouted.com/collections/graphic-tees/products/zion-national-park-graphic-tee'),
('Earth Breeze Laundry Detergent Eco Sheets', 'https://cdn.shopify.com/s/files/1/0364/3555/8535/files/OP-FS_3.webp?v=1665418197', 'A beautiful fragrance with fresh floral notes that will keep you smelling great.', '89701', '2023-05-24 15:00:00', 'https://www.earthbreeze.com/pages/earthbreeze-ecosheets-laundry-detergent'),
('Hear Me Raw The Brightener Oxygenating Rinse-Off Mask', 'https://cdn.shopify.com/s/files/1/0255/8479/5723/products/HMR_STRAIGHT_JARS_OPEN_CHLOROPHYLL_57907396-5b05-4406-85ef-452a3af91e81_1200x.jpg?v=1682020231', 'A 10-minute phytobioactive wash-off mask that uses chlorophyll, natural AHAs, and bakuchiol to exfoliate, oxygenate and protect skin to give you naturally firmer, brighter and more radiant, younger-looking skin.', '90874', '2023-05-21 15:00:00', 'https://hearmeraw.com/products/the-brightener-with-chlorophyll'),
('HiBar Hydrate Face Wash', 'https://cdn.shopify.com/s/files/1/0113/0227/3082/products/HiBAR_Face-Wash-HyDrate-Bar.jpg?v=1647302627&width=1206', 'Hydrate face wash is a boost of moisture for your skin. Formulated for sensitive and dry skin types. It is a creamy cleanser that works with your skin’s moisture barrier, ensuring your skin stays hydrated and healthy. Packed with amino acids and squalene to cleanse skin without stripping away natural moisture. The pH of this skin care face wash bar is between 4.5 and 5.5, matching your skin''s pH level. Safe for daily use and sensitive skin.', '49502', '2023-05-18 15:00:00', 'https://hellohibar.com/products/hydrate-face-wash?'),
('Urban Spa Moisture Magnet Shampoo', 'https://cdn.shopify.com/s/files/1/0549/1880/7722/products/US50003_880364db-4d49-450a-892a-6478165699bf_1296x.jpg?v=1615505412', 'IT’S LIKE YOUR 8 GLASSES OF WATER A DAY - BUT FOR YOUR HAIR. Moisture Magnet Moisturizing Shampoo drenches coarse, curly, and wavy hair in vitamins and minerals, plus essential fatty and amino acids for more hydrated hair. Lock in the moisture and throw away the key with this natural shampoo!', '98703', '2023-05-05 15:00:00', 'https://www.urbanspa.ca/collections/hair-care/products/moisture-magnet-shampoo');

-- DUMMY DATA FOR USERS (FOR CHAT DEMO)
INSERT INTO "users" ("username", "password", "stream_key")
VALUES ('greenThumb29', 'n/a', 'n/a'), ('sara s', 'n/a', 'n/a'), ('wildflower9', 'n/a', 'n/a'), ('brian84', 'n/a', 'n/a'), ('cacaorock', 'n/a', 'n/a'), ('amethyst-kitten', 'n/a', 'n/a'), ('fran', 'n/a', 'n/a');

-- DUMMY DATA FOR PRODUCTS (HOUSEHOLD PRODUCTS)
INSERT INTO "products" ("name", "image_url", "description", "coupon_code", "coupon_expiration", "url")
VALUES 
('BLUELAND Clean Essentials', 'https://cdn.sanity.io/images/d864s8gp/production/228382d1f02afa11a2dd94d9fc7e4cefd0ce7d64-1720x1590.jpg?rect=0,38,1720,1514&w=1536&h=1352&q=80&fit=max&auto=format', 'Our Hand Soap, Multi-Surface Cleaner, Bathroom Cleaner, and Glass + Mirror Cleaner have all of the plant-based power without any of the single-use plastic. Made to keep our home and planet in tip top shape.', '54398', '2023-05-24 15:00:00', 'https://www.blueland.com/products/the-clean-essentials?gclid=CjwKCAjw6IiiBhAOEiwALNqncRktal6EELf9_OfJRUthOFp3gjAuMG1LY_aeQUGkgbplYPhMi-nbqRoCLToQAvD_BwE'),
('BLUELAND Toilet Bowl Cleaner Set', 'https://cdn.sanity.io/images/d864s8gp/production/5fda44d4834263e57e2920f535b0892b0a640635-1720x1590.jpg?rect=0,38,1720,1514&w=1536&h=1352&q=80&fit=max&auto=format', 'The first plastic-free toilet bowl cleaner tablet that''s tough on stains but gentle on the planet. No more harsh chemicals, harmful ingredients or plastic packaging – our tablets work hard with plant-based power.', '5423', '2023-04-30 15:00:00', 'https://www.blueland.com/products/toilet-cleaner-starter-set'),
('Bee''s Wrap Roll', 'https://cdn.shopify.com/s/files/1/0211/5476/products/BW.comPDPLifestyleImages_1000x1000px_17_1200x.png?v=1675974168', 'Cut and cover just about anything with our largest and most customizable format. Just grab your scissors and create your own sizes for sandwiches, breads, fruit, cookies, and anything in between.', '59831', '2023-05-12 15:00:00', 'https://www.beeswrap.com/collections/frontpage/products/roll'),
('Reusable Wool Dryer Balls by Tru Earth', 'https://m.media-amazon.com/images/I/71OInNY2-1L._AC_SY879_.jpg', 'Softens Laundry Naturally - Made with 100% sheep wool. No Chemicals or Synthetics Used', '54892', '2023-05-22 15:00:00', 'https://www.tru.earth/Store/Wool-Dryer-Balls-by-Tru-Earth-4-Pack-XL-Premium-Reusable-Natural-Fabric-Softener'),
('Bippy Bamboo Toilet Paper', 'https://cdn.shopify.com/s/files/1/0182/7697/4692/products/BIPPY_11222020_CAPTURE_1002_1200x.jpg?v=1620192269', 'It''s like wiping with a cloud. Super smooth and always a lint-free clean. Your butt will love it. Bippy has two sides: a grippy side that deep cleans and a smooth side for dabbing dry. Whether you''re a folder or a scruncher feel good knowing no trees were harmed to make Bippy.', '589293', '2023-05-20 15:00:00', 'https://heybippy.com/products/tree-free-tp-premium-3-ply?currency=USD&variant=31220214661214&utm_medium=cpc&utm_source=google&utm_campaign=Google%20Shopping&utm_source=google&utm_medium=cpc&utm_campaign=17391522901&utm_adgroup=&utm_keyword=&utm_matchtype=&utm_creative=&utm_device=c&utm_network=x&gclid=CjwKCAjw6IiiBhAOEiwALNqnceVlJ1Zup_WL6PXs3PT3pcIb-UZotKhacsm_JuLdtodSddgrlKLTvRoCSwsQAvD_BwE'),
('Bamboozle Composter', 'https://cdn.shopify.com/s/files/1/0434/1058/7803/products/220829-BamboozleComposter-014_1944x.jpg?v=1663255003', 'Let''s send less to the landfill! Convert your own organic waste into compost to enrich the soil in your backyard. This award winning bin is perfect for storing organic scraps before transferring them to an outdoor compost pile or collection site. The filtered lid helps to absorb any smells caused from off-gassing. Includes a bamboo handle for hassle-free transport.', '58923', '2023-06-15 15:00:00', 'https://www.bamboozlehome.com/products/composter?variant=35093654864027&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gclid=CjwKCAjw6IiiBhAOEiwALNqncW7D32AHETJOkaAuwqNh-2M8pvIgWaKs6Q5POwAIOlXiTUMeqvCYVRoCqqQQAvD_BwE'),
('EarthHero Hand Crochet Frog Dog Toy', 'https://cdn.shopify.com/s/files/1/0617/2878/4620/products/Ware-of-the-Dog-Hand-Crochet-Frog-Dog-Toy-1-1_5f6d4cf7-0261-4147-bc75-e0b5db53e626_800x.jpg?v=1671244545', 'Give your pup a fun and quirky plush friend with the Hand Crochet Frog Dog Toy from Ware of the Dog! This eco-friendly dog toy is handmade by craftswomen in Turkey and made with 100% organic cotton and safe, natural dyes. Adorable and totally shakeable, it''s perfect for playtime!', '58249', '2023-05-08 15:00:00', 'https://earthhero.com/collections/ware-of-the-dog/products/ware-of-the-dog-hand-crochet-frog-dog-toy#'),
('Cozy Earth Bamboo Pillowcases', 'https://cdn.shopify.com/s/files/1/2114/3697/products/2_1200x1200.jpg?v=1669057847', 'Our ultra-soft Bamboo Pillowcases are made from 100% bamboo viscose and come in a set of two. Woven from naturally breathable and lightweight fabric, our pillowcases will keep you cool throughout the night and last for years to come.', '582931', '2023-04-25 15:00:00', 'https://cozyearth.com/products/pillow-case-set?variant=40965705531572'),
('Dazed but Amazed Complete Bed Set', 'https://cdn.shopify.com/s/files/1/0854/3658/products/IMG_0511_1296x.jpg?v=1629516627', 'Everything you need to make your bed wrapped in our linens.
GOTS certified 100% organic linen.', '41039', '2023-05-29 15:00:00', 'https://dazedbutamazed.com/en-us/collections/tonal-curated-sets/products/natural-linen-full-bed-set'),
('Earth Breeze Laundry Detergent Eco Sheets', 'https://cdn.shopify.com/s/files/1/0364/3555/8535/files/OP-FS_3.webp?v=1665418197', 'A beautiful fragrance with fresh floral notes that will keep you smelling great.', '89701', '2023-05-24 15:00:00', 'https://www.earthbreeze.com/pages/earthbreeze-ecosheets-laundry-detergent');
