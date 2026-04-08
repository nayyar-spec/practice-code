import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/LazyLoadingController.getAccountList'; // Purana Apex use kar rahe hain

const COLUMNS = [
    // Requirement: 'sortable: true' likhna zaroori hai taaki header par click ho sake
    { label: 'Account Name', fieldName: 'Name', sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true },
    { label: 'Industry', fieldName: 'Industry', sortable: true }
];

export default class SortingTable extends LightningElement {
    @track accounts = [];
    columns = COLUMNS;
    
    // Sorting State Variables
    @track sortedBy;            // Kaunse column se sort ho raha hai
    @track sortedDirection = 'asc'; // 'asc' ya 'desc'

    @wire(getAccountList, { limitSize: 50, offset: 0 })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            console.error(error);
        }
    }

    // WORKING: Jab user column header par click karega
    handleSort(event) {
        // event.detail se humein pata chalta hai kaunsa column (fieldName) aur direction kya hai
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;

        // Requirement: Actual sorting logic ko call karna
        this.sortData(this.sortedBy, this.sortedDirection);
    }

    sortData(fieldname, direction) {
        // 1. Data ki ek copy banana (Direct sorting 'accounts' par nahi kar sakte)
        let parseData = JSON.parse(JSON.stringify(this.accounts));

        // 2. Logic: Value nikalne ke liye helper function
        let keyValue = (a) => {
            return a[fieldname];
        };

        // 3. Direction check karna (Ascending = 1, Descending = -1)
        let isReverse = direction === 'asc' ? 1 : -1;

        // 4. Array sort() function ka use karna
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // Handle null values
            y = keyValue(y) ? keyValue(y) : '';
            
            // Comparison logic
            return isReverse * ((x > y) - (y > x));
        });

        // 5. Sorted data ko wapas assign karna taaki UI refresh ho
        this.accounts = parseData;
    }
}