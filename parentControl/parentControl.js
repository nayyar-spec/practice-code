import { LightningElement } from 'lwc';

export default class ParentControl extends LightningElement {
    inputValue = '';

    // Working: Input box mein jo likha ja raha hai use save karna
    handleInputChange(event) {
        this.inputValue = event.target.value;
    }

    // Working: Child ke function ko call karna
    handleReset() {
        // querySelector se hum Child component ko pakadte hain
        const childComp = this.template.querySelector('c-child-display');
        // Child ka public function (@api) yahan se call kar rahe hain
        childComp.resetMessage();
    }
}