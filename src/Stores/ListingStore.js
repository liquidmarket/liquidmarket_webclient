import { EventEmitter } from "events";
import dispatcher from "./../dispatcher";

class ListingStore extends EventEmitter {
    constructor(){
        super();
        this.listings = [];
    }
    getAll() {
        return this.listings;
    }
    handleActions(action){
        switch (action.type) {
            case 'REFRESH_LISTING':
                this.listings = action.listings;
                break;
            default:
                break;
        }
        this.emit("change");
    }
}

const listingStore = new ListingStore();

dispatcher.register(listingStore.handleActions.bind(listingStore));

export default listingStore;
