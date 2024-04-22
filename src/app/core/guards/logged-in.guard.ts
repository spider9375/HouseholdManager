import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {AuthStore} from "../stores/auth.store";

export const loggedInGuardFn: CanActivateFn = () => {
    if (inject(AuthStore).isLoggedIn()) {
        return true;
    }


    return inject(Router).navigate(["auth"]);
}
