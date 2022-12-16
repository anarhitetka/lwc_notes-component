import LightningModal from 'lightning/modal';
import { wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/My_Note__c.Type__c';
import MY_NOTE_OBJECT from '@salesforce/schema/My_Note__c';

import LightningAlert from 'lightning/alert';

export default class ModalWindow extends LightningModal {
    noteId;
    noteName;
    noteContent;

    typeOptions = [];
    selectedTypeValue;

    @wire(getObjectInfo, { objectApiName: MY_NOTE_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: TYPE_FIELD })
    wiredTypeOptionData({ error, data }) {
        if (data) {
            this.typeOptions = data.values;
        } else if (error) {
            alert('Something went wrong: ' + JSON.stringify(error));
        }
    }

    nameChangedHandler(event) {
        this.noteName = event.target.value;
    }

    contentChangedHandler(event) {
        this.noteContent = event.target.value;
    }

    typeChangedHandler(event) {
        this.selectedTypeValue = event.target.value;
    }

    createNote() {
        let fields = {
            'Name': this.noteName,
            'Content__c': this.noteContent,
            'Type__c': this.selectedTypeValue,
        };

        let objRecordInput = { 'apiName': 'My_Note__c', fields };

        if (this.noteName && this.selectedTypeValue) {
            createRecord(objRecordInput).then(res => {
                this.noteId = res.id;
                // alert('New note created with id: ' + res.id);
                LightningAlert.open({
                    message: 'New note created with id: ' + res.id,
                    theme: 'success',
                    label: 'New note successfully created'
                });
            }).catch(err => {
                alert('error: ' + JSON.stringify(err));
            });

            // reset all inputs and record id
            this.handleReset();
            this.template.querySelector('lightning-record-edit-form').noteId = null;

            // close modal
            this.close();



        } else {
            LightningAlert.open({
                message: 'Please fill out all the required fields',
                theme: 'inverse',
                label: 'Cannot save the note'
            });
        }

    }

    handleReset(event) {
        this.template.querySelector('lightning-input').value = '';
        this.template.querySelector('lightning-textarea').value = '';
        this.template.querySelectorAll('lightning-combobox').forEach(item => {
            item.value = '';
        })

        this.noteName = null;
        this.noteContent = null;
        this.selectedTypeValue = null;
    }


    // handleOkay() {
    //     this.close('okay');
    // }


}