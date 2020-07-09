import { createDom } from '../helper'
/**
 * 商品一覧のコンポーネント
 * 商品一覧のコンポーネントなので、商品一覧データが必要
 * カートに入れるというアクションが実行できるようにしなければならない
 */
export default class ItemList {

    constructor ({ items = [], onAddToCartButtonClicked = () => {}  }) {
        this.items = items
        this.onAddToCartButtonClicked = onAddToCartButtonClicked;
    }

    render (parent = '') {

        const domText = `
          <div class="item-wrap">
          ${this.items.reduce(
              (txt, item) =>
                txt += this.createListHTMLString(item), ''
            )}
          </div>
        `

        /**
         * レンダリングする親のDOMを取得する
         */
        const targetDom = document.querySelector(parent)
        // 中身をリセットする
        targetDom.innerHTML = ''
        /**
         * domTextをDOM化する
         */
        const appendDom = createDom(domText)

        /**
         * appendDomをtargetDomにappendする
         */
        targetDom.append(appendDom)

        /**
         * ボタンの要素を取得してくる
         */
        const addToCartButtons = targetDom.querySelectorAll('.js-add-to-cart'); 
        // それぞれのボタンにクリックイベントを指定する
        addToCartButtons.forEach((btn) => {
          // クリックイベントを設定する
          // bindで親のthis(ItemList)を参照できるようにする
          btn.addEventListener('click', this.handleAddToCart.bind(this))
        })


    }
    
    /**
     * 商品一覧の項目のHTML文字列を作成する
     * 
     * @param Item item
     * @returns string
     */
    createListHTMLString(item) {
        return `
            <div class="item card horizontal">
              <div class="card-image">
                <img src="${item.img}">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <p>${item.itemName}</p>
                  <p class="price"><small>¥</small>${item.itemPrice}</p>
                </div>
                <div class="card-action right-align">
                  <button href="javascript: void(0);" data-item-index="${item.id}" class="btn js-add-to-cart">カートに入れる</button>
                </div>
              </div>
            </div>
        `
    }

    handleAddToCart(evt) {
      // 要素が持つデフォルトの挙動を行わないようにする
      evt.preventDefault();
      /**
       * 対象の商品の情報を取得する
       */
      const targetItemId = parseInt(evt.target.dataset.itemIndex);
      // console.log(this.items, targetItemId)
      const targetItem = this.items.find(item => item.id === targetItemId);

      // console.log(targetItem);

      // 外から渡されているイベントを実行する
      // イベントを実行するときに、対象となる商品のオブジェクトを渡す
      this.onAddToCartButtonClicked(targetItem);
    }

}