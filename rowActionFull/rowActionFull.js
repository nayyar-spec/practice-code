import { LightningElement, wire, track } from 'lwc';
// NavigationMixin: Ye Salesforce ka "Driver" hai. Iska kaam hai user ko ek page se doosre page par le jana.
import { NavigationMixin } from 'lightning/navigation'; 
// deleteRecord: Ye ek ready-made function hai. Isse sirf ID chahiye, ye database se record mita deta hai.
import { deleteRecord } from 'lightning/uiRecordApi'; 
// refreshApex: Ye "Reset" button ki tarah hai jo sirf data ko taja karta hai bina poora page reload kiye.
import { refreshApex } from '@salesforce/apex';
// ShowToastEvent: Wo jo upar se success/error ka box aata hai, ye wahi banta hai.
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

// ACTIONS: Hum yahan menu ke options "Bana" rahe hain.
const ACTIONS = [
    { label: 'View Detail Page', name: 'view' },
    { label: 'Quick Edit', name: 'edit' },
    { label: 'Delete Record', name: 'delete' }
];

// COLUMNS: Hum table ka dhancha "Bata" rahe hain.
const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { 
        type: 'action', 
        // typeAttributes: Hum table ko "Bata" rahe hain ki action menu mein kaunse options dikhane hain.
        typeAttributes: { rowActions: ACTIONS } 
    }
];

// NavigationMixin ko extend karna padta hai, taaki hum 'this[NavigationMixin.Navigate]' use kar sakein.
export default class RowActionFull extends NavigationMixin(LightningElement) {
    columns = COLUMNS;
    accounts = [];
    wiredResponse; // Ye poora dabba (result) store karega refresh ke liye.
    
    @track isEditModalOpen = false; // Requirement: Ye switch hai (True = Popup dikhega, False = Gayab).
    @track currentRecordId; // Requirement: Ye yaad rakhega ki kis row ka button daba hai.

    @wire(getAccountList)
    handleAccounts(result) {
        this.wiredResponse = result; 
        if (result.data) {
            this.accounts = result.data;
        }
    }

    // handleRowAction: Ye automatic function hai. Jab bhi menu click hoga, LWC isme data "Bhej" dega.
    handleRowAction(event) {
        // actionName: Hum 'pata laga rahe hain' ki View daba ya Edit.
        const actionName = event.detail.action.name; 
        // row: LWC ne humein us poori line ka data 'Bhej' diya hai jahan click hua.
        const row = event.detail.row; 

        switch (actionName) {
            case 'view':
                this.navigateToRecord(row.Id); // Function ko ID 'Bhej' rahe hain.
                break;
            case 'edit':
                this.currentRecordId = row.Id; // ID 'Assign' kar rahe hain taaki popup ko pata chale kya kholna hai.
                this.isEditModalOpen = true;   // Popup ko 'Dikhne' ka order de rahe hain.
                break;
            case 'delete':
                this.deleteAccount(row.Id); 
                break;
        }
    }

    // navigateToRecord: Hum Salesforce ke navigation service ko "Instruction" de rahe hain.
    navigateToRecord(recordId) {
        // 'this[NavigationMixin.Navigate]' ek function call hai.
        // Iske andar jo { } hai, wo ek "Map/Object" hai jisme hum attributes "Bata" rahe hain.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage', // Target: Record page par jao.
            attributes: {
                recordId: recordId, // Data: Ye wali ID ka record dikhao.
                actionName: 'view'  // Mode: Khali dikhao (view mode).
            }
        });
    }

    // deleteAccount: Hum database ko command "Bhej" rahe hain.
    deleteAccount(recordId) {
        // deleteRecord function ko call kiya aur ID pass ki.
        deleteRecord(recordId) 
            .then(() => {
                // .then: "Agar kaam ho gaya toh..." (Callback function).
                this.showToast('Success', 'Record Delete Ho Gaya', 'success');
                return refreshApex(this.wiredResponse); // Table ko taja karne ka order.
            })
            .catch(error => {
                // .catch: "Agar fail hua toh..."
                this.showToast('Error', 'Mana kar diya database ne!', 'error');
            });
    }

    // closeModal: Popup band karne ke liye variable ko reset karna.
    closeModal() {
        this.isEditModalOpen = false;
    }

    // handleEditSuccess: Jab LDS Form save ho jaye toh ye automatic chalta hai.
    handleEditSuccess() {
        this.showToast('Success', 'Update Ho Gaya!', 'success');
        this.isEditModalOpen = false; 
        return refreshApex(this.wiredResponse);
    }

    // showToast: Ek naya Event 'Bana' kar system ko 'Bhej' (Dispatch) rahe hain.
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event); // Event ko "Fire" karna ya "Phenkna".
    }
}