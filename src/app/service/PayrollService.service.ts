import { User } from './../user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class PayrollServiceService {
  private signinUrl = environment.baseurl + '/auth/signin';
  private signupUrl = environment.baseurl + '/auth/signup';
  private userUrl = environment.baseurl + '/user';
  private uploadSUrl = environment.baseurl + '/individualSalary';
  private updateStatusUrl = environment.baseurl;// + '/updateStatus'
  private allSUrl = environment.baseurl + '/allsalaries';
  private pSUrl = environment.baseurl + '/status/PENDING';
  private pSUrl1 = environment.baseurl + '/approuploadfiles';


  headers = new HttpHeaders().set('Content-Type', 'application/json');
  httpOptions = {
    headers: new HttpHeaders({
      Accept: '*/*',
      // 'Content-Type': 'application/json',
      'Content-Type': 'application/json-patch+json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      // 'Access-Control-Allow-Origin': '*'
    })
  };

  httpPutOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json-patch+json', 'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // Sign-in
  signIn(username: string, password: string) {
    return this.http.post<any>(this.signinUrl, { username, password })

  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getUsername() {
    return localStorage.getItem('access_username');
  }

  getName() {
    return localStorage.getItem('access_name')
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  //register
  signUp(name: string, email: string, type: string, username: string, password: string) {
    return this.http.post<any>(this.signupUrl, { name, email, type, username, password })

  }

  //register accounts
  UploadS(employeeName: string, debitaccount: string, beneficiaryaccount: string, amount: Number, status: string, user: User) {
    return this.http.post<any>(this.uploadSUrl, { employeeName, debitaccount, beneficiaryaccount, amount, status, user }, this.httpOptions)

  }

  //updateStatus for Salaries
  updateStatus(id: any, employeeName: string, debitaccount: string, beneficiaryaccount: string, amount: Number, status: string, user: User) {
    return this.http.put<any>(this.updateStatusUrl + '/' + id, { employeeName, debitaccount, beneficiaryaccount, amount, status, user }, this.httpOptions)
  }

  approveData(formData: any, endPoint: any) {
    return this.http.put<any>(this.updateStatusUrl + endPoint, formData, this.httpPutOptions);
  }

  // User profile
  getUserProfile(username: any): Observable<any> {
    let api = `${this.userUrl}/${username}`;
    return this.http.get(api, this.httpOptions).pipe(
      map((res) => {
        return res || {}
      }),
    )
  }
  // approve

  // approve(id: any) {
  //   return this.http.put<any>(this.allSUrl + '/' + id,)
  // }
  // list all salaries
  listsallaries(): Observable<any> {
    return this.http.get(this.allSUrl, this.httpOptions).pipe(
      map((response: any) => {
        return response || {}
      }),
    )
  }
  fileUploads() {
    return this.http.post<any>(this.pSUrl1, this.httpOptions)
  }
  // list all salaries
  listpsalaries(): Observable<any> {
    return this.http.get(this.pSUrl, this.httpOptions).pipe(
      map((response: any) => {
        return response || {}
      }),
    )
  }
}
