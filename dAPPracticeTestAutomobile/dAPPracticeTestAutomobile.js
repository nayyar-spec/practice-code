import { LightningElement, track, api } from 'lwc';
import getOppList from '@salesforce/apex/OppControllerDapPracticeTest.getOppList';
import updateOpp from '@salesforce/apex/OppControllerDapPracticeTest.updateOpp';
import deleteOpp from '@salesforce/apex/OppControllerDapPracticeTest.deleteOpp';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from 'lightning/navigation';
const TABS = [
    { label: 'Prospecting', value: 'Prospecting', selected: false, bgColor: 'grey' },
    { label: 'Qualification', value: 'Qualification', selected: false, bgColor: 'grey' },
    { label: 'Needs Analysis', value: 'Needs_Analysis', selected: false, bgColor: 'grey' },
    { label: 'Value Proposition', value: 'Value_Proposition', selected: false, bgColor: 'grey' },
    { label: 'Id. Decision Makers', value: 'Id_Decision_Makers', selected: false, bgColor: 'grey' },
    { label: 'Perception Analysis', value: 'Perception_Analysis', selected: false, bgColor: 'grey' },
    { label: 'Proposal/Price Quote', value: 'Proposal_Price_Quote', selected: false, bgColor: 'grey' },
    { label: 'Negotiation/Review', value: 'Negotiation_Review', selected: false, bgColor: 'grey' },
    { label: 'Closed Won', value: 'Closed_Won', selected: false, bgColor: 'grey' },
    { label: 'Closed Lost', value: 'Closed_Lost', selected: false, bgColor: 'grey' },
]
export default class DAPPracticeTestAutomobile extends NavigationMixin(LightningElement) {
    @api tabs = TABS;
    @track selectedTabs = [];
    @track opportunities = [];
    @track mapOpp;
    @track isModalOpen = false;
    @track openedRecord = {
        id: '',
        name: '',
        amount: 0,
        email: ''
    };
    

    handleClick(event) {
        if(event.target.classList.contains('green-color'))
        {
            event.target.classList.remove('green-color');
        }
        else {
            event.target.classList.add('green-color')
        }

        const divs = this.template.querySelectorAll('.green-color');
        this.selectedTabs = [];
        divs.forEach(div => this.selectedTabs.push(div.label));
        console.log(this.selectedTabs);
        this.doWork();
        
    }

    async doWork(){
        try {
            this.opportunities = await getOppList({ stageList: this.selectedTabs });
        } catch (error) {
            this.opportunities = [];
        }
        console.log(this.opportunities);

        this.mapOpp = this.selectedTabs.map(tab => {
            return {
                key: tab,
                item: [...this.opportunities.filter(opp => opp.StageName == tab)
                    .sort((a,b) => (a.Amount > b.Amount) ? 1 : ((b.Amount > a.Amount) ? -1 : 0))
                    .slice(0,5)]
            }
        })
        console.log(this.mapOpp);
        this.mapOpp = JSON.parse(JSON.stringify(this.mapOpp));
        console.log(this.mapOpp);
    }

    async handleEditAction(event) {
        const recordId = event.currentTarget.dataset.id;
        await this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'edit'
            }
        },
        console.log('before calling then function')).then(() => {
            console.log('record gets edited');
            this.doWork();
        });
    }

    openModal(event){
        this.openedRecord.id = event.target.dataset.id;
        this.openedRecord.name = event.target.dataset.name;
        this.openedRecord.amount = event.target.dataset.amount;
        this.openedRecord.email = event.target.dataset.email;
        this.isModalOpen = true;
    }

    closeModal(){
        this.isModalOpen = false;
    }

    async handleEdit2Action(event) {
        this.isModalOpen = false;
        const record = {
            Id: this.openedRecord.id,
            Name: this.template.querySelector('.input-name').value,
            Amount: this.template.querySelector('.input-amount').value,
            Email__c: this.template.querySelector('.input-email').value,
        }
        await updateOpp({opp: record});
        const message = new ShowToastEvent({
        title: "Updated successfully",
        message:
            "The record you have edit gets edited successfully",
        });
        this.dispatchEvent(message);
        this.doWork();
    }

    async handleDeleteAction(event) {
        const deletingRecord = {
            Id: event.target.dataset.id
        };
        
        await deleteOpp({opp: deletingRecord});

        const message = new ShowToastEvent({
        title: "Deleted Successfully",
        message:
            "The record you have delete gets deleted successfully",
        });
        this.dispatchEvent(message);
        this.doWork();
    }

    navigateToOpp(event){
        const recordId = event.target.dataset.id;
        console.log(recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Opportunity',
                actionName: 'view'
            }
        });
    }

}