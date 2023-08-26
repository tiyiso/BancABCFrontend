import { PayrollServiceService } from './../service/PayrollService.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup

  constructor(
    private srservice: PayrollServiceService,
    private router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  login() {
    this.srservice.signIn(this.loginform.value.username, this.loginform.value.password)
      .subscribe(
        data => {
          console.log(data.username);
          localStorage.setItem('access_token', data.accessToken)
          localStorage.setItem('access_username', data.username)

          this.router.navigate(['home']);
        },
        error => {
          console.log(error);

        }

      );

  }

}
