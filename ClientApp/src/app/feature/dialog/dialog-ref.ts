import {Observable, Subject} from "rxjs";

export class DialogRef<ComponentType = any> {
  private readonly _afterClosed = new Subject<any>();
  private readonly _onDestroy = new Subject<any>();

  public onDestroy: Observable<any> = this._onDestroy.asObservable();
  public onClose: Observable<any> = this._afterClosed.asObservable();

  close(result?: any): void {
    this._afterClosed.next(result)
  }

  destroy() {
    this._onDestroy.next(null);
  }

  readonly onChildComponentLoaded = new Subject<ComponentType>();
}
