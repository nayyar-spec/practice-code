import { LightningElement, track } from 'lwc';

export default class ParentComp extends LightningElement {
    @track messageFromChild = 'Abhi tak koi message nahi aaya...';

    // Working: Ye function tabhi chalega jab Child event phenkega (oncontact)
    handleChildMessage(event) {
        // event.detail: Ye wahi dabba hai jo Child ne bheja tha
        this.messageFromChild = event.detail;
    }
}