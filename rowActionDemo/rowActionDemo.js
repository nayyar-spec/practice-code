import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import { refreshApex } from '@salesforce/apex';

// 1. Pehle hum define karenge ki dropdown menu mein kya dikhega
const ACTIONS = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' }
];

// 2. Ab table ke columns mein is 'action' column ko add karenge
const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { 
        type: 'action', 
        typeAttributes: { rowActions: ACTIONS } // Ye line dropdown menu chipka deti hai
    }
];

export default class RowActionDemo extends LightningElement {
    accounts = [];
    columns = COLUMNS;
    wiredResponse;

    @wire(getAccountList)
    handleAccounts(result) {
        this.wiredResponse = result;
        if (result.data) {
            this.accounts = result.data;
        }
    }

    // 3. SMART HANDLER: Jab bhi koi menu option click hoga, ye function chalega
    handleRowAction(event) {
        // 'action' se pata chalega kaunsa button daba (View/Edit/Delete)
        const actionName = event.detail.action.name;
        // 'row' se us poori line ka data mil jayega jis par click hua hai
        const row = event.detail.row;

        // Ab hum switch case use karke action decide karenge
        switch (actionName) {
            case 'view':
                alert('Aap dekh rahe hain: ' + row.Name);
                break;
            case 'edit':
                alert('Editing Record: ' + row.Id);
                // Yahan aap apna modal (popup) khol sakte hain
                break;
            case 'delete':
                this.deleteRow(row);
                break;
            default:
        }
    }

    deleteRow(currentRow) {
        // Abhi ke liye sirf console karte hain
        console.log('Deleting: ' + currentRow.Id);
        // Delete logic ke baad refreshApex(this.wiredResponse) call karna hota hai
    }
}