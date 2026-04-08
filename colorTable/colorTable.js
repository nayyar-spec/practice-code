import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountDateSearchController.getAccountsBySearch';

export default class ColorTable extends LightningElement {
    @track accountData = [];

    // Requirement: cellAttributes ka use karke CSS class bind karna
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { 
            label: 'Industry', 
            fieldName: 'Industry', 
            type: 'text',
            cellAttributes: {
                // Working: 'class' attribute ko humne dynamic property 'industryClass' se joda hai
                class: { fieldName: 'industryClass' }
            }
        },
        { 
            label: 'Phone', 
            fieldName: 'Phone', 
            cellAttributes: {
                // Icon bhi add kar sakte hain logic ke basis par
                iconName: { fieldName: 'phoneIcon' },
                iconPosition: 'left'
            }
        }
    ];

    @wire(getAccounts, { searchKey: '' })
    wiredAccounts({ error, data }) {
        if (data) {
            // Working: Data transformation to add CSS classes
            this.accountData = data.map(item => {
                let industryClass = '';
                let phoneIcon = '';

                // Logic: Agar Industry 'Energy' hai toh Green dikhao
                if (item.Industry === 'Energy') {
                    industryClass = 'green-text';
                    phoneIcon = 'utility:check';
                } 
                // Logic: Agar Industry 'Agriculture' hai toh Red dikhao
                else if (item.Industry === 'Agriculture') {
                    industryClass = 'red-text';
                    phoneIcon = 'utility:warning';
                } else {
                    industryClass = 'blue-text';
                }

                return {
                    ...item,
                    "industryClass": industryClass, // Nayi property for CSS
                    "phoneIcon": phoneIcon          // Nayi property for Icon
                };
            });
        }
    }
}