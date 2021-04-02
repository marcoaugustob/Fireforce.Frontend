import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'app/shared/services/token.service';

@Component({
    selector: 'custom-datatable',
    templateUrl: './custom-datatable.component.html',
    styleUrls: ['./custom-datatable.component.scss']
})
export class CustomDataTableComponent implements OnInit, OnChanges {
    @Input()
    columns: Array<any>;

    private _rows: any[] = [];
    @Input()
    public get rows(): any[] {
        return this._rows;
    }

    public set rows(rows: any[]) {
        this._rows = rows;
    }

    @Input()
    pageLength: number = 10;
    @Input()
    currentPage: number = 1;
    @Input()
    totalResults: number;
    @Input()
    sortProperties: string[];
    @Input()
    sortDirections: string[];
    @Input()
    clientSide: boolean;
    @Output()
    sortPropertiesChange = new EventEmitter();
    @Output()
    sortDirectionsChange = new EventEmitter();
    @Output()
    pageLengthChange = new EventEmitter();
    @Output()
    currentPageChange = new EventEmitter();
    @Output()
    settingsChange = new EventEmitter();
    @Input()
    clickFunction: any;
    @Input()
    modalCalled: any;
    @Input()
    self: any;

    pageLengthOptions = [{ value: 5, label: '5' }, { value: 10, label: '10' }, { value: 25, label: '25' }, { value: 50, label: '50' }, { value: 100, label: '100' }];
    pageCount: number = 1;
    pagesToShow: number[] = [];
    todayDate = new Date();
    clientSideRows: any;
    currentPageValues: any;
    totais: any;
    showTotais: boolean = false;
    isMobile: boolean = false;

    constructor(private router: Router, protected tokenService: TokenService) { }

    ngOnInit(): void {
        this.onLoad(event);
        this.buildPagesToShow();
        if (this.sortProperties && this.sortDirections) {
            for (const item of this.columns) {
                if (item.prop == this.sortProperties[0]) {
                    item.sortBy = { prop: item.prop, direction: this.sortDirections[0] }
                }
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        const rows: SimpleChange = changes.rows;
        if (rows) {
            if (this.clientSide) {
                this.clientSideRows = rows.currentValue;
                this.showTotais = this.checkTotal();
                this.getCurrentPageValuesClient();
                if (this.clientSideRows.length > 0)
                    this.calcTotais();
            } else {
                this.currentPageValues = rows.currentValue;
            }
            this.calcPages();
        }
    }

    calcPages() {
        this.calcPageCount();
        this.buildPagesToShow();
    }

    calcPageCount(): void {
        if (!this.clientSide)
            this.pageCount = Math.ceil(this.totalResults / this.pageLength);
        else
            this.pageCount = Math.ceil((this.clientSideRows.length - 1) / this.pageLength);
    }

    buildPagesToShow(): void {
        if (this.isMobile) {
            this.pagesToShow = [];
            let startIndex = this.currentPage > 1 ? this.currentPage - 1 : 1;
            let endIndex = (this.pageCount - this.currentPage) > 1 ? this.currentPage + 1 : this.pageCount;
            for (let index = startIndex; index <= endIndex; index++) {
                this.pagesToShow.push(index);
            }
        } else {
            this.pagesToShow = [];
            let startIndex = this.currentPage > 2 ? this.currentPage - 2 : 1;
            let endIndex = (this.pageCount - this.currentPage) > 2 ? this.currentPage + 2 : this.pageCount;
            for (let index = startIndex; index <= endIndex; index++) {
                this.pagesToShow.push(index);
            }
        }
    }

    onSortChanged(column) {
        if (column.canSort) {
            if (!column.sortBy) {
                column.sortBy = { prop: column.prop, direction: "asc" }
            } else if (column.sortBy.direction == "asc") {
                column.sortBy.direction = 'desc';
            } else if (column.sortBy.direction == "desc") {
                column.sortBy = null;
            }

            this.sortProperties = [];
            this.sortDirections = [];
            for (let item of this.columns) {
                if (item.sortBy) {
                    this.sortProperties.push(item.sortBy.prop);
                    this.sortDirections.push(item.sortBy.direction);
                }
            }
            if (this.sortProperties.length == 0)
                this.sortProperties = this.sortDirections = null;
            if (this.clientSide) {
                this.sortRows();
            } else {
                this.sortPropertiesChange.emit(this.sortProperties);
                this.sortDirectionsChange.emit(this.sortDirections);
                this.settingsChange.emit();
            }
            this.calcPages();
        }
    }

    onChangePageLength() {
        this.firstPage();
        this.calcPages();
        if (!this.clientSide) {
            this.pageLengthChange.emit(this.pageLength);
            this.settingsChange.emit();
        } else {
            this.getCurrentPageValuesClient();
        }
    }

    onChangeCurrentPage(pageNumber: number) {
        this.currentPage = pageNumber;
        if (!this.clientSide) {
            this.currentPageChange.emit(this.currentPage);
            this.settingsChange.emit();
        } else {
            this.getCurrentPageValuesClient();
        }
    }

    firstPage() {
        if (this.currentPage != 1) {
            this.currentPage = 1;
            if (!this.clientSide) {
                this.currentPageChange.emit(this.currentPage);
                this.settingsChange.emit();
            } else {
                this.getCurrentPageValuesClient();
            }
        }
    }

    previousPage() {
        if (this.currentPage != 1) {
            this.currentPage = this.currentPage - 1 == 0 ? 1 : this.currentPage - 1;
            if (!this.clientSide) {
                this.currentPageChange.emit(this.currentPage);
                this.settingsChange.emit();
            } else {
                this.getCurrentPageValuesClient();
            }
        }
    }

    nextPage() {
        if (this.currentPage != this.pageCount) {
            this.currentPage = this.currentPage + 1 > this.pageCount ? this.pageCount : this.currentPage + 1;
            if (!this.clientSide) {
                this.currentPageChange.emit(this.currentPage);
                this.settingsChange.emit();
            } else {
                this.getCurrentPageValuesClient();
            }
        }
    }

    lastPage() {
        if (this.currentPage != this.pageCount) {
            this.currentPage = this.pageCount;
            if (!this.clientSide) {
                this.currentPageChange.emit(this.currentPage);
                this.settingsChange.emit();
            } else {
                this.getCurrentPageValuesClient();
            }
        }
    }

    getEnumValue(column, item) {
        return Object.keys(column.enumObject).find(key => column.enumObject[key] === item[column.prop])
    }

    /* obj =  objeto que possuí o atributo desejado
    path = atributo que deverá ser acessado*/
    resolve(obj, path) {
        path = path.split('.');
        var current = obj;
        while (path.length) {
            if (typeof current !== 'object' || current == null) return undefined;
            current = current[path.shift()];
        }
        return current;
    }

    navigation(route, routeProp, item) {
        if (route) {
            route = route.trim();
            this.router.navigate([route + this.resolve(item, routeProp)]);
            if (routeProp === 'urlAction' && item.isRead != true) {
                item.isRead = true;
            }
        }
    }

    navigationMobile(item) {
        const columnLink = this.columns.find(c => c.link === true);
        if (columnLink) {
            const route = columnLink.route.trim();

            const routeProp = columnLink.routeProp;
            if (route && routeProp) {
                this.router.navigate([route + this.resolve(item, routeProp)]);
            }
        }
    }

    sortRows() {
        this.sortProperties.forEach((prop, index) => {
            this.clientSideRows = this.clientSideRows.sortBy((a, b) => {
                if (this.resolve(a, prop) < this.resolve(b, prop) && this.sortDirections[index] == "asc")
                    return -1;
                else if (this.resolve(a, prop) < this.resolve(b, prop) && this.sortDirections[index] == "desc")
                    return 1;
                if (this.resolve(a, prop) > this.resolve(b, prop) && this.sortDirections[index] == "asc")
                    return 1;
                else if (this.resolve(a, prop) > this.resolve(b, prop) && this.sortDirections[index] == "desc")
                    return -1;
                return 0;
            });
        });
        this.getCurrentPageValuesClient();
    }

    getCurrentPageValuesClient() {
        this.currentPageValues = this.clientSideRows.slice((this.currentPage - 1) * this.pageLength, this.pageLength * this.currentPage);
        this.calcPages();
    }

    checkTotal() {
        return this.columns.some(x => x.total);
    }

    calcTotais() {
        this.totais = [];
        if (this.showTotais) {
            this.columns.forEach((column, i) => {
                if (i != 0)
                    if (column.total) {
                        // if (column.avg) //Expecifico conversão
                        //     this.totais.push(parseFloat((this.getTotal('leadsRealizadas') * 100 / this.getTotal('totalLeads')).toFixed(2)) + ' %');
                        // else
                        this.totais.push(this.getTotal(column.prop));
                    } else {
                        this.totais.push('');
                    }
            });
        }
    }

    getTotal(prop) {
        var result = 0;
        this.rows.forEach(item => {
            result += Number(this.resolve(item, prop));
        })
        return result;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {

        if (window.innerWidth >= 992) {
            this.isMobile = false;
        }
        else if (window.innerWidth < 992) {
            this.isMobile = true;
        }
    }

    @HostListener('window:onload', ['$event'])
    onLoad(event) {
        this.onResize(event);
    }

    onClick(row: any) {
        if (this.clickFunction)
            this.clickFunction(row, this.self)
    }
}
