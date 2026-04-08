import { LightningElement, wire } from 'lwc';
// publish: Message bhejne ka function
// MessageContext: Ye batata hai ki kaunsa component LMS use kar raha hai
import { publish, MessageContext } from 'lightning/messageService';
// REQUIREMENT: XML file ko import karna (__c suffix ke saath)
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class LmsPublisher extends LightningElement {
    inputValue = '';

    // Working: MessageContext ko wire karna zaroori hai LMS ki functionality ke liye
    @wire(MessageContext)
    messageContext;

    // Input box ki value variable mein store karna
    handleInputChange(event) {
        this.inputValue = event.target.value;
    }

    // Working: Button click par message 'Publish' karne ka logic
    publishMessage() {
        // 1. Requirement: Data ka dabba (Payload) taiyaar karna
        const payload = { 
            messageToSend: this.inputValue,
            source: 'Publisher Component'
        };

        // 2. Working: Publish function ko Context, Channel aur Payload bhej dena
        publish(this.messageContext, SAMPLE_CHANNEL, payload);
        
        console.log('Message Published Successfully!');
    }
}