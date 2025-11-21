// empty cart object created for new cart state
export function CartObject() {
  this.items = [];
  this.subTotal = 0;
  this.coupons = [];
  this.total = 0;
}

// cart item object created for each item added to the cart
export function CartItemObject(product, variation, price, quantity) {
  this.productId = product.id;
  this.title = product.title;
  this.slug = product.slug;
  this.image = product.image;
  this.stock = product.stock;
  this.price = price;
  this.variation = variation;
  this.quantity = quantity;
}
