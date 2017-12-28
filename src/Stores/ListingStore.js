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
                this.listings = action.listings.map(l => new ListingWrapper(l));
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

class ListingWrapper {
    constructor(listing){
        Object.assign(this, listing);
    }
    get name(){
        return `${ this.organisation_name } (${ this.short_name })`;
    }
}