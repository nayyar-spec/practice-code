import { LightningElement, wire } from 'lwc';
import getFreshers from '@salesforce/apex/FreshersController.getFreshers';



export default class Accordion10 extends LightningElement {

    freshersMap;
    filteredFreshersList;
    collegeList = new Set();
    yearList = new Set();
    profileList = new Set();


    selectedCollege;
    selectedYear;
    selectedProfile;
    fresher;
    @wire(getFreshers)
    handleRecords(result){
        if(result.data){
            this.fresher=Object.keys(result.data).map(key => {
                return {
                    col: key,
                    year : Object.keys(result.data[key]).map(year => {
                        return {
                            yr: year,
                            profile : Object.keys(result.data[key][year]).map(profile => {
                                return {
                                    prof: profile,
                                    fresherList : result.data[key][year][profile]
                                }
                            })
                        }})
                }
            });
            console.log(JSON.stringify(this.fresher));
            
            //console.log('freshersMap is ', this.fresher);
            this.freshersMap = result.data
            console.log('without strigify', this.freshersMap);
            console.log('freshersMap is ', JSON.stringify(this.freshersMap));
            // this.freshersMap.forEach(element => {
            //     // console.log('loop is working and element profile is ', element.Profile__c);
            //     // console.log('loop is working and element college is ', element.College__r.Name);
            //     // this.profileList.add(element.Profile__c);
            //     // this.collegeList.add(element.College__r.Name);
            //     // this.yearList.add(element.Year__c);
            // });
            
            // console.log(JSON.stringify(this.freshersList));
            // console.log(JSON.stringify(this.collegeList));
            // console.log(JSON.stringify(this.yearList));
            // console.log(JSON.stringify(this.profileList));
        }
        else if(result.error){
            console.log(result.error);
        }
    }


}