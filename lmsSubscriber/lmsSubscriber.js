import { LightningElement, wire, track } from 'lwc';
// subscribe: Message sunne ke liye function
import { subscribe, MessageContext } from 'lightning/messageService';
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class LmsSubscriber extends LightningElement {
    @track receivedMessage = 'Waiting for message...';
    subscription = null; // Isme hum current subscription ki detail rakhte hain

    @wire(MessageContext)
    messageContext;

    // Requirement: Component ke bante hi 'Listening' shuru kar deni chahiye
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    // Working: Channel ko subscribe karne ka main logic
    subscribeToMessageChannel() {
        if (!this.subscription) {
            // subscribe function 3 cheezein leta hai: Context, Channel, aur Handler function
            this.subscription = subscribe(
                this.messageContext,
                SAMPLE_CHANNEL,
                (message) => this.handleMessage(message)
            );
        }
    }

    // Working: Jab message milta hai, ye function use "Pehchanta" hai
    handleMessage(message) {
        // Requirement: XML mein jo 'fieldName' diye the, wahi yahan access karenge
        this.receivedMessage = message.messageToSend ? message.messageToSend : 'No Message Found';
        console.log('Message Received from Source: ' + message.source);
    }
}