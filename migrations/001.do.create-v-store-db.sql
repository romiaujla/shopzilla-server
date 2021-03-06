BEGIN;

DROP TABLE IF EXISTS favourite_products;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS buyer;
DROP TABLE IF EXISTS shop_products;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS shop;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS service_type_enum;
DROP TYPE IF EXISTS user_type_enum;
DROP TYPE IF EXISTS availability_enum;

CREATE TYPE user_type_enum AS ENUM(
    'shop',
    'buyer'
);

CREATE TABLE users(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar_url TEXT DEFAULT 'default' NOT NULL,
    user_type user_type_enum NOT NULL
);

CREATE TYPE service_type_enum AS ENUM(
    'food and drinks',
    'clothing and accessories',
    'home and party decor',
    'educational',
    'body healing',
    'tattoo and piercing',
    'sports and hobbies',
    'toys and leisure',
    'bath and body'
);

CREATE TABLE shop(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    login_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
    shop_name TEXT NOT NULL,
    address TEXT NOT NULL,
    description TEXT, 
    start_date DATE DEFAULT NOW(),
    end_date DATE DEFAULT NOW(),
    opening_time TIME DEFAULT '00:00:00',
    closing_time TIME DEFAULT '00:00:00',
    service_type service_type_enum NOT NULL,
    image_url TEXT DEFAULT 'no_url' NOT NULL
);

CREATE TABLE products(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    item TEXT NOT NULL,
    
    price NUMERIC(9,2) DEFAULT 0.0,
    description TEXT NOT NUll,
    image_url TEXT DEFAULT 'no_url' NOT NULL
);

CREATE TYPE availability_enum AS ENUM(
    'available',
    'sold out'
);

CREATE TABLE shop_products(
    shop_id INTEGER REFERENCES shop(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    availability availability_enum DEFAULT 'available' NOT NULL,
    PRIMARY KEY (shop_id, product_id)
);

CREATE TABLE buyer(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    login_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
    image_url TEXT DEFAULT 'no_url' NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE reviews(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    review TEXT NOT NULL,
    rating NUMERIC(3,2) NOT NUll,
    shop_id INTEGER REFERENCES shop(id) NOT NULL,
    buyer_id INTEGER REFERENCES buyer(id) NOT NULL
);

CREATE TABLE favourite_products(
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    buyer_id INTEGER REFERENCES buyer(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, buyer_id)
);

COMMIT;