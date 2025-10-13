'use client';

import Link from 'next/link';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

import { titleFonts } from '@/config/fonts';
import { useUiStore } from '@/store';

export const TopMenu = () => {
	const openMenu = useUiStore((store) => store.openSideMenu);

	return (
		<nav className="flex px-5 justify-between items-center w-full">
			{/* Logo */}
			<div>
				<Link href={'/'}>
					<span className={`${titleFonts.className} antialiased font-bold`}>Abibas</span>
					<span> | Tienda virtual</span>
				</Link>
			</div>

			{/* Center Menu */}
			<div className={`font-semibold`}>
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href={'/category/men'}>
					Hombres
				</Link>
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href={'/category/women'}>
					Mujeres
				</Link>
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href={'/category/kid'}>
					Niños
				</Link>
			</div>

			{/* Search, Cart, Menu */}
			<div className="flex items-center">
				<Link className="mx-2" href={'/search'}>
					<IoSearchOutline className="size-5" />
				</Link>

				<Link className="mx-2" href={'/cart'}>
					<div className="relative">
						<span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white ">
							3
						</span>
						<IoCartOutline className="size-5" />
					</div>
				</Link>

				<button
					className="m-2 rounded-md transition-all hover:bg-gray-100"
					onClick={() => openMenu()}>
					Menu
				</button>
			</div>
		</nav>
	);
};
