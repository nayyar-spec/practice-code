import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountDateSearchController.getAccountsBySearch';

export default class DataExportAnother extends LightningElement {
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

        downloadCSV() 
        {
            // Prepare a html table
            let doc = '<table>';
            // Add styles for the table
            doc += '<style>';
            doc += 'table, th, td {';
            doc += '    border: 1px solid black;';
            doc += '    border-collapse: collapse;';
            doc += '}';          
            doc += '</style>';
            // Add all the Table Headers
            doc += '<tr>';
            this.columns.forEach(element => {            
                doc += '<th>'+ element.label +'</th>'           
            });
            doc += '</tr>';
            // Add the data rows
            this.accounts.forEach(record => {
                doc += '<tr>';
                doc += '<th>'+ record.Name +'</th>'; 
                doc += '<th>'+ record.Industry +'</th>';
                doc += '<th>'+ record.Phone +'</th>'; 
                doc += '</tr>';
            });
            doc += '</table>';
            var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
            let downloadElement = document.createElement('a');
            downloadElement.href = element;
            downloadElement.target = '_self';
            // use .csv as extension on below line if you want to export data as csv
            downloadElement.download = 'Account Data.xls';
            document.body.appendChild(downloadElement);
            downloadElement.click();
        }
}