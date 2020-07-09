import CartItem from '../models/CartItem'

export default class Cart {

    constructor (
        cartItems = []
    ) {
        this.cartItems = cartItems
        this.calcTotalPrice()
    }

    /**
     * 商品をカートに追加する
     * 同じ商品が選択された場合は、
     * カートの中の商品の数量に1追加する
     * 
     * @param Item item 商品クラスのインスタンス
     */
    addToCart (item) {
        // CartItemのインスタンス もしくは undefined
        const itemInCart = this.cartItems.find(
            cartItem => item.id === cartItem.itemId
        )
        const hasItem = !!itemInCart

        if (hasItem) {
            this.changeCartQuantity(
                itemInCart.itemId, itemInCart.quantity + 1
                )
        } else {
            this.cartItems = [  
                ...this.cartItems,
                new CartItem(
                    item.id,
                    item.itemName,
                    item.itemPrice,
                    1,
                    item.category,
                    item.img
                )
            ]
        }
        this.calcTotalPrice()
        return this
    }
    /**
     * カートの中の商品の数量を変更する
     * quantityに0以下の値が渡された場合は、
     * その商品をカートから削除する
     * @param int itemId
     * @param int quantity
     * 
     */
    changeCartQuantity (itemId, quantity) {
        const targetCartItem = this.cartItems.find(
            cartItem => cartItem.itemId === itemId
            )
        if (targetCartItem) {
            if (quantity > 0) {
                targetCartItem.quantity = quantity
            } else {
                this.deleteFromCart(itemId)
            }
        } else {
            console.error('対象の商品がカートに入っていません')
        }
        this.calcTotalPrice()
        return this
    }
    /**
     * カートの中の商品を削除する
     * @param int itemId
     */
    deleteFromCart (itemId) {
        // const cartItems = []
        // for (let i = 0;i < this.cartItems.length; i++) {
        //     if (this.cartItems[i].itemId !== itemId) {
        //         cartItems.push(this.cartItems[i])
        //     }
        // }
        // this.cartItems = cartItems
        // this.cartItems.forEach(cartItem => {
        //     if (cartItem.itemId !== itemId) cartItems.push(cartItem)
        // })
        // this.cartItems = cartItems;
        this.cartItems = this.cartItems.filter(
            cartItem => cartItem.itemId !== itemId
            )

        this.calcTotalPrice()
        return this
    }
    calcTotalPrice () { 
        this.totalPrice = this.cartItems.reduce(
            (totalPrice, cartItem) =>
                totalPrice + (cartItem.itemPrice * cartItem.quantity), 0
        )
        return this
    }
    goToResister() {}
}
