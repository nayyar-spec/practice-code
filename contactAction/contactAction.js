import { LightningElement, wire, track } from 'lwc';
import actionConList from '@salesforce/apex/ContactController.actionConList';
import {NavigationMixin} from 'lightning/navigation';
import {deleteRecord} from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const ACTIONS = [
    {label: 'View Details', name: 'view'},
    {label: 'Edit', name: 'edit'},
    {label: 'Delete', name: 'delete'}
]

const COLUMNS = [
    {label: 'First Name', fieldName: 'FirstName'},
    {label: 'Email', fieldName: 'Email'},
    {label: 'Account Name', fieldName: 'Account'},
    {label: 'Lead Source', fieldName: 'LeadSource'},
    {
        type: 'action',
        typeAttributes: {rowActions: ACTIONS}
    }
]

export default class ContactAction extends NavigationMixin(LightningElement) {

    columns = COLUMNS;
    wiredCon;
    conList = [];
    actionName;
    @track isEditModalOpen = false;
    @track currentRecordId;
    @track isDeleting = false;

    @wire(actionConList)
    handleTableData(result){
        this.wiredCon = result;
        if(result.data){
            this.conList = JSON.parse(JSON.stringify(result.data));
            this.conList.forEach(con => {
                con.Account = con.Account.Name;
            })
            console.log(JSON.stringify(this.conList));
            
        }
        else if(result.error){
            console.log(JSON.stringify(result.error));
        }
    }

    handleRowAction(event){
        console.log('row id yeh hai',event.detail.row.Id);
        this.actionName = event.detail.action.name;
        console.log('action Name is ', this.actionName);
        const row = event.detail.row;
        switch(this.actionName) {
            case 'view':
                this.navigateToRecord(row.Id, this.actionName);  
                break;
            case 'edit':
                this.currentRecordId = row.Id;
                this.isEditModalOpen = true;
                break;
            case 'delete':
                this.currentRecordId = row.Id;
                this.isDeleting = true; 
                break;
        }
    }

    navigateToRecord(recordId, action){
        console.log('navigation me yeh hai aciton name', action)
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: action
            }
        })
    }

    closeModal() {
        this.isEditModalOpen = false;
    }

    closeDeletingModal() {
        this.isDeleting = false;
    }

    handleEditSuccess() {
        this.showToast('Success', 'Data gets updated', 'success');
        this.isEditModalOpen = false; 
        return refreshApex(this.wiredCon);
    }

    deleteContact() {
        const deletingRecordId = this.currentRecordId;
        this.isDeleting = false;
        deleteRecord(deletingRecordId) 
            .then(() => {
                this.showToast('Success', 'Record gets deleted', 'success');
                return refreshApex(this.wiredCon); 
            })
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event); 
    }

}