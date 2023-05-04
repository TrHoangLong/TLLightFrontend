import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, finalize } from 'rxjs/operators';
import { AuthLoginInfo } from '../../../../data/schema/auth/login';
import { AuthService } from 'src/app/core/service/auth.service';
import { RoleService } from 'src/app/share/service/role.service';
import { SysService } from 'src/app/core/service/sys.service';
import { UtilsService } from 'src/app/share/service/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = '';
  isLoading = false;
  isLoggedIn = false;
  hide = true;

  username = '';
  password = '';
  private sub = new Subscription();


  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private roleService: RoleService,
    private sysService: SysService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    if (this.roleService.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard/home']);
    }else{
     
    }
    const info = this.roleService.getLogin();
    this.username = info.username;
    this.password = info.password;
  }

  login() {
    if (this.username === '' || this.password === '') {
      return;
    }
    const credentials: AuthLoginInfo = {
      username: this.username,
      password: this.password
    };
    
    this.sub = this.authService.attemptAuth(credentials).pipe()
      .subscribe(response => {
        if (response.resultCode == 0) {
          const token = response.data;
          const header = {
            'content-type': 'application/json',
            authorization: token
          };
          const httpOptions = {
            headers: new HttpHeaders(header)
          };

          this.roleService.saveToken(token);
          this.roleService.saveLogin(this.username, this.password);

          this.sysService.setHeader(httpOptions);

          this.router.navigate(['/dashboard/home']);

          this.utilsService.processResponseError(response, "Đăng nhập thành công");
        }
        else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + "Đăng nhập không thành công");
        }
      });
  }
}
