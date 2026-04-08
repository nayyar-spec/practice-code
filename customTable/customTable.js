import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class CustomTable extends LightningElement {
    accounts; // Server se aaya hua data yahan store hoga
    error;    // Agar kuch galat hua toh yahan store hoga

    // SMART WORKING: @wire Apex se data lakar is 'handleData' function ko de dega
    @wire(getAccountList)
    handleData({ data, error }) { 
        // Is baar humne 'result' ki jagah seedha '{data, error}' likha hai (इसे Destructuring kehte hain)
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    // Custom Button Click Handler (Sirf demo ke liye)
    handleRowClick(event) {
        // data-id attribute se hum pata karenge ki kaunsi row click hui hai
        const recordId = event.target.dataset.id;
        alert('Aapne click kiya: ' + recordId);
    }
}