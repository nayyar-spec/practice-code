import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountDateSearchController.getAccountsBySearch';

export default class DataExport extends LightningElement {
    @track accounts = [];
    
    // Requirement: Table columns jinhe hum export karna chahte hain
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Phone', fieldName: 'Phone' }
    ];

    @wire(getAccounts, { searchKey: '' })
    wiredData({ error, data }) {
        if (data) {
            this.accounts = data;
        }
    }

    // WORKING: Export Button Click par ye function chalega
    downloadCSV() {
        // 1. Requirement: CSV ke Headers (Labels) taiyaar karna
        let csvHeader = Object.keys(this.accounts[0]).join(',') + '\n';
        
        // 2. Working: Data ko CSV format (String) mein convert karna
        let csvBody = '';
        this.accounts.forEach(acc => {
            // Har row ka data comma se separate karke naye line mein jodna
            csvBody += `${acc.Name},${acc.Industry},${acc.Phone}\n`;
        });

        let csvFile = csvHeader + csvBody;

        // 3. Logic: Blob Object banana (Binary data for file)
        // 'text/csv' batata hai ki ye ek CSV file hai
        let blob = new Blob([csvFile], { type: 'data:text/csv;charset=utf-8;' });

        // 4. Working: Download Link generate karna
        let link = document.createElement("a");
        if (link.download !== undefined) {
            let url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "Account_Export.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click(); // Automatic click se download shuru ho jayega
            document.body.removeChild(link);
        }
    }
}