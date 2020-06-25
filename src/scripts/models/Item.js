export default class Item{
    // 基本プロパティのみ
    constructor (
        id,
        itemName = '',
        itemPrice = 0,
        category = '',
        img = 'https://placehold.it/200x200'
    ) {
        this.id = id
        this.itemName = itemName// 商品名
        this.itemPrice = itemPrice// 価格
        this.category = category// カテゴリ
        this.img = img// 商品画像
    }

}