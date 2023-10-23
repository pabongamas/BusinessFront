import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingMsj = new BehaviorSubject<string>('');
  loading$ = this.loadingSubject.asObservable();
  loadingMsj$ = this.loadingMsj.asObservable();

  setLoading(loading: boolean, msj: string) {
    this.loadingSubject.next(loading);
    this.loadingMsj.next(msj);
  }
  constructor() {}
}
