import { EventEmitter } from "events";
import dispatcher from "./../dispatcher";

class AddressStore extends EventEmitter {
    constructor(){
        super();
        this.addresses = [];
    }
    getAll() {
        return this.addresses;
    }
    handleActions(action){
        switch (action.type) {
            case 'REFRESH_ADDRESS':
                this.addresses = action.addresses;
                break;
            default:
                break;
        }
        this.emit("change");
    }
}

const addressStore = new AddressStore();

dispatcher.register(addressStore.handleActions.bind(addressStore));

export default addressStore;
