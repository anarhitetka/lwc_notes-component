import { LightningElement, wire, track } from 'lwc';
import getMyNotesMethod from '@salesforce/apex/GetMyNotes.getMyNotesMethod';

export default class NoteList extends LightningElement {
    activeSections = ['A'];

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;
    }

    /////////// 1) /////////////
    // @wire(getMyNotesMethod) wiredNotes;
    ////////////////////////

    handleTileClick(evt) {
        const event = new CustomEvent('noteselected', {
            detail: evt.detail
        });
        this.dispatchEvent(event);
    }


    //////////// 2) ////////////
    @track notesList;
    generalNotes;
    accNotes;
    opptyNotes;

    @wire(getMyNotesMethod) newWiredNotes({ data, error }) {
        if (data) {
            this.notesList = data;

            this.generalNotes = this.notesList.filter(note => {
                return note.Type__c === 'General';
            });

            this.accNotes = this.notesList.filter(note => {
                return note.Type__c === 'Account';
            });

            this.opptyNotes = this.notesList.filter(note => {
                return note.Type__c === 'Opportunity';
            });

        } else if (error) {
            console.log(error);
        }
    }



    ////////////////////////

    renderedCallback() {
        // console.log('WIRED NOTES:');
        // console.log(this.wiredNotes);
    }

}