import {computed, Injectable, signal} from "@angular/core";
import {of} from "rxjs";
const TOKEN = "token";

@Injectable({providedIn: "root"})
export class AuthStore {
    token = signal<string | null>(this.getToken());

    isLoggedIn = computed(() => !!this.token());

    public getToken(): string | null {
        return localStorage.getItem(TOKEN);
    }

    storeToken(token: string): void {
        localStorage.setItem(TOKEN, token);
        this.token.set(token);
    }

    logout() {
        localStorage.removeItem(TOKEN);
        this.token.set(null);

        return of(true);
    }
}
