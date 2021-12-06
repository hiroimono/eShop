import { Component, OnInit } from '@angular/core';

/** RxJs */
import { Subscription, BehaviorSubject, tap, combineLatest, switchMap } from 'rxjs';

/** Services */
import { MockItemsService } from 'src/app/services/mock-items.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public items: Item[] = [];
	private subs: Subscription = new Subscription;

	/** Paging */
	public pageNumber: number = 0;
	public pageNumberArr: any[] = [];

	public pageSelected: number = 1;
	public pageSelected$ = new BehaviorSubject<number>(1);

	public pageSize: number = 0;
	public pageSize$ = new BehaviorSubject<number>(6);

	public total: number = 0;
	public total$ = new BehaviorSubject<number>(0);

	constructor(
		private _items: MockItemsService,
		public _store: StoreService
	) { }

	ngOnInit(): void {
		this.getItems();
		this.getPaging();
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	private getItems() {
		this.subs = combineLatest([this.pageSelected$, this.pageSize$])
			.pipe(
				tap(([page, pageSize]) => {
					this.pageSelected = page;
					this.pageSize = pageSize;
				}),
				switchMap(
					([page, pageSize]) => this._items
						.getItems(page, pageSize)
						.pipe(
							tap(payload => {
								this.items = this._store.items = payload.items
								this.total = this._store.total = payload.count
								this.pageNumber = Math.ceil(this.total / this.pageSize)
								this.pageNumberArr = Array(this.pageNumber);
							})
						)
				)
			)
			.subscribe()
	}

	private getPaging() {
		this.subs
			.add(
				this._store
					.getTotal()
					.subscribe(
						total => this.total$.next(total)
					)
			);

		this.subs
			.add(
				this._store
					.getPage()
					.subscribe(
						page => this.pageSelected$.next(page)
					)
			);

		this.subs
			.add(
				this._store
					.getPageSize()
					.subscribe(
						pageSize => this.pageSize$.next(pageSize)
					)
			);
	}

	public onPageChange(newPage: number): void {
		this._store.pageSelected = newPage;
	}

	public onPageSizeChange(): void {
		this._store.pageSize = this.pageSize;
	}

	public onPageSelected(num: number): void {
		this._store.pageSelected = num;
	}

	public previous(): void {
		this.pageSelected !== 1 ? this.pageSelected = this.pageSelected - 1 : null
		this._store.pageSelected = this.pageSelected;
	}

	public next(): void {
		this.pageSelected !== this.pageNumberArr?.length ? this.pageSelected = this.pageSelected + 1 : null
		this._store.pageSelected = this.pageSelected;
	}
}
