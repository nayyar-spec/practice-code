import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import { refreshApex } from '@salesforce/apex';

// Columns ko hamesha class ke bahar define karte hain kyunki ye change nahi hoti
const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' }
];

export default class TableDemo extends LightningElement {
    columns = COLUMNS; // HTML ko batane ke liye ki columns kya hain
    accounts = [];     // Table mein dikhane wala data
    wiredResponse;     // Refresh karne ke liye 'packet' save karne ki jagah

    // SMART WORKING: @wire automatically Apex se data lakar niche wale function ko de dega
    @wire(getAccountList)
    handleTableData(result) {
        this.wiredResponse = result; // Poora packet save kiya taaki refresh kar sakein
        
        if (result.data) {
            this.accounts = result.data; // Data milte hi 'accounts' variable bhar jayega
        } else if (result.error) {
            console.error('Data loading fail:', result.error);
        }
    }

    // Is function ko hum button click par chalayenge
    updateTable() {
        // Bina page refresh kiye table ka data 'taja' (update) ho jayega
        refreshApex(this.wiredResponse);
    }
}