import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  BaseURL = 'https://tdc-dashboard-5ec92093d7de.herokuapp.com';
  LoginURL = this.BaseURL + '/members/login';
  MembersURL = this.BaseURL + '/members';
  AddMemberURL = this.MembersURL + '/create';
  DepartmentURL = this.BaseURL + '/department';
  ProjectURL = this.BaseURL + '/projects';
  ResetPassURL = this.MembersURL + '/reset-password';
  ForgotPassURL = this.BaseURL + '/forget-password';

  constructor() {}
}
