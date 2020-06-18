import Cart from './scripts/models/Cart'
import Item from './scripts/models/Item'
import CartItem from './scripts/models/CartItem'

window.Cart = Cart
window.Item = Item
window.CartItem = CartItem





const item = new Item( "ボールペン", 400, "文房具" );
console.log(item);

const cartItem = new CartItem( "ボールペン", 400, 2, "文房具" );
console.log(cartItem);
