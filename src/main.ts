import './scss/styles.scss';
import {apiProducts} from './utils/data.ts'
import {Basket} from './components/Models/Basket.ts'
import {Buyer} from './components/Models/Buyer.ts'
import {Products} from './components/Models/Products.ts'
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { LinkServer } from "./components/Comunication/LinkServer.ts";

const productsModel = new Products();
productsModel.setProducts(apiProducts.items)
console.log("Массив товаров из каталога:", productsModel.getProducts())
console.log("Получение продукта по id:", productsModel.getProductById("b06cde61-912f-4663-9751-09956c0eed67"))
productsModel.setSelectedPoduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
console.log("Получение товара для подробного отображения:", productsModel.getSelectedPoduct())

const basketModel = new Basket()
basketModel.addItem(apiProducts.items[0])
basketModel.addItem(apiProducts.items[1])
basketModel.addItem(apiProducts.items[2])
basketModel.removeItem(apiProducts.items[1])
console.log("Выбранные товары в корзине:", basketModel.items)
console.log("Общая стоимость товаров:", basketModel.getProductsPrice())
console.log("Общее колличество товаров в корзине:", basketModel.getProductsQuantity())
console.log("Есть ли товар в корзине:", basketModel.checkProductInBasket("854cef69-976d-4c2a-a18c-2aa45046c390"))
basketModel.clearBusket()
console.log("Выбранные товары в корзине после очищения:", basketModel.items)


const buyerModel = new Buyer()
buyerModel.address = "Большая коретная";
buyerModel.email = "Vysotskii.com";
buyerModel.payment = "card";
buyerModel.phone = "88005553535"
console.log("Данные покупателя:", buyerModel.getAllData())
console.log("Объект валидации:", buyerModel.validate())
buyerModel.clear()
console.log("Объект валидации после очищения данных:", buyerModel.validate())

const api = new Api(API_URL);
const answerServer = new LinkServer(api);
(async () => {
  try {
  const data = await answerServer.getProducts();
  const products = data.items;
  const productsModelServer = new Products();
  productsModelServer.setProducts(products);
  console.log("Каталог, полученный с сервера:", productsModelServer.getProducts());
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
})();
