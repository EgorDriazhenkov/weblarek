import { IApi } from "../../types";
import { IProductsResponse, IOrder,IAnswerSer} from "../../types";

export class LinkServer {
 
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<IProductsResponse> {
    const products = await this.api.get<IProductsResponse>("/product/");
    return products; 
  }

 
  async sendOrder(
    orderData: IOrder,
  ): Promise<IAnswerSer> {
    const answer = await this.api.post<IAnswerSer>("/order/", orderData);
    return answer; 
  }
}