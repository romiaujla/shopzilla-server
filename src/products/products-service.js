const ProductService = {
  insertProduct(db, newProduct) {
    return db('products')
      .insert(newProduct)
      .returning('*')
      .then(rows => rows[0]);
  },
  insertShopProduct(db, newShopProduct) {
    return db('shop_products')
      .insert(newShopProduct)
      .returning('*')
      .then(rows => rows[0]);
  },
  deleteProducts(db, id) {
    return db('products')
      .where({ id })
      .delete();
  },
  deleteShopProducts(db, shop_id, product_id) {
    return db('shop_products')
      .where({ shop_id })
      .andWhere({ product_id })
      .delete();
  },
  getProducts(db) {
    return db('products');
  },
  getProductsShop(db){
    return db('shop_products as sp')
      .select(
        'sp.shop_id',
        'p.id',
        'p.item',
        'p.price',
        'p.description',
        'p.image_url'
      ).join(
        'products as p',
        'p.id',
        'sp.product_id'
      );
  }
};

module.exports = ProductService;
