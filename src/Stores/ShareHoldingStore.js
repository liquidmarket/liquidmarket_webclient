import { EventEmitter } from "events";
import dispatcher from "./../dispatcher";

class ShareHoldingStore extends EventEmitter {
    constructor(){
        super();
        this.shareholdings = [];
    }
    getAll(){
        return this.shareholdings;
    }
    addShareholding(shareholding){
        let index = this.shareholdings.findIndex(sh => sh.account_id === shareholding.account_id);
        if (index === -1) {
            this.shareholdings.push(shareholding);
        } else {
            this.shareholdings[index] = shareholding;
        }
    }
    handleActions(action){
        switch (action.type) {
            case 'ADD_SHAREHOLDING':
                this.addShareholding(action.account_shareholdings);
                break;
            default:
                break;
        }
        this.emit("change");
    }
}

const shareholdingStore = new ShareHoldingStore();

dispatcher.register(shareholdingStore.handleActions.bind(shareholdingStore));

export default shareholdingStore;
