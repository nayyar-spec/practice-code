import { LightningElement } from 'lwc';

export default class ChildComp extends LightningElement {
    
    // Function: Jab child ka button click hoga
    sendDataToParent() {
        // 1. Requirement: Ek naya event "Bana" rahe hain.
        // Iska naam humne rakha hai 'bachak बोला' (kuch bhi rakh sakte hain, standard 'contact')
        const myEvent = new CustomEvent('contact', {
            // detail: Is 'dabbey' mein hum wo data bhejte hain jo Parent ko chahiye
            detail: 'Hello Parent! Main Child hoon aur maine button dabaya.'
        });

        // 2. Working: Is event ko "Fire" (Phenk) rahe hain taaki Parent ise sun sake.
        this.dispatchEvent(myEvent);
    }
}