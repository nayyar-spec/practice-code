import { LightningElement, track } from 'lwc';
// Requirement: Salesforce ki standard library real-time events ke liye
import { subscribe, unsubscribe, onError } from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PlatformEventDemo extends LightningElement {
    @track messages = []; // Saare real-time messages yahan store honge
    channelName = '/event/Notification_Event__e'; // Event ka path
    subscription = {}; // Subscription ki details hold karne ke liye

    // Working: Component load hote hi 'Listening' shuru karna
    connectedCallback() {
        this.handleSubscribe();
        this.registerErrorListener();
    }

    // Working: Channel ko subscribe karne ka main logic
    handleSubscribe() {
        // Callback function jo tab chalega jab message receive hoga
        const messageCallback = (response) => {
            console.log('New message received: ', JSON.stringify(response));
            
            // Requirement: Event se data nikalna
            const newMessage = response.data.payload.Message__c;
            this.messages = [...this.messages, newMessage];

            // User ko toast dikhana
            this.showNotification('New Update!', newMessage, 'info');
        };

        // EmpApi ki subscribe method call karna
        subscribe(this.channelName, -1, messageCallback).then(response => {
            console.log('Successfully subscribed to : ', response.channel);
            this.subscription = response;
        });
    }

    // Requirement: Error handling agar connection toot jaye
    registerErrorListener() {
        onError(error => {
            console.error('LWC received error: ', JSON.stringify(error));
        });
    }

    showNotification(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }

    // Best Practice: Component hatne par connection band karna
    disconnectedCallback() {
        unsubscribe(this.subscription, response => {
            console.log('Unsubscribed from channel');
        });
    }
}