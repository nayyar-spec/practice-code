import { LightningElement } from 'lwc';
import createRecords from '@salesforce/apex/getRecords.createRecords'

export default class CreateRecords extends LightningElement {

    handleClick(){
        let name = this.template.querySelector('.name').value;
        let noe = this.template.querySelector('.numberOfEmployees').value;

        creatingRecords({"name":name, "noe":noe}).then(result =>{
            console.log(result);
        }).catch(error => {
            console.log(error);
        })
    }
}