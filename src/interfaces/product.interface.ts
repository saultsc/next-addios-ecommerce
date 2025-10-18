export interface Product {
	id: string;
	description: string;
	productImage: ProductImage[];
	inStock: number;
	price: number;
	sizes: Size[];
	slug: string;
	tags: string[];
	title: string;
	type: Type;
	gender: Category;
}

interface ProductImage {
	url: string;
}

export type Category = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';
