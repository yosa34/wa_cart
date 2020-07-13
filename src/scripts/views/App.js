import axios from 'axios';
import {createDom} from '../helper';
// Model
import Item from '../models/Item';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
// View
import ItemList from './ItemList';
import CartView from './Cart';

export default class App {
    constructor () {
        this.init();
    }

    init(){
        this.getItems()
            .then((items) => {
                console.log('作成したItems一覧', items);
                // itemsを使って、ItemListのインスタンスを作成
                this.items = items;
                // Cartモデルのインスタンスを作成
                // CaartインスタンwすをAppのメンバに追加
                this.cart = new Cart();

                this.render('#app');
            })
            .catch((err) => {
                alert('エラーが発生しました：',err);
            });
    }

    /**
     * APIにアクセスしてデータを取得する
     * 取得したデータをItemkurasuのインスタンスとしてPrimiseを返す
     * @returns {Primise}
     */
   getItems(){
        //returnを忘れない
        return axios.get('https://cart-api.layout1.vercel.app')
            .then((resp) => {
                console.log('response内容', resp);
                // 取得したデータを使ってItemインスタンスの配列を作成
                const items = resp.data.map((item) => new Item(
                    item.id,
                    item.itemName,
                    item.itemPrice,
                    item.category,
                    item.img
                ));
                console.log('items:', items);
                return Promise.resolve(items);
            })
            .catch((err)=>{
                console.log('errorが発生しました', err);
            });
   }
   render(parent = ''){
        const domTxt = `
                    <div class="container main-content">
                        <div class="row">
                            <div id="items" class="col m7"></div>
                            <div id="cart" class="col m5"></div>
                        </div>
                    </div>`;

        const appendDom = createDom(domTxt);

        // ItemListのインスタンスを作成
        const itemList = new ItemList({
            items: this.items,
            onAddToCartButtonClicked: this.addToCart.bind(this)
        })

        // レンダリング処理
        const targetDom = document.querySelector(parent);

        targetDom.append(appendDom);

        // itemListのレンダリング
        itemList.render('#items');

        // renderCart実行
        this.renderCart();

   }


   renderCart() {
        // CartViewのインスタンスを作成
        const cartView = new CartView({
            cartItems: this.cart.cartItems,
            totalPrice: this.cart.totalPrice,
            onDeleteItemButtonClicked: this.deleteFromCart.bind(this),
            onQuantityChanged: this.changeQuantity.bind(this),

        })
        // cartViewのレンダリング
        cartView.render('#cart');
   }

   /**
    * 
    * @param {Item} item
    *  */
   addToCart(item) {
        console.log('カートに入れるが押されました', item);
        this.cart.addToCart(item);
        console.log(this);
        this.renderCart();
   }
      /**
    * 
    * @param {cartItem} cartItem
    *  */
   deleteFromCart(cartItem) {
        this.cart.deleteFromCart(cartItem.itemId);
        this.renderCart();
   }
   
   changeQuantity() {

   }
}