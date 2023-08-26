import { PayrollServiceService } from './../service/PayrollService.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform!: FormGroup
  Succeed = false;
  Failed = false;

  constructor(
    private srservice: PayrollServiceService,
    private router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerform = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      type: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  register() {
    this.srservice.signUp(this.registerform.value.name, this.registerform.value.email, this.registerform.value.type, this.registerform.value.username, this.registerform.value.password)
      .subscribe(
        data => {
          console.log(data);
          this.registerform.reset();
          this.Succeed = true;
          this.Failed = false;
        },
        error => {
          console.log(error);
          this.Failed = true;

        }

      );
  }
}
