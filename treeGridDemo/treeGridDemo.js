import { LightningElement, wire, track } from 'lwc';
import getAccountWithContacts from '@salesforce/apex/TreeGridController.getAccountWithContacts';

// Column defines karna
const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' } // Ye Contact ke liye hai
];

export default class TreeGridDemo extends LightningElement {
    @track gridData = []; // Final data jo tree-grid mein jayega
    columns = COLUMNS;

    @wire(getAccountWithContacts)
    wiredData({ error, data }) {
        if (data) {
            // Working: Data ko transform kar rahe hain taaki Tree-Grid samajh sake
            this.gridData = data.map(acc => {
                // Requirement: Har account ke Contacts ko '_children' property mein daalna
                const contacts = acc.Contacts ? acc.Contacts.map(con => {
                    return {
                        ...con,
                        Name: con.FirstName + ' ' + con.LastName // Name field align kar rahe hain
                    };
                }) : [];

                return {
                    ...acc,
                    "_children": contacts // Ye key 'lightning-tree-grid' ke liye mandatory hai
                };
            });
        } else if (error) {
            console.error('Error loading tree grid:', error);
        }
    }
}