function makeUsersArray(){
    return [
        {"username": "shopuser01", "password" : "password", "avatar_url": "no_url", "user_type": "shop"},
        {"username": "shopuser02", "password" : "password", "avatar_url": "no_url", "user_type": "shop"},
        {"username": "shopuser03", "password" : "password", "avatar_url": "no_url", "user_type": "shop"},
        {"username": "buyer01", "password" : "password", "avatar_url": "no_url", "user_type": "buyer"},
        {"username": "buyer02", "password" : "password", "avatar_url": "no_url", "user_type": "buyer"}
    ]
}

function makeShopsArray(){
    return [
        {
            "login_id": 1,
            "shop_name": "Test Shop 1",
            "address": "1234 Test Street, Test, TT 12345",
            "description": "Test description for shop # 1",
            "service_type" : "food and drinks",
        },
        {
            "login_id": 2,
            "shop_name": "Test Shop 1",
            "address": "1234 Test Street, Test, TT 12345",
            "description": "Test description for shop # 1",
            "service_type" : "food and drinks",
        },
        {
            "login_id": 3,
            "shop_name": "Test Shop 1",
            "address": "1234 Test Street, Test, TT 12345",
            "description": "Test description for shop # 1",
            "service_type" : "food and drinks",
        },
    ]
}

function makeProductsArray(){
    return [
        {"item" : "Product 1", "price" : "10.00", "description": "Test Description for Product 1", "image_url": "imageproduct1.png"},
        {"item" : "Product 2", "price" : "20.00", "description": "Test Description for Product 2", "image_url": "imageproduct2.png"},
        {"item" : "Product 3", "price" : "30.00", "description": "Test Description for Product 3", "image_url": "imageproduct3.png"},
        {"item" : "Product 4", "price" : "40.00", "description": "Test Description for Product 4", "image_url": "imageproduct4.png"}
    ]
}

function makeShopProductArray(){
    return [
        {"shop_id": 1, "product_id" : 1},
        {"shop_id": 1, "product_id" : 2},
        {"shop_id": 2, "product_id" : 3},
        {"shop_id": 3, "product_id" : 4},
    ]
}

module.exports = {
    makeShopsArray,
    makeProductsArray,
    makeUsersArray,
    makeShopProductArray,
}