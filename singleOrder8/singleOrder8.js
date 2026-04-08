import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ORDER_CHANNEL from '@salesforce/messageChannel/OrderChannel__c';
export default class SingleOrder8 extends LightningElement {
    record;
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        subscribe(this.messageContext, ORDER_CHANNEL, (message) => {
            this.record = message;
        });
    }
}