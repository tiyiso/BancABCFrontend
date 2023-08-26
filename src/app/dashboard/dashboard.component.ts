import { PayrollServiceService } from './../service/PayrollService.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  info: any
  user: any;


  constructor(
    private srservice: PayrollServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // chech details for logged user
    this.info = {
      token: this.srservice.getToken(),
      username: this.srservice.getUsername(),
      name: this.srservice.getName(),

    };
    // fetch user
    this.srservice.getUserProfile(this.info.username).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);

    })
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

}
