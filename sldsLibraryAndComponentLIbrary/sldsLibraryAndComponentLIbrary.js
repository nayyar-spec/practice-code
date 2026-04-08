import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class SldsLibraryAndComponentLIbrary extends NavigationMixin(LightningElement) {
    whichButton;
    @track modalOpen = false;
    handleClick(event) {
        this.whichButton = event.target.dataset.id;
        this.modalOpen = true;
    }
    closeModal() {
        this.modalOpen = false;
        console.log(this.modalOpen);
    }

    createRecord() {
        this.modalOpen = false;
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.whichButton,
                actionName: 'new'
            }
        })
    }
}