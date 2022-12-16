import { LightningElement, api } from 'lwc';

export default class NoteTile extends LightningElement {
    @api mynote;

    tileClick() {
        const event = new CustomEvent('tileclick', {
            detail: this.mynote.Id
        });
        this.dispatchEvent(event);
    }
}