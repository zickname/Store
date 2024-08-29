import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appDialog]'
})
export class DialogDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
