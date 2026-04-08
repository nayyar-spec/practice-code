import { LightningElement } from 'lwc';

export default class AccordionDemo extends LightningElement {
    // Ye variable decide karega ki pehli baar page khulne par kaunsa section open hoga
    activeSectionName = 'B'; 

    // Jab koi section khulega ya band hoga, toh ye function trigger hoga
    handleSectionToggle(event) {
        // openSections mein un saare sections ke 'name' honge jo abhi khule hain
        const openSections = event.detail.openSections;
        console.log('Abhi ye sections khule hain: ' + openSections);
    }
}