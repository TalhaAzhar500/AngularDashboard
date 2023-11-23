import { Injectable } from '@angular/core';
import { userFormat } from './user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  data!: userFormat;

  constructor() {
    this.setUserData();
  }

  setUserData() {
    const localData: any = localStorage.getItem('userData');
    const userData = localData ? JSON.parse(localData) : null;
    this.data = userData;
  }
}
