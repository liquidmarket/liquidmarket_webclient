import { EventEmitter } from "events";
import dispatcher from "./../dispatcher";
import { refreshAccounts } from "./../Actions/AccountActions";

class AccountStore extends EventEmitter {
    constructor(){
        super();
        this.accounts = [];
    }
    getAll() {
        if (this.accounts.length === 0) {
            refreshAccounts();
        }
        return this.accounts;
    }
    handleActions(action){
        switch (action.type) {
            case 'CREATE_ACCOUNT':
                this.accounts.push(action.account);
                break;
            case 'UPDATE_ACCOUNT':
                let i = this.accounts.findIndex(a => a.id === action.account.id);
                this.accounts[i] = action.account;
                break;
            case 'REFRESH_ACCOUNTS':
                this.accounts = action.accounts;
                break;
            case 'DELETE_ACCOUNT':
                this.accounts = this.accounts.filter(a => a.id !== action.id);
                break;
            default:
                break;
        }
        this.emit("change");
    }
}

const accountStore = new AccountStore();

dispatcher.register(accountStore.handleActions.bind(accountStore));

export default accountStore;