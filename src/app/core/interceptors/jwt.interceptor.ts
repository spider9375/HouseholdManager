import {catchError, Observable, of, throwError} from "rxjs";
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHandlerFn,
    HttpInterceptor,
    HttpInterceptorFn,
    HttpRequest
} from "@angular/common/http";
import {EnvironmentInjector, inject, Injectable, runInInjectionContext} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AuthStore} from "../stores/auth.store";

const handleError = (err: HttpErrorResponse): Observable<any> => {
    if (err.status === 401 || err.status === 403) {
        inject(Router).navigate(["auth"]);

        return of(err.message);
    }
    return throwError(() => err);
}

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const injector = inject(EnvironmentInjector);
    let token = inject(AuthStore).token();
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req).pipe(catchError(err => runInInjectionContext(injector, () => handleError(err))));
}
