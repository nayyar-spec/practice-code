import { LightningElement, track } from 'lwc';

export default class ComboBoxDemo extends LightningElement {
    // 1. Requirement: User jo select karega wo yahan save hoga
    @track selectedValue = '';

    // 2. Requirement: Dropdown mein kya-kya dikhega (Options List)
    // Label: Jo user ko dikhega | Value: Jo humein (coder ko) milega
    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    // 3. Working: Jab user dropdown badlega
    handleChange(event) {
        // event.detail.value: LWC humein selected value 'Bhejta' hai
        this.selectedValue = event.detail.value;
        console.log('User ne select kiya: ' + this.selectedValue);
    }
}