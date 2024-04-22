import {Component, inject} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {CommonModule, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ThemeService} from "../../theme/theme.service";
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import {AuthStore} from "../../stores/auth.store";

@Component({
  selector: 'app-desktop-layout',
  standalone: true,
    imports: [
        CommonModule,
        MatAnchor,
        MatButton,
        MatIcon,
        MatMenu,
        MatMenuItem,
        NgIf,
        RouterOutlet,
        RouterLinkActive,
        RouterLink,
        MatMenuTrigger
    ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    open = false
    title = 'homeStock';

    links = [
        {
            label: "Dashboard",
            icon: "dashboard",
            route: "/dashboard"
        },
        {
            label: "Expenses",
            icon: "payments",
            route: "/expenses"
        },
        {
            label: "Savings",
            icon: "savings",
            route: "/savings"
        },
        {
            label: "Items",
            icon: "inventory_2",
            route: "/items"
        },
        {
            label: "Tags",
            icon: "sell",
            route: "/tags"
        },
    ]

    themeService = inject(ThemeService);
    authService = inject(AuthService);
    authStore = inject(AuthStore);
    router = inject(Router);

    logout() {
        this.authService.logout().pipe(take(1)).subscribe(() => this.router.navigate(["auth"]));
    }
}
