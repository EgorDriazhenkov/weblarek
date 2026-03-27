import { IApi } from "../../types";
import { IResponse, IOrder} from "../../types";

export class LinkServer {
 
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<IResponse> {
    const products = await this.api.get<IResponse>("/product/");
    return products; 
  }

 
  async sendOrder(
    orderData: IOrder,
  ): Promise<{ confirmation: string; totalAmount: number }> {
    const answer = await this.api.post<{
      confirmation: string; 
      totalAmount: number; 
    }>("/order/", orderData);
    return answer; 
  }
}