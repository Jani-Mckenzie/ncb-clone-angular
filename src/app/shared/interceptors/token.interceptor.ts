import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authService.getToken();
    if(token && this.authService.isLoggedin()){
      const clonedRequest = req.clone({headers : req.headers.set('Authorization', 'Bearer ' + token)});
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}
