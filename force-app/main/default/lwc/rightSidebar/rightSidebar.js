import { LightningElement } from 'lwc';
import ModalWindow from 'c/modalWindow';

export default class RightSidebar extends LightningElement {
    result;
    async handleClick() {
        this.result = await ModalWindow.open({
            size: 'small',
            description: 'Modal for creating a new note',
            //content: 'Passed into content api',
        });
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        //console.log(result);
    }
}