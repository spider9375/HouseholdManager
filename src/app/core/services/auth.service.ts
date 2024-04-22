import {computed, inject, Injectable, signal} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {AuthStore} from "../stores/auth.store";


@Injectable({
    providedIn: "root"
})
export class AuthService {
    http = inject(HttpClient);
    store = inject(AuthStore);
    private url = `${environment.serverUrl}/api/auth`

    login(payload: { username: string, password: string }) {
        return this.http.post(`${this.url}/login`, payload, {responseType: "text"}).pipe(tap((token: string) => {
            this.store.storeToken(token);
        }));
    }

    register(payload: { username: string, password: string, email: string }) {
        return this.http.post(`${this.url}/register`, payload, {responseType: "text"}).pipe(tap((token: string) => {
            this.store.storeToken(token);
        }))
    }

    logout(): Observable<any> {
        return this.store.logout();
    }
}
