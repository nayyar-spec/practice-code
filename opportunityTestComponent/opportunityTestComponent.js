import { LightningElement, wire, track } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityTestController.getOpportunities';
import {refreshApex} from '@salesforce/apex';
import {NavigationMixin} from 'lightning/navigation';

const TABS = [
    { label: 'All Opportunities', value: 'All_Opportunities' },
    { label: 'Prospecting', value: 'Prospecting' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Needs Analysis', value: 'Needs_Analysis' },
    { label: 'Value Proposition', value: 'Value_Proposition' },
    { label: 'Id. Decision Makers', value: 'Id_Decision_Makers' },
    { label: 'Perception Analysis', value: 'Perception_Analysis' },
    { label: 'Proposal/Price Quote', value: 'Proposal_Price_Quote' },
    { label: 'Negotiation/Review', value: 'Negotiation_Review' },
    { label: 'Closed Won', value: 'Closed_Won' },
    { label: 'Closed Lost', value: 'Closed_Lost' },
]

const COLUMNS = [
    { label: 'Date', fieldName: 'CloseDate', sortable: "true" },
    { label: 'Referral Source', fieldName: 'Referral_Source__c', sortable: "true" },
    { label: 'Type', fieldName: 'Type', sortable: "true" },
    // { label: 'Account Name', fieldName: 'Account' },
    {
                label: 'Name',
                fieldName: 'opportunityLink',
                type: 'url',
                typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }
                // target:Determines how the link behaves when clicked
                // '_blank': Opens the link in a new browser tab or window
                // '_self': Opens the link in the same tab (default behavior)
        },
    { label: 'Quantity', fieldName: 'Quantity__c', sortable: "true"}
]

export default class OpprtunitiesComponent extends NavigationMixin(LightningElement) {

    tabs = TABS;
    columns = COLUMNS;
    wiredOpp;
    @track sortBy;
    @track sortDirection;
    opportunities = [];
    @track filteredOpportunities = [];

    @wire(getOpportunities)
    handleOpportunities(result) {
        this.wiredOpp = result;
        if (result.data) {
            this.opportunities = JSON.parse(JSON.stringify(result.data));
            console.log(this.opportunities);
            this.opportunities.forEach(opp => {
                opp.opportunityLink = '/' + opp.Id;
            })
            this.filteredOpportunities = [...this.opportunities];
        } else if (result.error) {
            console.log('error', error);
        }
    }

    handleClick(event) {
        const stage = event.target.value;
        console.log(stage);
        if(stage === 'All_Opportunities'){
            this.filteredOpportunities = [...this.opportunities];
        }
        else{
            this.filteredOpportunities = this.opportunities.filter(opportunity => opportunity.StageName === stage);
        }
    }

    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.filteredOpportunities));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1: -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.filteredOpportunities = parseData;
    }

    refreshTable() {
        refreshApex(this.wiredOpp);
    
    }

    createRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'new'
            }
        })
    }
}