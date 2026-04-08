import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountDateSearchController.getAccountsBySearch';
// Requirement: Toast message dikhane ke liye (Select karne ke baad user ko batane ke liye)
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MassSelect extends LightningElement {
    @track accounts = [];
    @track selectedCount = 0; // Selected records ki ginti
    selectedRecords = [];      // Asli selected data yahan store hoga

    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Phone', fieldName: 'Phone' }
    ];

    @wire(getAccounts, { searchKey: '' })
    wiredData({ error, data }) {
        if (data) {
            this.accounts = data;
        }
    }

    // WORKING: Jab bhi user kisi checkbox ko click ya un-click karega
    handleRowSelection(event) {
        // Requirement: event.detail.selectedRows se selected records ki array milti hai
        const selectedRows = event.detail.selectedRows;
        
        this.selectedCount = selectedRows.length;
        this.selectedRecords = selectedRows;
        
        console.log('Selected Records are: ', JSON.stringify(this.selectedRecords));
    }

    // WORKING: Select kiye huye records par action lena
    processSelected() {
        if (this.selectedCount > 0) {
            // Requirement: Records ki IDs nikalna (Apex ko bhejne ke liye)
            let ids = this.selectedRecords.map(item => item.Id);
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: this.selectedCount + ' Records selected for processing. IDs: ' + ids.join(', '),
                    variant: 'success'
                })
            );
        } else {
            // Agar bina select kiye button dabaya
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Kam se kam ek record toh select karo!',
                    variant: 'error'
                })
            );
        }
    }
}