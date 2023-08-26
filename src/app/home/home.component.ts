import { PayrollServiceService } from './../service/PayrollService.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  upload!: FormGroup
  Succeed = false;
  Failed = false;
  user: any;
  fileToUpload: any;
  info: any;


  constructor(
    private srservice: PayrollServiceService,
    private router: Router,
    public fb: FormBuilder,
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

    this.upload = this.fb.group({
      employeeName: ['', Validators.required],
      debitaccount: ['', Validators.required],
      beneficiaryaccount: ['', Validators.required],
      amount: ['', Validators.required],
      status: ['PENDING', Validators.required],
    });
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.item(0);
  }
  fileupload() {
    this.srservice.fileUploads()
  }

  Rsalary() {
    this.srservice.UploadS(this.upload.value.employeeName, this.upload.value.debitaccount,
      this.upload.value.beneficiaryaccount, this.upload.value.amount, this.upload.value.status, this.user)
      .subscribe(
        data => {
          console.log(data);
          this.upload.reset();
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


