import { LightningElement, track } from 'lwc';

/**
 * REQUIREMENT: Dynamic components ko import karne ka tarika wahi hai,
 * par hum unhe 'constructor' ya 'variable' mein assign karenge.
 */
import MyTableComponent from 'c/myTableComponent';
import MyFormComponent from 'c/myFormComponent';

export default class DynamicLoader extends LightningElement {
    @track currentComponentName = 'c-my-table-component'; // Default component
    
    // Logic: Component ko as an object store karna
    componentConstructor = MyTableComponent;

    // WORKING: Button click par component switch karna
    showForm() {
        this.componentConstructor = MyFormComponent;
    }

    showTable() {
        this.componentConstructor = MyTableComponent;
    }
}