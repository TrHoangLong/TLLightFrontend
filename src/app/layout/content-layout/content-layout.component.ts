import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/share/service/role.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css'],
})
export class ContentLayoutComponent implements OnInit {
 
  constructor(private router: Router,
    private http: HttpClient,
    private roleService: RoleService,
    private authService: AuthService) { }

  selectedMenu: string;
  sideNavOpen = true;
  hasBackdrop = false;

  ngOnInit(): void {
  }

  onClick(key: string): void {
    this.selectedMenu = key;
    if (this.selectedMenu === key) {
      this.router.navigate(['/dashboard/' + key]);
    } else {
    }
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
    this.router.navigate(['/dashboard/' + key]);
  }
}
