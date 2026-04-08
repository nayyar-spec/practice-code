import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class RefreshDemo extends LightningElement {
    accounts; 
    wiredResponse; 

    /* SMART WORKING (WIRE SERVICE):
       Yahan humne 'wiredAccounts' function ko kahin call nahi kiya hai.
       LWC ka @wire engine jaise hi page load hota hai, automatically Apex ko call karta hai.
       Jab Apex se response aata hai, toh LWC khud is function ko chalata hai 
       aur saara data ek 'result' naam ke object mein daal kar bhej deta hai.
    */
    @wire(getAccountList)
    wiredAccounts(result) {
        // 'result' variable LWC ne khud banaya hai. 
        // Isme do pockets hain: result.data aur result.error
        
        // Hum poore 'result' ko 'wiredResponse' mein save kar rahe hain.
        // Kyun? Taaki baad mein refreshApex ko pata chale ki kaunsa wala wire refresh karna hai.
        this.wiredResponse = result; 

        if (result.data) {
            // Agar server se data sahi-salamat aaya hai, toh use 'accounts' mein daal do
            this.accounts = result.data;
        } else if (result.error) {
            // Agar koi error aayi hai (jaise internet issue ya server error)
            console.error('Error info:', result.error);
        }
    }

    handleRefresh() {
        /* refreshApex ek 'Promise' based function hai.
           Iska kaam hai: "Purane result ko lo, server pe dubara jao, aur data taja karke lao."
        */
        refreshApex(this.wiredResponse)
            .then(() => {
                // Jab naya data aa jayega, toh @wire wala function (upar wala) 
                // apne aap fir se chalega aur 'this.accounts' update ho jayega.
                console.log('Data refreshed!');
            })
            .catch((error) => {
                console.error('Refresh fail hua:', error);
            });
    }
}