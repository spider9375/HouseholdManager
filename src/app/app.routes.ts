import {Routes} from '@angular/router';
import {AuthComponent} from "./core/components/auth/auth.component";
import {loggedInGuardFn} from "./core/guards/logged-in.guard";
import {LayoutComponent} from "./core/components/layout/layout.component";

export const routes: Routes = [
    {
        path: "dashboard",
        component: LayoutComponent,
        loadChildren: () => import("./dashboard/dashboard.routes").then(x => x.routes),
        canActivate: [loggedInGuardFn]
    },
    {
        path: "expenses",
        component: LayoutComponent,
        loadChildren: () => import("./expenses/expenses.routes").then(x => x.routes),
        canActivate: [loggedInGuardFn]
    },
    {
        path: "savings",
        component: LayoutComponent,
        loadChildren: () => import("./savings/savings.routes").then(x => x.routes),
        canActivate: [loggedInGuardFn]
    },
    {
        path: "items",
        component: LayoutComponent,
        loadChildren: () => import("./items/items.routes").then(x => x.routes),
        canActivate: [loggedInGuardFn]
    },
    {
        path: "tags",
        loadChildren: () => import("./tags/tags.routes").then(x => x.routes),
        component: LayoutComponent,
        canActivate: [loggedInGuardFn]
    },
    {
        path: "auth",
        component: AuthComponent,
    },
    {path: "", pathMatch: "full", redirectTo: "items"},

];
