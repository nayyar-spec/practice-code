import { LightningElement, track, wire } from 'lwc';
import getAccountList from '@salesforce/apex/LazyLoadingController.getAccountList';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Industry', fieldName: 'Industry' }
];

export default class LazyLoadingTable extends LightningElement {
    @track accounts = []; // Requirement: Saare records yahan store honge
    columns = COLUMNS;
    
    // Logic Variables
    rowLimit = 20;       // Ek baar mein kitne records lane hain
    rowOffset = 0;      // Shuruat kahan se karni hai
    error;

    // WORKING: Component load hote hi pehle 20 records mangwana
    connectedCallback() {
        this.loadData();
    }

    loadData() {
        // Apex ko call karna (Imperative Call)
        return getAccountList({ limitSize: this.rowLimit, offset: this.rowOffset })
            .then(result => {
                // REQUIREMENT: Purane records aur naye records ko combine karna
                // '...' (Spread operator) use karke hum list ko bada karte ja rahe hain
                this.accounts = [...this.accounts, ...result];
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = undefined;
            });
    }

    // WORKING: Jab user scroll karke table ke end mein pahunchega
    loadMoreData(event) {
        const { target } = event;
        // Table par "Loading" spinner dikhana
        target.isLoading = true;

        // Requirement: Offset ko badhana (0 -> 20 -> 40)
        this.rowOffset = this.rowOffset + this.rowLimit;

        // Naya data load karke spinner band karna
        this.loadData().then(() => {
            target.isLoading = false;
        });
    }
}