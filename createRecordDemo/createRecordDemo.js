import { LightningElement } from 'lwc';
// ShowToastEvent: Success message (Green box) dikhane ke liye import kiya
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// ACCOUNT_OBJECT: Ye batata hai ki humein 'Account' table mein data dalna hai
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
// FIELDS: Hum bata rahe hain ki form mein kaun-kaun si fields dikhani hain
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class CreateRecordDemo extends LightningElement {
    // 1. Requirement: In variables ko HTML mein use karenge form banane ke liye
    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD];

    
    // 2. Working: Jab record successfully ban jayega, tab Salesforce ye function chalayega
    handleSuccess(event) {
        // event.detail.id: Salesforce naye bane hue record ki ID humein 'Bhejta' (Send) hai
        const recordId = event.detail.id;

        // Message 'Banao' (Create Toast)
        const toastEvt = new ShowToastEvent({
            title: 'Mubarak Ho!',
            message: 'Naya Account ban gaya hai! ID hai: ' + recordId,
            variant: 'success'
        });

        // Message 'Phenko' (Dispatch)
        this.dispatchEvent(toastEvt);
    }
}