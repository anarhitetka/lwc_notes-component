import { LightningElement, wire, track } from 'lwc';

export default class MySampleComponent extends LightningElement {
    selectedNoteId;

    handleNoteSelected(evt) {
        this.selectedNoteId = evt.detail;
    }

}