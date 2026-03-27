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
console.log("Массив товаров из каталога", productsModel.getProducts)

const basketModel = new Basket()
basketModel.addItem(apiProducts.items[0])
basketModel.addItem(apiProducts.items[2])
console.log("Выбранные товары в корзине", basketModel.items)
console.log("Общая стоимость товаров", basketModel.getProductsPrice())

const buyerModel = new Buyer()
buyerModel.address = "Большая коретная";
buyerModel.email = "Vysotskii.com";
buyerModel.payment = "card";
buyerModel.phone = "88005553535"
console.log("Данные покупателя", buyerModel.getAllData())

const api = new Api(API_URL);
const answerServer = new LinkServer(api);
const data = await answerServer.getProducts();
const products = data.items;
const productsModelServer = new Products();
productsModelServer.setProducts(products);
console.log("Каталог, полученный с сервера:", productsModelServer.getProducts());

