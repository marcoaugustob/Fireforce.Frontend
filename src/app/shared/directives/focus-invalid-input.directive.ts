import { Directive, HostListener, Input, ElementRef, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[FocusInvalidInput]'
})
export class FocusDirective {

  constructor(private el: ElementRef) { }

  @Input() formGroup: NgForm;

  @HostListener('submit', ['$event'])
  public onSubmit(event): void {     
    if ('INVALID' === this.formGroup.status) {
      event.preventDefault();

      const formGroupInvalid = this.el.nativeElement.querySelectorAll('.ng-invalid');
      if(formGroupInvalid.length > 0)
        (<HTMLInputElement>formGroupInvalid[0]).focus();
    }
  }
}

@NgModule({
    declarations: [FocusDirective],
    exports: [FocusDirective]
})
export class FocusModule { }