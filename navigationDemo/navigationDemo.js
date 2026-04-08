import { LightningElement } from 'lwc';
// Requirement: NavigationMixin ko import karna aur class mein 'extend' karna zaroori hai.
import { NavigationMixin } from 'lightning/navigation';

// Mixin ka matlab hai: Hum apni class ko extra powers (Navigation ki powers) de rahe hain.
export default class NavigationDemo extends NavigationMixin(LightningElement) {

    // 1. HOME PAGE par jane ke liye
    navigateToHome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            }
        });
    }

    // 2. NEW RECORD page par jane ke liye (e.g., Contact ka 'New' form kholna)
    navigateToNewContact() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            }
        });
    }

    // 3. RECENT LIST view par jane ke liye (e.g., Account ki list)
    navigateToAccountList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            },
            state: {
                // filterName: 'Recent' se recent records dikhte hain
                filterName: 'Recent'
            }
        });
    }

    // 4. EXTERNAL WEBSITE (Google) par jane ke liye
    navigateToGoogle() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://www.google.com'
            }
        });
    }
}