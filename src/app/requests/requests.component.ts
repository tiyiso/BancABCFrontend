import { PayrollServiceService } from './../service/PayrollService.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  psalary: any;
  info: any;
  upload!: FormGroup;
  Succeed = false;
  Failed = false;
  User: any;
  id = localStorage.getItem('id');


  constructor(
    private srservice: PayrollServiceService,
    private router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // fetch
    this.srservice.listpsalaries().subscribe((response: any) => {
      this.psalary = response;
      console.log(this.psalary);

    })
    this.upload = this.fb.group({
      id: [localStorage.getItem('id')],
      status: ['', Validators.required],
    });

  }
  navigate() {

  }

  Rsalary() {
    // this.srservice.updateStatus(this.upload.value.id, this.upload.value.employeeName, this.upload.value.debitaccount,
    //   this.upload.value.beneficiaryaccount, this.upload.value.amount, this.upload.value.status, this.psalary)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       this.upload.reset();
    //       this.Succeed = true;
    //       this.Failed = false;
    //     },
    //     error => {
    //       console.log(error);
    //       this.Failed = true;

    //     }

    //   );

    // this.srservice.approve()
  }

  user(employeeName: any, debitaccount: any, beneficiaryaccount: any, amount: any, status: any, user: any) {
    throw new Error('Method not implemented.');
  }

  //check approval
  approveSalary(obj: any) {
    const endpoint = '/approveSalary/' + obj.id;
    //obj.approvalStatus = approvalStatus;
    console.log('before : ', obj);
    let result = confirm('Are you sure you want to approve this item?');
    if (result) {
      // this.srservice.updateStatus(this.upload.value.id, this.upload.value.employeeName, this.upload.value.debitaccount,
      //   this.upload.value.beneficiaryaccount, this.upload.value.amount, this.upload.value.status, this.psalary)
      //   .subscribe(
      //     data => {
      //       console.log(data);
      //       this.upload.reset();
      //       this.Succeed = true;
      //       this.Failed = false;
      //     },
      //     error => {
      //       console.log(error);
      //       this.Failed = true;

      //     }

      //   );

      this.srservice.approveData(obj, endpoint).subscribe(
        (res: any) => {
          console.log('results are : ', res);

          console.log('after', obj);
          this.upload.reset();
          this.Succeed = true;
          this.Failed = false;
          //  this.toastr.success('Task Status' + ' Updated  Successfully!', 'Done.');
          // this.getShiftData(this.selectedShift);
        },
        (err) => {
          if (err.status === 400) {
            console.log('after 400: ', err);

          } else {
            console.log('after chimwewo: ', err);
          }
          console.log('error redu : ', err.status);

        }
      );
    } else {
      // this.toastr.info('Action Cancelled');
      console.log('Action Cancelled');

    }
  }
}
