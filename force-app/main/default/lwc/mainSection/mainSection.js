import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/My_Note__c.Name';
import CONTENT_FIELD from '@salesforce/schema/My_Note__c.Content__c';
import TYPE_FIELD from '@salesforce/schema/My_Note__c.Type__c';

const fields = [NAME_FIELD, CONTENT_FIELD, TYPE_FIELD];

export default class MainSection extends LightningElement {
    @api recordId;

    @wire(getRecord, {
        recordId: "$recordId",
        fields
    })
    myNote;

    renderedCallback() {
        console.log(this.myNote);
    }

    get name() {
        return getFieldValue(this.myNote.data, NAME_FIELD);
    }

    get content() {
        return getFieldValue(this.myNote.data, CONTENT_FIELD);
    }

    get type() {
        return getFieldValue(this.myNote.data, TYPE_FIELD);
    }



}