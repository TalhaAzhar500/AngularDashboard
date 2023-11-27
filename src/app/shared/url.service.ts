import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  BaseURL = 'https://tdc-dashboard-5ec92093d7de.herokuapp.com';
  LoginURL = this.BaseURL + '/login';
  AdminURL = this.BaseURL + '/admins';
  MemberURL = this.BaseURL + '/members';
  ProjectURL = this.BaseURL + '/projects';
  SignUpURL = this.MemberURL + '/signup';
  ResetPassURL = this.BaseURL + '/reset-password';
  ForgotPassURL = this.BaseURL + '/forget-password';

  constructor() {}
}
