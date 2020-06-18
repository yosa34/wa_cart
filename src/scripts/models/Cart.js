export default class Cart{

    constructor ( catItems = [] ) {
        this.catItems = catItems
        this.totalPrice = this.calcTotalPrice()
    }

    //カートに商品を入れる
    addToCart () {}

    // カートの中の商品の数量を変更する
    changeCartQuantity () {}

    //カートの中から商品を削除する
    deleteFromCart () {}

    //小計を計算する
    calcTotalPrice () { return 0; }

    //レジに移動する
    goToRegister () {}
}