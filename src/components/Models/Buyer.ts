import { TPayment} from "../../types/index.ts" 
import { IEvents } from '../base/Events';

export class Buyer {
    private _address: string = "";
    private _email: string = "";
    private _phone: string = "";
    private _payment!: TPayment

    constructor(protected events:IEvents) {
      this.events = events;
    }

    set address(value: string) {
      this._address = value;
      this.events.emit('buyer:change');
    };

    set phone(value: string) {
      this._phone = value;
      this.events.emit('buyer:change');
    };

    set email(value: string) {
      this._email = value;
      this.events.emit('buyer:change');
    };

    set payment(value: TPayment) {
      this._payment = value;
      this.events.emit('buyer:change');
    };

    get address():string {return this._address};
    get phone():string {return this._phone};
    get email():string {return this._email};
    get payment():TPayment {return this._payment};

    getAllData() {
      return {"address": this.address,"phone": this.phone, "email": this.email, "payment": this.payment}
    }

    clear() {
        this._address = "";
        this._email = "";
        this._payment = null;
        this._phone = "";
        this.events.emit('buyer:change');
    }

    validate() {
      const valid : {address?: string, email? : string, payment?: string, phone?: string} = {};
      if (!this._address) {
        valid.address = "Укажите адресс."
      } else {
        valid.address = ""
      }

      if (!this._email) {
        valid.email = "Укажите email."
      } else {
        valid.email = ""
      }

      if (!this.payment) {
        valid.payment = "Укажите вид оплаты."
      } else {
        valid.payment = ""
      }

      if (!this.phone) {
        valid.phone = "Укажите телефон."
      } else {
        valid.phone = ""
      }

      return valid
    }
}

