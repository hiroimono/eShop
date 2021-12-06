import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class StoreService {

	private readonly _items = new BehaviorSubject<Item[]>([])
	private readonly items$ = this._items.asObservable();

	private readonly _total = new BehaviorSubject<number>(0)
	private readonly total$ = this._total.asObservable();

	private readonly _pageSelected = new BehaviorSubject<number>(1)
	private readonly pageSelected$ = this._pageSelected.asObservable();

	private readonly _pageSize = new BehaviorSubject<number>(6)
	private readonly pageSize$ = this._pageSize.asObservable();

	constructor() { }

	public set items(newItems: Item[]) {
		this._items.next(newItems)
	}

	public get items(): Item[] {
		return this._items.getValue()
	}

	public set total(num: number) {
		this._total.next(num)
	}

	public get total(): number {
		return this._total.getValue()
	}

	public getTotal(): Observable<number> {
		return this.total$
	}

	public set pageSelected(newpage: number) {
		this._pageSelected.next(newpage)
	}

	public get pageSelected(): number {
		return this._pageSelected.getValue()
	}

	public getPage(): Observable<number> {
		return this.pageSelected$;
	}

	public set pageSize(newPageSize: number) {
		this._pageSize.next(newPageSize)
	}

	public get pageSize(): number {
		return this._pageSize.getValue()
	}

	public getPageSize(): Observable<number> {
		return this.pageSize$;
	}
}
