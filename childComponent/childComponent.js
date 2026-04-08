import { LightningElement } from 'lwc';
import { createMessageContext, subscribe } from 'lightning/messageService';
import sampleLms from "@salesforce/messageChannel/lmsMessage__c";
export default class ChildComponent extends LightningElement {

    context = createMessageContext();
    sub = null;
    recD ;
    connectedCallback()
    {
        this.sub = subscribe(this.context, sampleLms, (message) => {
            console.log('From child => ',message);
            this.recD = message;
        })
    }

    // sendValue;
    // handleClick()
    // {
    //     // this.sendValue['name'] = this.template.querySelector('.textField').value;
    //     // console.log(this.sendValue);
    //     // // Creating event with value
    //     // const selectedEvent = new CustomEvent("sendv", {detail:this.sendValue});
    //     // // dispatch Event
    //     // this.dispatchEvent(selectedEvent);
    // }
    
}