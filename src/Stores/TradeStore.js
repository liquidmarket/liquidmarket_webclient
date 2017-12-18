import { EventEmitter } from "events";
import dispatcher from "./../dispatcher";

class TradeStore extends EventEmitter {
    constructor(){
        super();
        this.trades = [];
    }
    getAll() {
        return this.trades;
    }
    handleActions(action){
        switch (action.type) {
            case 'REFRESH_TRADE':
                this.trades = action.trades;
                break;
            default:
                break;
        }
        this.emit("change");
    }
}

const tradeStore = new TradeStore();

dispatcher.register(tradeStore.handleActions.bind(tradeStore));

export default tradeStore;
