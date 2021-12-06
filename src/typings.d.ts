interface Item {
	id: number,
	name: string,
	price: number,
	category: string,
	description?: string
}

interface ItemPayload {
	items: Item[];
	count: number;
}
