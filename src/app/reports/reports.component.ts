import { PayrollServiceService } from './../service/PayrollService.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  salary: any;

  constructor(
    private srservice: PayrollServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // fetch
    this.srservice.listsallaries().subscribe((response: any) => {
      this.salary = response;
      console.log(this.salary);

    })
  }


}
