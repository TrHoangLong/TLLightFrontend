import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { RoleService } from 'src/app/share/service/role.service';
import { SysService } from 'src/app/core/service/sys.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/share/service/utils.service';
import { LINK_IMAGE } from 'src/app/core/constants/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNav: EventEmitter<any> = new EventEmitter();

  sideNavClosed = true;

  linkImage: string;

  constructor(private router: Router,
    private roleService: RoleService,
    private authService: AuthService,
    private sysService: SysService,
    private utilsService: UtilsService) {
      this.linkImage = LINK_IMAGE;
     }

  ngOnInit(): void {
  }

  logout() {
    const token: string = this.roleService.getToken();
    this.authService.logout(token).subscribe(response => {
      this.roleService.clearToken();
      this.roleService.clearRole();
      this.router.navigate(['/auth/login']);
    });
  }

  routerMenu(key: string){
    this.sideNav.emit(key);
  }

  closeDate() {
    this.sysService.closeDateSystem().subscribe(response => {
      if (response.resultCode == 0) {
        this.router.navigate(['/dashboard/home']);
        this.utilsService.processResponseError(response, 'Đóng ngày thành công');
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }
}
