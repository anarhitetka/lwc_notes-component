public with sharing class GetMyNotes {

    @AuraEnabled(cacheable=true)
    public static List<My_Note__c> getMyNotesMethod(){
        try {
            return [SELECT Id, Name, Type__c, Content__c FROM My_Note__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}