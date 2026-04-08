import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccountList';
import { updateRecord } from 'lightning/uiRecordApi'; // Requirement: Record update karne ke liye standard method
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StandardTable extends LightningElement {
    @track accounts = [];
    wiredAccountResult;
    draftValues = []; // Requirement: Jo changes user ne kiye hain wo yahan store honge

    columns = [
        { label: 'Name', fieldName: 'Name', editable: true }, // Logic: editable property true honi chahiye
        { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
        { label: 'Industry', fieldName: 'Industry', editable: true }
    ];

    @wire(getAccounts)
    wiredData(result) {
        this.wiredAccountResult = result;
        if (result.data) {
            this.accounts = result.data;
        }
    }

    // WORKING: Jab user "Save" button dabayega (Jo table niche automatic dikhayegi)
    handleSave(event) {
        // 1. Draft values nikalna (Jo user ne change kiye hain)
        const recordInputs = event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });

        // 2. Promise.all ka use karke ek saath saare records update karna
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        
        Promise.all(promises)
            .then(() => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Accounts updated',
                    variant: 'success'
                }));
                this.draftValues = []; // Draft clear karna
                return refreshApex(this.wiredAccountResult); // UI refresh karna
            })
            .catch(error => {
                console.error(error);
            });
    }
}