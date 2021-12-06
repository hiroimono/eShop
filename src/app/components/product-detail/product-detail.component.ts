import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/** RxJs */
import { Subscription } from 'rxjs';

/** Services */
import { MockItemsService } from 'src/app/services/mock-items.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
	public item!: Item;
	private subs: Subscription = new Subscription();

	constructor(
		private _route: ActivatedRoute,
		private _store: StoreService
	) { }

	ngOnInit(): void {
		this.getItem();
	}

	private getItem() {
		const id = Number(this._route.snapshot.paramMap.get('id'));
		this.item = this._store.items.filter(item => item.id === id)[0];
	}

	public addToCart(): void { }
}
