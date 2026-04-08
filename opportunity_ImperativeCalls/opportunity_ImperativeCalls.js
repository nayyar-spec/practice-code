import { LightningElement, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOppList from '@salesforce/apex/OpportunityController.getOppList';
import updateOppStage from '@salesforce/apex/OpportunityController.updateOppStage';

const COLUMNS = [
    {label: 'Opportunity Name', fieldName: 'Name', type: 'text'},
    {label: 'Status', fieldName: 'StageName', type: 'text'}
]

const STATUSOPTIONS = [
    {label: 'Prospecting', value: 'Prospecting'},
    {label: 'Qualification', value: 'Qualification'},
    {label: 'Needs Analysis', value: 'Needs Analysis'},
    {label: 'Value Proposition', value: 'Value Proposition'},
    {label: 'Id. Decision Makers', value: 'Id. Decision Makers'},
    {label: 'Perception Analysis', value: 'Perception Analysis'},
    {label: 'Proposal/Price Quote', value: 'Proposal/Price Quote'},
    {label: 'Negotiation/Review', value: 'Negotiation/Review'},
    {label: 'Closed Won', value: 'Closed Won'},
    {label: 'Closed Lost', value: 'Closed Lost'},
]

export default class Opportunity_ImperativeCalls extends LightningElement {
    columns = COLUMNS;
    statusOptions = STATUSOPTIONS;
    opportunities;
    @track filteredOpportunities;
    selectedOption;
    selectedOppIds = [];
    wiredOpp=[];

    @wire(getOppList)
    handleTableData(result){
        this.wiredOpp = result;
        if(result.data){
            this.opportunities = result.data;
            this.filteredOpportunities = this.opportunities;
        }
        else if(result.error){
            console.log(result.error);
        }
    }


    handleSearch(){
        const keyValue = this.template.querySelector('.searchinput').value ? 
        this.template.querySelector('.searchinput').value.toLowerCase() : '';
        console.log(keyValue);
        if(keyValue){
            this.filteredOpportunities = this.opportunities.filter(
                opp => opp.Name.toLowerCase().includes(keyValue) ||
                opp.StageName.toLowerCase().includes(keyValue)
            )
        }
        else{
            this.filteredOpportunities = this.opportunities;
        }
    }

    
    updateStatus(event){
        this.selectedOption = event.detail.value;
        this.selectedOppIds = this.template.querySelector('lightning-datatable').getSelectedRows().map(row => row.Id);
        updateOppStage({oppIds: this.selectedOppIds, oppStage: this.selectedOption}).then(
            resulting => {
                console.log('updated');
                refreshApex(this.wiredOpp);
            }
        );
        
    }

    
    
    
}