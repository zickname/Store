import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  inject,
  OnDestroy,
  Type,
  ViewChild,
} from '@angular/core';
import { DialogDirective } from '../../directives/dialog.directive';
import { DialogRef } from '../../dialog-ref';
import { DialogConfig } from '../../dialog-config';

@Component({
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css',
    imports: [DialogDirective]
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private readonly cd = inject(ChangeDetectorRef);
  private readonly dialogRef = inject(DialogRef);
  public readonly config = inject(DialogConfig);

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
    this.dialogRef.destroy()
  }

  onOverlayClicked(event: MouseEvent) {
    this.dialogRef.destroy();
  }

  onDialogClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>): void {
    const viewContainerRef = this.insertionPoint?.viewContainerRef;

    viewContainerRef?.clear();

    this.componentRef = viewContainerRef?.createComponent(componentType)!;
    this.dialogRef.onChildComponentLoaded.next(this.componentRef!.instance);
  }
}
