import { LightningElement, wire } from 'lwc';
import getAccList from '@salesforce/apex/AccountController.getAccList';
import { publish, MessageContext } from 'lightning/messageService';
import ACCOUNT_CONTACT_CHANNEL from '@salesforce/messageChannel/AccountContactChannel__c';
// import { refreshApex } from '@salesforce/apex';


const COLUMNS = [
    {label: 'Account Name', fieldName: 'Name', type: 'text'},
    {label: 'Phone', fieldName: 'Phone', type: 'phone'},
    {label: 'Industry', fieldName: 'Industry', type: 'text'}
];

export default class ParentComponent5 extends LightningElement {
    columns = COLUMNS;
    accounts = [];
    @wire(MessageContext)
    messageContext;
    // wiredResponse;

    @wire(getAccList)
    handleTableData(result) {
        // this.wiredResponse = result;
        if(result.data) {
            this.accounts = result.data;
        }
        else if(result.error) {
            console.error(result.error);
        }
    }

    

    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        
        publish(this.messageContext, ACCOUNT_CONTACT_CHANNEL, selectedRows);
    }
}