import { LightningElement, wire } from 'lwc';
import getCaseList from '@salesforce/apex/CaseController.getCaseList';
import { publish, MessageContext } from 'lightning/messageService';
import CASE_CHANNEL from '@salesforce/messageChannel/CaseChannel__c';

const COLUMNS = [
    {label: 'Subject', fieldName: 'Subject', type: 'text'},
    {label: 'Status', fieldName: 'Status', type: 'text'},
    {label: 'Priority', fieldName: 'Priority', type: 'text'},
    {label: 'Created Date', fieldName: 'CreatedDate', type: 'date'}]

export default class CaseComponent6 extends LightningElement {
    columns = COLUMNS;
    cases ;
    newStatus = 0;
    workingStatus = 0;
    escalatedStatus = 0;
    closedStatus = 0;

    @wire(MessageContext)
    messageContext;

    @wire(getCaseList)
    handleTableData(result){
        if(result.data){
            this.cases = result.data;

            this.cases.forEach(element => {
            switch(element.Status) {
                case 'New':
                    this.newStatus++;
                    break;
                case 'Working':
                    this.workingStatus++;
                    break;
                case 'Escalated':
                    this.escalatedStatus++;
                    break;
                case 'Closed':
                    this.closedStatus++;
            }
        });
        }
        else if(result.error){
            console.error(result.error);
        }

        
    }

    handleRowSelection(event){
        const selectedRow = event.detail.selectedRows;
        publish(this.messageContext, CASE_CHANNEL, selectedRow);
    }

    
}