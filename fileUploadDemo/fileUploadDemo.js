import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FileUploadDemo extends LightningElement {
    // @api recordId: Agar ye component Record Page par hai, 
    // toh Salesforce automatically current record ki ID yahan daal dega.
    @api recordId; 

    // Requirement: Kaun-kaun se file formats allow karne hain.
    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg', '.csv'];
    }

    // WORKING: Jab file upload successfully finish ho jaye.
    handleUploadFinished(event) {
        // Requirement: event.detail.files se humein uploaded files ki list milti hai.
        const uploadedFiles = event.detail.files;
        const totalFiles = uploadedFiles.length;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: totalFiles + ' File(s) uploaded successfully!',
                variant: 'success',
            }),
        );

        // Optional: Aap yahan se refresh logic bhi chala sakte hain
        // taaki 'Notes & Attachments' related list update ho jaye.
    }
}