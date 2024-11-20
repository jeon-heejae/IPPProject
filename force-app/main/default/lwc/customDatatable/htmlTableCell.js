import { LightningElement, api } from 'lwc';

export default class HtmlTableCell extends LightningElement {
    @api fieldName;
    @api row;

    renderedCallback() {
        const container = this.template.querySelector('div');
        if (container && this.row[this.fieldName]) {
            container.innerHTML = this.row[this.fieldName]; // HTML 링크 렌더링
        }
    }
}
