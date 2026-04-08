import { LightningElement, wire, track } from 'lwc';
import getRelatedContacts from '@salesforce/apex/RelatedRecordsController.getRelatedContacts';

export default class ClickableTable extends LightningElement {
    @track contactData = [];
    
    // Requirement: Columns definition for Link
    columns = [
        { label: 'Contact Name', fieldName: 'contactUrl', type: 'url', 
            typeAttributes: { 
                label: { fieldName: 'fullName' }, // User ko kya dikhega
                target: '_blank'               // Naye tab mein khulega
            }
        },
        { label: 'Account Name', fieldName: 'accUrl', type: 'url', 
            typeAttributes: { 
                label: { fieldName: 'accountName' }, 
                target: '_self' 
            }
        },
        { label: 'Email', fieldName: 'Email', type: 'email' }
    ];

    @wire(getRelatedContacts)
    wiredContacts({ error, data }) {
        if (data) {
            // Working: Data Transformation (Flattening)
            this.contactData = data.map(record => {
                return {
                    ...record,
                    // 1. Link banane ke liye ID ke aage '/' lagana padta hai
                    contactUrl: '/' + record.Id,
                    accUrl: '/' + record.AccountId,
                    
                    // 2. Nested data ko bahar nikalna (Account.Name -> accountName)
                    accountName: record.Account.Name,
                    
                    // 3. Full Name combine karna
                    fullName: record.FirstName + ' ' + record.LastName
                };
            });
        } else if (error) {
            console.error(error);
        }
    }
}