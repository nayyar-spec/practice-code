import { LightningElement } from 'lwc';
import { createMessageContext, publish } from 'lightning/messageService';
import sampleLms from "@salesforce/messageChannel/lmsMessage__c";
export default class ParentComponent extends LightningElement {

    context = createMessageContext();

    data = {'Name':'Harshit'};
    sendData()
    {
        publish(this.context, sampleLms, this.data);
    }

    
    // receivedData;
    // ReceivingData(event)
    // {
    //     this.receivedData = event.detail;
    //     console.log('Data rec => ', this.receivedData);
    // }
}