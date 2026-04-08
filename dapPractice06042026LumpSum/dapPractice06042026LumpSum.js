import { LightningElement, track } from 'lwc';

export default class DapPractice06042026LumpSum extends LightningElement 
{
    @track isSip = true;
    @track investment = 500;
    @track monthlyInvestment = 500 * 12 * 15;
    @track returnRate = 1;
    @track timePeriod = 1;
    @track totalValue = 0; //(monthlyInvestment * (((1 + (returnRate/100))**timePeriod - 1)/(returnRate/100)));
    @track estReturns = 0; //totalValue - monthlyInvestment;

   handleInvestment(event){
    this.investment = event.target.value;
    this.monthlyInvestment = this.investment * 12 * 15;
    if(this.isSip){
        this.totalValue = (this.monthlyInvestment * (((1 + (this.returnRate/100))**this.timePeriod - 1)/(this.returnRate/100)));
        this.estReturns = this.totalValue - this.monthlyInvestment;
    }
    else{
        this.totalValue = this.investment * (1 + (this.returnRate/100))**this.timePeriod;
        this.estReturns = this.totalValue - this.investment;
    }
   }
   handleReturnRate(event){
    this.returnRate = event.target.value;
    this.monthlyInvestment = this.investment * 12 * 15;
    if(this.isSip){
        this.totalValue = (this.monthlyInvestment * (((1 + (this.returnRate/100))**this.timePeriod - 1)/(this.returnRate/100)));
        this.estReturns = this.totalValue - this.monthlyInvestment;
    }
    else{
        this.totalValue = this.investment * (1 + (this.returnRate/100))**this.timePeriod;
        this.estReturns = this.totalValue - this.investment;
    }
   }
   handleTimePeriod(event){
    this.timePeriod = event.target.value;
    this.monthlyInvestment = this.investment * 12 * 15;
    if(this.isSip){
        this.totalValue = (this.monthlyInvestment * (((1 + (this.returnRate/100))**this.timePeriod - 1)/(this.returnRate/100)));
        this.estReturns = this.totalValue - this.monthlyInvestment;
    }
    else{
        this.totalValue = this.investment * (1 + (this.returnRate/100))**this.timePeriod;
        this.estReturns = this.totalValue - this.investment;
    }
   }

//    renderedCallback() {
//     if(isSip){
//         this.totalValue = (this.investment * (((1 + (this.returnRate/100))**this.timePeriod - 1)/(this.returnRate/100)));
//     }
//     else{
//         this.totalValue = this.investment * (1 + (this.returnRate/100))**this.timePeriod;
//     }
//     this.estReturns = this.totalValue - this.investment;
//    }

   handleSip(){
    this.isSip = true;
    this.template.querySelector('.sip-button').variant = 'brand';
    this.template.querySelector('.lumpsum-button').variant = 'neutral';
    this.totalValue = (this.monthlyInvestment * (((1 + (this.returnRate/100))**this.timePeriod - 1)/(this.returnRate/100)));
    this.estReturns = this.totalValue - this.monthlyInvestment;
   }

   handleLumpsum(){
    this.isSip = false;
    this.template.querySelector('.sip-button').variant = 'neutral';
    this.template.querySelector('.lumpsum-button').variant = 'brand';
    this.totalValue = this.investment * (1 + (this.returnRate/100))**this.timePeriod;
    this.estReturns = this.totalValue - this.investment;
   }
}