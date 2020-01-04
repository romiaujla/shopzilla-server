TRUNCATE
    favourite_products,
    reviews,
    buyer,
    shop_products,
    products,
    shop,
    users
RESTART IDENTITY CASCADE;

BEGIN;

INSERT INTO users (username, password, user_type) VALUES 
    ('shopuser01', '$2a$12$fN64sChSm6YICplSHtc70eM8v3auCG6cdzSjZyP5bCLDE9kDsQQPe', 'shop'),
    ('shopuser02', '$2a$12$fN64sChSm6YICplSHtc70eM8v3auCG6cdzSjZyP5bCLDE9kDsQQPe', 'shop'),
    ('shopuser03', '$2a$12$fN64sChSm6YICplSHtc70eM8v3auCG6cdzSjZyP5bCLDE9kDsQQPe', 'shop'),
    ('shopuser04', '$2a$12$fN64sChSm6YICplSHtc70eM8v3auCG6cdzSjZyP5bCLDE9kDsQQPe', 'shop'),
    ('shopuser05', '$2a$12$fN64sChSm6YICplSHtc70eM8v3auCG6cdzSjZyP5bCLDE9kDsQQPe', 'shop'),
    ('shopuser06', '$2a$12$fN64sChSm6YICplSHtc70eM8v3auCG6cdzSjZyP5bCLDE9kDsQQPe', 'shop');

INSERT INTO shop(login_id, shop_name, address, start_date, end_date, opening_time, closing_time, service_type, description, image_url) VALUES
    (1, 'flipflops USA', '90 Kent Ave, East River State Park, Brooklyn, NY 11211', CURRENT_DATE-5, CURRENT_DATE+2,  '10:00:00', '22:00:00', 'clothing and accessories', 'Since 2004, we’ve been curating quality flip flops and casual footwear for the beach and beyond. Whatever your mood or style, you’ll find the product to match it.', 'flipflops.png'),
    (2, 'tullys coffee', '657C Gates St., Rialto, CA 92376', CURRENT_DATE+1,CURRENT_DATE+3, '12:00:00', '18:00:00', 'food and drinks', 'This "slow and low" ideology is shared by our four handpicked artists, who believe in the craft and care of their work. Follow our journey from San Francisco to Seattle as we meet four artists who add their own special spark to our Tully’s camper.', 'tully.png'  ),
    (3, 'custom boards', '9556 James Dr., Romeoville, IL 60446', CURRENT_DATE+1,CURRENT_DATE+3, '12:00:00', '18:00:00', 'sports and hobbies', 'Custom made skateboards has been selling beautifully designed boards for decoration or to even shred if you want. You can even come in with a design and we will try our best to replicate it.', 'customboards.png'  ),
    (4, 'the toy barn', '2 Arch Rd., Norman, OK 73072', CURRENT_DATE+1,CURRENT_DATE+3, '12:00:00', '18:00:00', 'toys and leisure', 'From custom made to store brand toys, discover toys you did not know existed!', 'thetoybarn.png'  ),
    (5, 'the soap shop', '34 Circle Ave., San Lorenzo, CA 94580', CURRENT_DATE+1,CURRENT_DATE+3, '12:00:00', '18:00:00', 'bath and body', 'Custom made all natural soaps, containing many scents such as Lavender, Rosemary, Mangos, and more. Come find your perfect soap!', 'thesoapshop.png'  ),
    (6, 'burgerlicious', '22 Howard Ave., Clinton, MD 20735', CURRENT_DATE+1,CURRENT_DATE+3, '12:00:00', '18:00:00', 'food and drinks', 'Best burgers you can ever try, made with my family secret ingredients, the taste will leave you speechless!', 'burgerlicious.png'  );
    -- (7, 'Bracelets of Life', '2 Wavy Rd., William, MA 12719', CURRENT_DATE+1,CURRENT_DATE+3, '12:00:00', '18:00:00', 'body healing', 'The body healing bracelets will act as an alternative medicine for curing the different physical, spiritual and emotional ailments one may have, in addition to promoting overall wellness.', 'braceletsoflife.png'  );


-- INSERT INTO buyer(login_id, name) VALUES
 -- add a buyer profile

INSERT INTO products (item, price, description, image_url) VALUES
    ('Flip Flop 1', 20.00, 'Classic water-resistant flip flops', 'flipflop-1.jpg'),
    ('Flip Flop 2', 30.00, 'Classic water-resistant flip flops', 'flipflop-1.jpg'),
    ('Flip Flop 3', 10.00, 'Classic water-resistant flip flops', 'flipflop-1.jpg'),
    ('Flip Flop 4', 12.00, 'Classic water-resistant flip flops', 'flipflop-1.jpg'),
    ('Flip Flop 5', 14.00, 'Classic water-resistant flip flops', 'flipflop-1.jpg'),
    ('Flip Flop 6', 15.00, 'Classic water-resistant flip flops', 'flipflop-1.jpg'),
    ('Flip Flop 7', 21.00, 'Classic water-resistant flip flops', 'flipflop-1.jpg'),
    ('Hot Blended Coffee', 3.00, 'Green Mountain Coffee Roasters® Breakfast Blend Coffee', 'coffee-1.png'),
    ('Dark Magic', 14.99, 'Green Mountain Coffee Roasters® Dark Magic® Coffee', 'coffee-2.png');

INSERT INTO shop_products (shop_id, product_id) VALUES
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (1,7),
    (2,8),
    (2,9);

COMMIT;