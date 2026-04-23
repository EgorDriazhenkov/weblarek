import './scss/styles.scss';
import {Basket} from './components/Models/Basket.ts'
import {Buyer} from './components/Models/Buyer.ts'
import {Products} from './components/Models/Products.ts'
import { BasketView } from './components/views/BasketView.ts';
import { CardBasket } from './components/views/CardBasket.ts';
import { CardCatalog } from './components/views/CardCatalog.ts';
import { CardPreview } from './components/views/CardPreview.ts';
import { ContactForm } from './components/views/ContactForm.ts';
import { Gallery } from './components/views/Gallery.ts';
import { Header } from './components/views/Header.ts';
import { Modal } from './components/views/Modal.ts';
import { OrderForm } from './components/views/OrderForm.ts';
import { OrderSuccess } from './components/views/OrderSuccess.ts';
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { LinkServer } from "./components/Comunication/LinkServer.ts";
import { EventEmitter } from './components/base/Events.ts';
import { cloneTemplate } from './utils/utils.ts';
import { IProduct } from './types/index.ts';

const events = new EventEmitter()

const products = new Products(events);
const basket = new Basket(events)
const buyer = new Buyer(events)

const headerElement = document.querySelector('.header')
const modalElement = document.querySelector('.modal')
const galleryElement = document.querySelector('.gallery')
const basketElement = cloneTemplate('#basket')

const basketView = new BasketView( events, basketElement);
const orderFormView = new OrderForm(events, cloneTemplate('#order'))
const contactsFormView = new ContactForm(events, cloneTemplate('#contacts'))
const successView = new OrderSuccess(events, cloneTemplate('#success'));
const header = new Header(events, headerElement as HTMLElement);
const modal = new Modal(events, modalElement as HTMLElement)
const gallery = new Gallery(galleryElement as HTMLElement)


const api = new Api(API_URL);
const answerServer = new LinkServer(api);
(async () => {
  try {
  const data = await answerServer.getProducts();
  const productItems = data.items;
  products.setProducts(productItems);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
})();

console.log(basketView)

events.onAll((event) => {
    console.log('msg->', event.eventName, event.data)
})

events.on('product:change', () => {
  const cardCatalog = products.getProducts().map((item) => {
   const card = new CardCatalog(cloneTemplate('#card-catalog'), { 
      onClick: () => events.emit('card:selected', item)
   });
   return card.render(item)
  })
  gallery.render({catalog: cardCatalog })
})

events.on('card:selected', (item: IProduct) => {
    const card = new CardPreview(cloneTemplate('#card-preview'), { 
      onClick: () => { 
        if (basket.checkProductInBasket(item.id)) {
          events.emit('product:remove', item)
          card.inBasket = basket.checkProductInBasket(item.id)
        } else{
          events.emit('product:addInBasket', item)
          card.inBasket = basket.checkProductInBasket(item.id)
        }
        }
   });
  card.inBasket =  basket.checkProductInBasket(item.id)
  if(item.price === null) {
    card.unavailability = true;
  }
  const cardPreview = card.render(item);
  modal.render({content: cardPreview, display: true})
})

events.on('modal:close', () => {
  modal.display = false;
})

events.on('product:addInBasket', (item: IProduct) => {
  basket.addItem(item)
})

events.on('backet:change', () => {
  header.render({'counter': basket.getProductsQuantity()})
  const productsInBasket = basket.items.map((item, index) => {
    const card = new CardBasket(cloneTemplate('#card-basket'), {
      onClick: () => events.emit('product:remove', item)
    })
    card.basketItemIndex = index + 1;
    return card.render(item)
  });
  basketView.render({basketList: productsInBasket, totalPrice: basket.getProductsPrice()})

  if (basket.getProductsQuantity() > 0) {
    basketView.valid = true;
  } else {
    basketView.valid = false;
  }
})

events.on('basket:open', () => {
  modal.render({content: basketView.render(), display: true})
})

events.on('product:remove', (item: IProduct) => {
  basket.removeItem(item)
})

events.on('basket:order', () => {
  modal.render({content: orderFormView.render(), display: true})
})

events.on('form:onlineButtonSelected', () => {
  buyer.payment = "online"
})

events.on('form:cardButtonSelected', () => {
  buyer.payment = "card"
})

events.on('form:change', (item: {field: string, value: string}) => {
  switch (item.field) {

    case 'address': buyer.address = item.value
    break

    case 'email': buyer.email = item.value
    break

    case 'phone': buyer.phone = item.value
    break
  }
})

events.on('buyer:change', () => {
  const validate = buyer.validate();

  if (!validate.address && !validate.payment) {
    orderFormView.valid = true;
    orderFormView.error = "" 
  } else {
    orderFormView.error = `${validate.address}` + `${validate.payment}`
    orderFormView.valid = false;
  }
  
  if (!validate.email && !validate.phone) {
    contactsFormView.valid = true;
    contactsFormView.error = "" 
  } else {
    contactsFormView.error = `${validate.email}` + `${validate.phone}`
    contactsFormView.valid = false;
  }
})

events.on('form:orderSubmit', () => {
  modal.render({content: contactsFormView.render(), display: true})
})

events.on('form:contactsSubmit', () => {
  const itemsId = basket.items.map(item => item.id)
  answerServer.sendOrder({
   payment: buyer.payment,
   email: buyer.email,
   phone: buyer.phone,
   address:buyer.address,
   total: basket.getProductsPrice(),
   items: itemsId
  })
  .then((data) => {
    modal.render({content: successView.render({total: data.total}), display: true})
    console.log('Заказ на сервер отправлен успешно')
    basket.clearBusket();
  })
  .catch((error) => {
    console.error('Ошибка при отправке заказа:', error);
    alert('Произошла ошибка при отправке данных на сервер')
  })
})
