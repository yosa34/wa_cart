# wa_cart

## オブジェクト
* 商品 - Item
	* プロパティー
		* 商品画像 - img
		* 商品名 - itemName
		* カテゴリー - cetegory
		* 価格 - itemPrice
* カートの中の商品	CartItem
	* プロパティー
		* 商品画像 - img
		* 商品名 - itemName
		* カテゴリー - category
		* 価格 - itemPrice
		* 購入する数量 - quantity
* カート Cart
	* プロパティー
		* カートの中の商品たち cartItems
		* 小計 totalPrice
	* メソッド
		* カートに商品を入れる addToCart
		* カートの中の商品の数量を変更する changeCartQuantity
		* カートの中から商品を削除する deleteFromCart
		* （小計を計算する） calcTotalPrice
		* レジに移動する goToRegister