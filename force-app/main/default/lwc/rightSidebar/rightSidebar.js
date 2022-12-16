import { LightningElement } from 'lwc';
import ModalWindow from 'c/modalWindow';

export default class RightSidebar extends LightningElement {
    result;
    async handleClick() {
        this.result = await ModalWindow.open({
            size: 'small',
            description: 'Modal for creating a new note',
        });
    }
}