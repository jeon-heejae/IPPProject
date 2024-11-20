import LightningDatatable from 'lightning/datatable';
import htmlTableCell from './htmlTableCell.html';

export default class CustomDatatable extends LightningDatatable {
    static customTypes = {
        customHtml: {
            template: htmlTableCell,
            standardCellLayout: true
        }
    };
}
