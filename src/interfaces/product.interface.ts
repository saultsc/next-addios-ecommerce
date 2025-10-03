export interface Product {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	imageUrl: imageUrl[];
}

export interface imageUrl {
	id: string;
	url: string;
}
