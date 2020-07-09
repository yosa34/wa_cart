import { createDom } from '../helper'

export default class Cart {

    constructor ({ 
      cartItems = [],
      totalPrice = 0,
      onQuantityChanged = () => {},
      onDeleteItemButtonClicked = () => {}    
    }) {

        this.cartItems = cartItems;
        this.totalPrice = totalPrice;
        this.onQuantityChanged = onQuantityChanged;
        this.onDeleteItemButtonClicked = onDeleteItemButtonClicked;
    }

    render(parent = '') {
        const domText = `
          <div class="card">
            <table class="bordered">
              <tbody>
              <tr>
                <th class="center-align">商品名</th>
                <th class="center-align">数量</th>
                <th class="center-align">合計金額</th>
                <th class="center-align">削除</th>
              </tr>
              </tbody>

              <tbody class="cart-list">
                ${this.cartItems.reduce(
                  (txt, cartItem) => txt += this.createListHTMLString(cartItem), ''
                )}
              </tbody>

              <tbody class="total">
              <tr>
                <td>合計</td>
                <td colspan="3" class="total right-align">
                  <small>¥</small><span class="total-price">${this.totalPrice}</span>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="card-action center-align">
              <button class="btn">購入する</button>
            </div>
          </div>
        `;

        const targetDom = document.querySelector(parent);
        
        const appendDom = createDom(domText);

        targetDom.append(appendDom);

        // イベントの設定
        // onQuantityChanged
        const changeQuantityInputs = targetDom.querySelectorAll('.js-change-quantity')
        changeQuantityInputs.forEach(input => {
          input.addEventListener('change', this.handleQuantityChange.bind(this))
        })

        // onDeleteItemButtonClicked
        const deleteItemButtons = targetDom.querySelectorAll('.js-remove-item')
        deleteItemButtons.forEach(button => {
          button.addEventListener('click', this.handleDeleteItem.bind(this))
        })

    }

    createListHTMLString (cartItem) {
      return `
                <tr>
                    <td>${cartItem.itemName}</td>
                    <td>
                        <input data-item-index="${cartItem.itemId}" value="${cartItem.quantity}" type="number" class="js-change-quantity" size="2">個
                    </td>
                    <td class="right-align">¥${cartItem.quantity * cartItem.itemPrice}</td>
                    <td class="center-align">
                        <button data-item-index="${cartItem.itemId}" class="btn red js-remove-item">削除</button>
                    </td>
                </tr>
      `;
    }

    handleQuantityChange (evt) {
      evt.preventDefault()
      const elem = evt.target
      const quantity = parseInt(elem.value)
      const targetItemId = parseInt(elem.dataset.itemIndex)

      const targetItem = this.cartItems.find(
        cartItem => cartItem.itemId === targetItemId
        )

      this.onQuantityChanged(targetItem, quantity)

    }

    handleDeleteItem (evt) {
      evt.preventDefault()
      const targetItemId = parseInt(evt.target.dataset.itemIndex)
      const targetItem = this.cartItems.find(
        cartItem => cartItem.itemId === targetItemId
        )

      this.onDeleteItemButtonClicked(targetItem)
    }


}