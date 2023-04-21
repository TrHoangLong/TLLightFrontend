import { Injectable } from '@angular/core';
import { SysRole } from '../../data/schema/sys/sys-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  ROLE_KEY = 'access';
  USERNAME = 'username';
  PASSWORD = 'password';

  TOKEN_KEY = 'log-in';
  IS_SAVE = 'is_save_login';
  BUSINESS_DATE = 'business_date';

  constructor() {
  }

  clearRole(): void {
    window.localStorage.removeItem(this.ROLE_KEY);
  }

  public saveRole(role: string): void {
    window.localStorage.removeItem(this.ROLE_KEY);
    window.localStorage.setItem(this.ROLE_KEY, role);
  }

  public isAccess(role: string): boolean {
    const data: SysRole[] = JSON.parse(window.localStorage.getItem(this.ROLE_KEY)!);
    if (data == null) {
      return false;
    }
    return data.map(item => item.roleCode.toLowerCase()).includes(role.toLowerCase());
  }

  public saveLogin(username: string, password: string): void {
    window.localStorage.removeItem(this.USERNAME);
    window.localStorage.removeItem(this.PASSWORD);
    window.localStorage.setItem(this.USERNAME, username);
    window.localStorage.setItem(this.PASSWORD, password);
  }

  public removeLogin(): void {
    window.localStorage.removeItem(this.USERNAME);
    window.localStorage.removeItem(this.PASSWORD);
  }

  public getLogin(): any {
    const username = window.localStorage.getItem(this.USERNAME);
    const password = window.localStorage.getItem(this.PASSWORD);
    return { username, password };
  }

  public setSaveLogin(value): void {
    window.localStorage.setItem(this.IS_SAVE, value);
  }
  public getSaveLogin(): string {
    return window.localStorage.getItem(this.IS_SAVE)!;
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(this.TOKEN_KEY);
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  public clearToken(): void {
    window.localStorage.removeItem(this.TOKEN_KEY);
  }

}
