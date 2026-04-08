import { LightningElement, api } from 'lwc'; // api import karna zaroori hai

export default class ChildDisplay extends LightningElement {
    // @api: Ye variable ko 'Public' bana deta hai.
    // Requirement: Iske bina Parent is variable ko touch nahi kar sakta.
    @api messageFromParent = 'Main wait kar raha hoon...';

    // @api: Hum functions ko bhi public bana sakte hain.
    @api resetMessage() {
        this.messageFromParent = 'Message reset ho gaya!';
    }
}