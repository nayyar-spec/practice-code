import { LightningElement, wire, track } from 'lwc';
// Requirement: Apex method ko import karna.
import getAccountsByDate from '@salesforce/apex/AccountDateSearchController.getAccountsByDate';

// Table ke headers set karna.
const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

export default class DateSearchTable extends LightningElement {
    @track searchKey = ''; 
    @track startDate = null;
    @track endDate = null;
    columns = COLUMNS;

    /* SMART WORKING (@wire): 
        Hamaare teeno variables (searchKey, startDate, endDate) reactive hain ($).
        Inme se KOI BHI ek badlega, toh Apex apne aap dobara call hoga.
    */
    @wire(getAccountsByDate, { 
        startDate: '$startDate', 
        endDate: '$endDate', 
        searchKey: '$searchKey' 
    })
    accounts;

    // Working: Input fields se data nikalna.
    handleInput(event) {
        const fieldName = event.target.name; // HTML mein 'name' attribute se pehchanenge.
        const value = event.target.value;

        if (fieldName === 'searchKey') {
            this.searchKey = value;
        } else if (fieldName === 'startDate') {
            this.startDate = value;
        } else if (fieldName === 'endDate') {
            this.endDate = value;
        }
    }
}