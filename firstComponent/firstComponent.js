import { LightningElement } from 'lwc';

export default class FirstComponent extends LightningElement {
    a = 10;
    handle() {
        // console.log(this.a);
        // console.log("hi");

        let fn = this.template.querySelector('.firstName').value;
        let ln = this.template.querySelector('.lastName').value;
    }
}