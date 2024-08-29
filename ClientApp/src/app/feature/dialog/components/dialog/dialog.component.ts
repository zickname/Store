import {
  AfterViewInit, ChangeDetectorRef,
  Component, ComponentRef,
  inject, OnDestroy, Type, ViewChild
} from '@angular/core';
import {DialogDirective} from "../../directives/dialog.directive";
import {Subject} from "rxjs";
import {DialogRef} from "../../dialog-ref";

@Component({
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private readonly cd = inject(ChangeDetectorRef);
  private readonly dialogRef = inject(DialogRef)

  public componentRef: ComponentRef<any> | null = null;
  public childComponentType: Type<any> | null = null;

  @ViewChild(DialogDirective) insertionPoint: DialogDirective | undefined;

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType!);
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this.cd.markForCheck();
  }

  onOverlayClicked(event: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>): void {
    const viewContainerRef = this.insertionPoint?.viewContainerRef;
    console.log(viewContainerRef)
    viewContainerRef?.clear();

    this.componentRef = viewContainerRef?.createComponent(componentType)!;
    this.dialogRef.onChildComponentLoaded.next(this.componentRef!.instance);
  }
}
