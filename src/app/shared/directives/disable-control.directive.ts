import { NgControl } from '@angular/forms';
import { Directive, Input, NgModule } from '@angular/core';

@Directive({
    selector: '[disableControl]'
})
export class DisableControlDirective {

    @Input() set disableControl(condition: boolean) {
        const action = condition ? 'disable' : 'enable';
        this.ngControl.control[action]();
    }

    constructor(private ngControl: NgControl) {
    }
}


@NgModule({
    declarations: [DisableControlDirective],
    exports: [DisableControlDirective]
})
export class DisableControlModule { }