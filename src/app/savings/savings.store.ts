import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {ISaving} from "./models";
import {SavingsService} from "./savings.service";
import {map, Subject, switchMap, tap} from "rxjs";
import {AuthStore} from "../core/stores/auth.store";

@Injectable({providedIn: "root"})
export class SavingsStore {
    private _authStore = inject(AuthStore);
    private service = inject(SavingsService)
    private _savings = signal<ISaving[]>([])

    savings = computed(() => this._savings());

    hideAmounts = signal<boolean>(false);

    fetch$ = this.service.getAll();
    create$ = new Subject<ISaving>()
    update$ = new Subject<ISaving>()
    delete$ = new Subject<number>();
    toggleHideAmounts$ = new Subject<void>();

    constructor() {
        effect(() => {
            if (this._authStore.isLoggedIn()) {
                this.fetch$.subscribe(res => this._savings.set(res));
                this.create$.pipe(
                    switchMap(payload => this.service.create(payload)),
                    tap(res => this._savings.update(prev => [...prev, res]))
                ).subscribe();

                this.update$.pipe(
                    switchMap(payload => this.service.update(payload)),
                    tap(res => this._savings.update(prev => prev.map(s => s.id === res.id ? res : s)))
                ).subscribe();

                this.delete$.pipe(
                    switchMap(id => this.service.delete(id).pipe(map(() => id))),
                    tap((id) => this._savings.update(prev => prev.filter(s => s.id !== id)))
                ).subscribe()

                this.toggleHideAmounts$.pipe(
                    tap(() => this.hideAmounts.update(prev => !prev))
                ).subscribe()
            }
        });
    }
}
