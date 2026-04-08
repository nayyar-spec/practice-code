import { LightningElement, wire,track } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ORDER_CHANNEL from '@salesforce/messageChannel/OrderChannel__c';

const COLUMNS = [
    {lable: 'Order ID', fieldName: 'id'},
    {lable: 'Customer Name', fieldName: 'name'},
    {lable: 'Item', fieldName: 'item'},
    {lable: 'Quantity', fieldName: 'quantity'},
    {lable: 'Status', fieldName: 'status'}
]

export default class OrderList8 extends LightningElement {

    columns = COLUMNS;
    @track orderList = [];

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(this.messageContext, ORDER_CHANNEL, (message) => {
            this.orderList = [...this.orderList, message];

            console.log(JSON.stringify(this.orderList));
        });
        console.log(JSON.stringify(this.orderList));
    }
}