import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  Inject,
  inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import {DialogComponent} from '../components/dialog/dialog.component';
import {DialogRef} from '../dialog-ref';
import {DialogConfig} from '../dialog-config';
import {DialogInjector} from '../dialog-injector';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT)
  private dialogComponentRefMap: Map<DialogRef<any>, ComponentRef<DialogComponent>> = new Map();

  public open<T>(componentType: Type<T>, config: DialogConfig): DialogRef<T> {
    const dialogRef = this.appendDialogComponentToBody<T>(componentType, config);

    this.dialogComponentRefMap.get(dialogRef)!.instance.childComponentType = componentType;

    return dialogRef;
  }

  public getInstance(ref: DialogRef<any>) {
    return this.dialogComponentRefMap.get(ref)!.instance;
  }

  private appendDialogComponentToBody<T>(componentType: Type<T>, config: DialogConfig): DialogRef<T> {
    const map = new WeakMap();
    const dialogRef = new DialogRef<T>();

    map.set(DialogConfig, config);
    map.set(DialogRef, dialogRef);

    const sub = dialogRef.onClose.subscribe(() => {
      this.dialogComponentRefMap.get(dialogRef)!.instance.close();
      this.removeDialogComponentFromBody(dialogRef);
    });

    const destroySub = dialogRef.onDestroy.subscribe(() => {
      this.removeDialogComponentFromBody(dialogRef);
      destroySub.unsubscribe();
      sub.unsubscribe();
    });

    const hostElement = document.createElement('div');

    hostElement.classList.add('dialog-host');
    this.document.body.appendChild(hostElement);

    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: new DialogInjector(this.injector, map),
      hostElement: hostElement,
    });

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.document.body.appendChild(domElem);
    this.dialogComponentRefMap.set(dialogRef, componentRef);

    return dialogRef;
  }

  private removeDialogComponentFromBody(dialogRef: DialogRef<any>): void {
    if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
      return;
    }

    const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);

    this.appRef.detachView(dialogComponentRef!.hostView);
    dialogComponentRef!.destroy();

    this.dialogComponentRefMap.delete(dialogRef);
  }
}
