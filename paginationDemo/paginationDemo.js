import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountDateSearchController.getAccountsBySearch'; // Purana search wala apex use kar rahe hain

export default class PaginationDemo extends LightningElement {
    @track allAccounts = [];    // Requirement: Sara data jo Apex se aayega
    @track visibleAccounts = []; // Working: Sirf wo data jo current page par dikhana hai
    
    pageSize = 5;               // Ek page par kitne records?
    currentPage = 1;            // Abhi kaunse page par hain?
    totalPage = 0;              // Total kitne pages banenge?

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Phone', fieldName: 'Phone' }
    ];

    // Working: Apex se data lana
    @wire(getAccounts, { searchKey: '' })
    wiredData({ error, data }) {
        if (data) {
            this.allAccounts = data;
            // Total pages calculate karna: Total Records / Page Size
            this.totalPage = Math.ceil(data.length / this.pageSize);
            // Pehla page load karna
            this.updateView();
        }
    }

    // WORKING: Pagination ka asli logic (Slice Method)
    updateView() {
        // Start index nikalna: (1-1)*5 = 0
        const start = (this.currentPage - 1) * this.pageSize;
        // End index nikalna: 0 + 5 = 5
        const end = start + this.pageSize;
        
        // .slice(start, end): Array mein se 0 se lekar 4 tak ke records nikal lega
        this.visibleAccounts = this.allAccounts.slice(start, end);
    }

    // Working: Next button click
    handleNext() {
        if (this.currentPage < this.totalPage) {
            this.currentPage++;
            this.updateView();
        }
    }

    // Working: Previous button click
    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateView();
        }
    }

    // Getters: Buttons ko disable/enable karne ke liye
    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPage;
    }
}