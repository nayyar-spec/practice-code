import { LightningElement, api, wire, track } from 'lwc';
import getOpportunities from '@salesforce/apex/KanbanController.getOpportunities';
import updateOppStage from '@salesforce/apex/KanbanController.updateOppStage';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class KanbanBoard extends LightningElement {
    @track opportunities = [];
    wiredOppResult;
    @api opp;
    stage = 'Closed Won';

    get isTargetStage() {
        this.opp && this.opp.stageName === this.stage;
    }
    // Requirement: Kanban ke Columns (Stages) define karna
    stages = ['Prospecting', 'Qualification', 'Closed Won', 'Closed Lost'];

    @wire(getOpportunities)
    wiredData(result) {
        this.wiredOppResult = result;
        if (result.data) {
            this.groupOpp(data);
        }
    }

    groupOpp(Opps){
        
    }

    // WORKING: Jab user card uthana shuru kare (Drag Start)
    handleDragStart(event) {
        const oppId = event.target.dataset.id;
        // Requirement: DataTransfer object mein record ID store karna
        event.dataTransfer.setData("oppId", oppId);
    }

    // WORKING: Browser ko batana ki yahan drop "Allowed" hai
    handleAllowDrop(event) {
        event.preventDefault(); // Default behavior (block drop) ko rokna
    }

    // WORKING: Jab card column mein chhoda jaye (Drop)
    handleDrop(event) {
        event.preventDefault();
        const oppId = event.dataTransfer.getData("oppId");
        const newStage = event.currentTarget.dataset.stage;

        // Backend update call karna
        updateOppStage({ oppId: oppId, newStage: newStage })
            .then(() => {
                this.showToast('Success', 'Stage Updated!', 'success');
                return refreshApex(this.wiredOppResult); // Table refresh karna
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}