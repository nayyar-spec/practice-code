import { LightningElement, track } from 'lwc';

export default class CustomModal extends LightningElement {
    // @track: Ye variable "Chaukanna" rehta hai. 
    // Jaise hi iski value badlegi, HTML apne aap ko update kar lega.
    @track isModalOpen = false;

    // Working: Jab main button click hoga, ye popup ko "Show" kar dega.
    openModal() {
        // isModalOpen ko true 'Assign' kar rahe hain.
        this.isModalOpen = true; 
    }

    // Working: Jab popup ke andar ka 'Close' ya 'Cancel' button dabega.
    closeModal() {
        // isModalOpen ko false 'Assign' kar rahe hain taaki dabba gayab ho jaye.
        this.isModalOpen = false;
    }

    // Working: Jab user 'Submit' dabaye (Custom Logic).
    handleSumbit() {
        alert('Aapne Submit kar diya! Ab main popup band kar raha hoon.');
        this.isModalOpen = false;
    }
}