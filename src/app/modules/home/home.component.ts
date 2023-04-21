import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/share/service/role.service';
import { AuthService } from 'src/app/core/service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, 
    private http: HttpClient,
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
}
