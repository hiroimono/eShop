import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/** Services */
import { StoreService } from 'src/app/services/store.service';

const mock_items = [
	{ id: 1, name: 'Adidas Stan Smith', price: 90.0, category: 'Shoes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 2, name: 'Nike Air Max', price: 110.0, category: 'Shoes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 3, name: 'Reebok Sweat Shirt', price: 45.0, category: 'Clothes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 4, name: 'Puma T-Shirt', price: 30.0, category: 'Clothes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 5, name: 'Adidas Stan Smith', price: 90.0, category: 'Shoes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 6, name: 'Nike Air Max', price: 110.0, category: 'Shoes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 7, name: 'Reebok Sweat Shirt', price: 45.0, category: 'Clothes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 8, name: 'Puma T-Shirt', price: 30.0, category: 'Clothes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 9, name: 'Adidas Stan Smith', price: 90.0, category: 'Shoes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 10, name: 'Nike Air Max', price: 110.0, category: 'Shoes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 11, name: 'Reebok Sweat Shirt', price: 45.0, category: 'Clothes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 12, name: 'Puma T-Shirt', price: 30.0, category: 'Clothes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 13, name: 'Adidas Stan Smith', price: 90.0, category: 'Shoes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 14, name: 'Nike Air Max', price: 110.0, category: 'Shoes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 15, name: 'Reebok Sweat Shirt', price: 45.0, category: 'Clothes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
	{ id: 16, name: 'Puma T-Shirt', price: 30.0, category: 'Clothes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Age, inquies, ista parva sunt. Aliter enim explicari, quod quaeritur, non potest. Quam ob rem tandem, inquit, non satisfacit? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. Non est igitur summum malum dolor.' },
];

@Injectable({
	providedIn: 'root'
})
export class MockItemsService {
	constructor(
		private _store: StoreService,
	) {
		this._store.total = mock_items.length
	}

	getItems(page: number, pageSize: number): Observable<ItemPayload> {
		let payload: ItemPayload = {
			items: mock_items.slice((page - 1) * pageSize, page * pageSize),
			count: mock_items.length
		}

		return of(payload);
	}

	getItem(id: number): Observable<Item> {
		return of(mock_items.filter(item => item.id === id)[0]);
	}
}
