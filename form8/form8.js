import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import ORDER_CHANNEL from '@salesforce/messageChannel/OrderChannel__c';

const OPTIONS = [
    {label: 'Item A', value: 'Item A'},
    {label: 'Item B', value: 'Item B'},
    {label: 'Item C', value: 'Item C'}
];

export default class Form8 extends LightningElement {
    record = {
        id: '',
        name: '',
        item: '',
        quantity: '',
        status: 'ORDER PLACED'
    };
    options = OPTIONS;
    num = 1;
    @wire(MessageContext)
    messageContext;

    handleClick() {
        this.record.id = 'ORD' + this.num;
        this.record.name = this.template.querySelector('.name').value;
        this.record.item = this.template.querySelector('.item').value;
        this.record.quantity = this.template.querySelector('.quantity').value;
        if(!this.record.name || !this.record.item || !this.record.quantity){
            alert('Fill all the fields');
        }
        else {
            this.num++;
            publish(this.messageContext, ORDER_CHANNEL, this.record);
        }
    }
}