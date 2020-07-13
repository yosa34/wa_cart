import App from './scripts/views/App'


new App();



/*

    テストコード

*/
// import CartItem from './scripts/models/CartItem'
// import Cart from './scripts/views/Cart';

// const pen = new CartItem(1, 'ペン', 300, 1, '文房具')
// const note = new CartItem(2, 'ノート', 400, 3, '文房具')

// const cartItems = [ pen, note ]

// const totalPrice = 1500

// const onQuantityChanged = (cartItem, quantity) => {
//     console.log('商品の数量が変更されました', cartItem, quantity)
// }

// const onDeleteItemButtonClicked = (cartItem) => {
//     console.log('商品の削除ボタンがクリックされました', cartItem)
// }

// const cart = new Cart({ 
//     cartItems,
//     totalPrice,
//     onQuantityChanged,
//     onDeleteItemButtonClicked
// })

// cart.render("#cart")