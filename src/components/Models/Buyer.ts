import { TPayment} from "../../types/index.ts" 

export class Buyer {
    private _address!: string;
    private _email!: string;
    private _phone!: string;
    private _payment!: TPayment

    set address(value: string) {this._address = value;};
    set phone(value: string) {this._phone = value;};
    set email(value: string) {this._email = value;};
    set payment(value: TPayment) {this._payment = value;};

    get address():string {return this._address};
    get phone():string {return this._phone};
    get email():string {return this._email};
    get payment():TPayment {return this._payment};

    getAllData() {
      return {"address": this._address,"phone": this._phone, "email": this._email, "payment": this._payment}
    }

    clear() {
        this._address = "";
        this._email = "";
        this._payment = null;
        this._phone = "";
    }

    validate() {
      let valid : {address?: string, email? : string, payment?: string, phone?: string} = {};
      if (!this._address) {
        valid.address = "Укажите адресс"
      }

      if (!this._email) {
        valid.email = "Укажите email"
      }

      if (!this.payment) {
        valid.email = "Укажите вид оплаты"
      }

      if (!this.phone) {
        valid.phone = "Укажите телефон"
      }

      return valid
    }
}

