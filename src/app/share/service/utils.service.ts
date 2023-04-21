import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { SnackBarMessagesComponent } from '../snack-bar-messages/snack-bar-messages.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RoleService} from '../service/role.service';
import { AuthService } from 'src/app/core/service/auth.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private roleService: RoleService,
    private authService: AuthService) { }

    public processResponseError(response: any, message: string): void {
      if (response.errorCode && typeof response.errorCode == 'string' && response.errorCode.indexOf('ErrToken') !== -1) {
          this.snackBar.openFromComponent(SnackBarMessagesComponent, {
              duration: 5 * 1000,
              data: 'Session is expired!',
              panelClass: ['redSnackbar']
          });
          const token: string = this.roleService.getToken();
          const isSave = this.roleService.getSaveLogin();
          if (isSave === 'false') {
              this.roleService.removeLogin();
          }
          this.authService.logout(token).subscribe(data => {
              this.roleService.clearToken();
              this.roleService.clearRole();
              this.router.navigate(['/auth/login']);
          });
      } else if (response && response.errorCode == null && response.resultCode != -1) {
          this.snackBar.openFromComponent(SnackBarMessagesComponent, {
              duration: 5 * 1000,
              data: message,
              panelClass: ['greenSnackbar']
          });
      } else {
          this.snackBar.openFromComponent(SnackBarMessagesComponent, {
              duration: 5 * 1000,
              data: message,
              panelClass: ['redSnackbar']
          });
      }
  }
}
