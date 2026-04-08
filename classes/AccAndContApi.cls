@RestResource(urlMapping = '/getAccCont')
global class AccAndContAPI 
{
	@HttpPost
    global static string getAccountAndContact()
    {
        RestRequest req = RestContext.request;
        String str = req.requestBody.toString();
        Map<string, Object> accNameMap = (Map<String, Object>) JSON.deserializeUntyped(str);
        String accName = (string) accNameMap.get('Name');
        List<Account> accList = [Select Name, NumberOfEmployees, (Select Name from Contacts) from Account where Name = :accName LIMIT 1];
        Map<String, Object> conMap = new Map<String, Object>();
        integer i = 1;
        for(Contact con : accList[0].Contacts)
        {
            conMap.put('Contact' + i, 'Name = ' + con.Name);
            i++;
        }
        Map<String, Object> accMap = new Map<String, Object>();
        accMap.put('Name', accList[0].Name);
        accMap.put('NumberOfEmployees', accList[0].NumberOfEmployees);
        accMap.put('Contacts', conMap);
        
        return JSON.serialize(accMap);
        
    }
}
