import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { RoleService } from 'src/app/share/service/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNav: EventEmitter<any> = new EventEmitter();

  sideNavClosed = true;

  constructor(private router: Router,
    private roleService: RoleService,
    private authService: AuthService) { }

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
}
