import { LightningElement, wire, track } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ACCOUNT_CONTACT_CHANNEL from '@salesforce/messageChannel/AccountContactChannel__c';

// const COLUMNS = [
//     {label: 'First Name', fieldName: 'FirstName', type: 'text'},
//     {label: 'Phone', fieldName: 'Phone', type: 'phone'},
//     {label: 'Email', fieldName: 'Email', type: 'email'},
//     {label: 'Account Name', fieldName: 'Account.Name', type: 'text'}
// ]

export default class ChildComponent5 extends LightningElement {
    columns = [
    {label: 'First Name', fieldName: 'FirstName', type: 'text'},
    {label: 'Phone', fieldName: 'Phone', type: 'phone'},
    {label: 'Email', fieldName: 'Email', type: 'email'},
    {label: 'Account Name', fieldName: 'Account', type: 'text'}
];
    @track contacts = [];
    @track result;
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(this.messageContext, ACCOUNT_CONTACT_CHANNEL, (selectedRows) => {
            this.contacts = [];
            selectedRows.forEach(element => {
                
                this.contacts = [...this.contacts,...JSON.parse(JSON.stringify(element.Contacts))];
                
                //console.log(element.Contacts);
            }); 
            this.contacts.forEach(contact => {
                contact.Account = contact.Account.Name;
            });
            
            
        });
            
            

    }
}