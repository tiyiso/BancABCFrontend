import { PayrollServiceService } from './service/PayrollService.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private srservice: PayrollServiceService,) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.srservice.getToken();

    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    });
    return next.handle(req);
  }
}
