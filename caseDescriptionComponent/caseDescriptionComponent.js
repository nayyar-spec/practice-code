import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ACCOUNT_CONTACT_CHANNEL from '@salesforce/messageChannel/CaseChannel__c';

const COLUMNS = [
    {label: 'Subject', fieldName: 'Subject', type: 'text'},
    {label: 'Status', fieldName: 'Status', type: 'text'},
    {label: 'Priority', fieldName: 'Priority', type: 'text'},
    {label: 'Created Date', fieldName: 'CreatedDate', type: 'date'},
    {label: 'Description', fieldName: 'Description', type: 'text'}]

export default class CaseDescriptionComponent extends LightningElement {
    columns = COLUMNS;
    selectedCase;
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(this.messageContext, ACCOUNT_CONTACT_CHANNEL,selectedRow => {
            this.selectedCase = selectedRow;
        });
    }
}