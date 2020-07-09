export default class CartItem{
    constructor (
        itemId,
        itemName = '',
        itemPrice = 0,
        quantity = 0,
        category = '',
        img = 'https://placehold.it/200x200'
    ) {

        this.itemId = itemId
        this.itemName = itemName// 商品名itemName
        this.itemPrice = itemPrice// 価格itemPrice
        this.quantity = quantity// 購入する数量quantity
        this.category = category// カテゴリcategory
        this.img = img // 商品画像img
    }
}