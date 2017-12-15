import { EventEmitter } from "events";
import dispatcher from "./../dispatcher";

class PriceStore extends EventEmitter {
    constructor(){
        super();
        this.prices = [];
    }
    getAll() {
        return this.prices;
    }
    handleActions(action){
        switch (action.type) {
            case 'REFRESH_PRICE':
                this.prices = action.prices;
                break;
            default:
                break;
        }
        this.emit("change");
    }
}

const priceStore = new PriceStore();

dispatcher.register(priceStore.handleActions.bind(priceStore));

export default priceStore;
