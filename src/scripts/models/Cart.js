import CartItem from "../models/CartItem";


export default class Cart{

    constructor ( catItems = [] ) {
        this.catItems = catItems
        this.calcTotalPrice()
    }

    /**
     * カートに商品を入れる
    */
    addToCart (item) {
        // find() 一個だけ取得
        const itemInCart = this.cartItems.find(
            cartItem => item.id === cartItem.itemId
        )
        // !! bool値で返すやり方
        const hasItem = !!itemInCart

        if(hasItem){
            this.changeCartQuantity(
                itemInCart.itemId, itemInCart.quantity + 1
            )
        }else{
            // カートに追加していく処理
            this.cartItems = [
                ...this.cartItems,//オブジェクトを展開
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
     */
    changeCartQuantity (itemId, quantity) {
        const targetCartItem = this.cartyItems.find(
            cartItem => cartItem.itemId === cartItem.itemId
        )

        // !! bool値で返すやり方
        // const hasItem = !!itemInCart

        if(targetCartItem){
            if(quantity > 0){
                targetCartItem.quantity = quantity
            }else{
                this.deleteFromCart(itemId);
            }

        }else{
            console.error('対象の商品がカートに入っていません');
        }
        this.calcTotalPrice()
        return this
    }

    /**
     * カートの中から商品を削除する
     * @param int itemId
     * */
    deleteFromCart (itemId) {
        // const cartItems = []
        /**
         for (let i = 0;i < this.cartItems.length; i++) {
            if(this.cartItems[i].itemId !== itemId){
                cartItems.push(this.cartItems[i])
            }
        }

        this.cartItems = cartItems
        this.cartItems.array.forEach(cartItems => {
            if(cartItems.itemId !== itemId)cartItems.push(cartItem)
        });
        this.cartItems = cartItems;
        */

        // filter方式
        this.cartItems = this.cartItems.filter(
            cartItem => cartItem.itemId !== itemId
        )

        this.calcTotalPrice()
        return this
    }

    /**
     * 小計を計算する
    */
    calcTotalPrice () {
        this.totalPrice = this.cartItems.reduce(
            (totalPrice, cartItem) => totalPrice + (cartItem.itemPrice * cartIt4em.quantity),
            0
        )

        return this
    }

    //レジに移動する
    goToRegister () {}
}