'use client';

import type { InputMask } from '@/utils';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface Props<TFormValues extends Record<string, any> = any> {
	label?: string;
	name: Path<TFormValues>;
	register?: UseFormRegister<TFormValues>;
	setValue?: UseFormSetValue<TFormValues>;
	required?: boolean;
	error?: string | null;
	type?: 'text' | 'number' | 'email' | 'password' | 'file';
	placeholder?: string;
	className?: string;
	// Máscara personalizada
	mask?: InputMask;
	defaultValue?: string | number;
}

export const Input = (props: Props) => {
	const {
		label,
		name,
		register,
		setValue,
		required,
		error,
		type = 'text',
		placeholder,
		className,
		mask,
		defaultValue,
	} = props;

	const [displayValue, setDisplayValue] = useState('');
	const hasMask = !!mask;

	// Inicializar el valor de display si hay defaultValue
	useEffect(() => {
		if (defaultValue && mask) {
			const formatted = mask.format(String(defaultValue));
			setDisplayValue(formatted);
		}
	}, [defaultValue, mask]);

	const handleMaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!mask) return;

		const inputValue = e.target.value;

		// Eliminar sufijos/prefijos si existen
		let cleanValue = inputValue;
		if (mask.suffix) {
			cleanValue = cleanValue.replace(new RegExp(`\\s*${mask.suffix}\\s*$`), '');
		}
		if (mask.prefix) {
			cleanValue = cleanValue.replace(new RegExp(`^\\s*${mask.prefix}\\s*`), '');
		}

		// Formatear el valor
		const formatted = mask.format(cleanValue);
		setDisplayValue(formatted);

		// Guardar el valor sin formato en el formulario
		const rawValue = mask.unformat(cleanValue);
		if (setValue && register) {
			setValue(name, rawValue as any, { shouldValidate: true });
		}
	};

	const handleMaskBlur = () => {
		if (!mask || !displayValue) return;

		// Agregar sufijo/prefijo al perder el foco
		let finalValue = displayValue;
		if (mask.prefix && !displayValue.startsWith(mask.prefix)) {
			finalValue = `${mask.prefix} ${finalValue}`;
		}
		if (mask.suffix && !displayValue.endsWith(mask.suffix)) {
			finalValue = `${finalValue} ${mask.suffix}`;
		}
		setDisplayValue(finalValue);
	};

	const handleMaskFocus = () => {
		if (!mask || !displayValue) return;

		// Remover sufijos/prefijos al enfocar para facilitar la edición
		let cleanValue = displayValue;
		if (mask.suffix) {
			cleanValue = cleanValue.replace(new RegExp(`\\s*${mask.suffix}\\s*$`), '');
		}
		if (mask.prefix) {
			cleanValue = cleanValue.replace(new RegExp(`^\\s*${mask.prefix}\\s*`), '');
		}
		setDisplayValue(cleanValue);
	};

	// Si tiene máscara, renderizar con el comportamiento de máscara
	if (hasMask && mask) {
		return (
			<div className={clsx('flex flex-col mb-2', className)}>
				{label && <span className="mb-1 text-sm">{label}</span>}
				<input
					type="text"
					className={clsx(
						'p-2 border rounded-md bg-gray-200',
						error ? 'border-red-500' : 'border-gray-300'
					)}
					placeholder={placeholder || mask.placeholder}
					value={displayValue}
					onChange={handleMaskChange}
					onBlur={handleMaskBlur}
					onFocus={handleMaskFocus}
				/>
				{/* Input oculto para react-hook-form */}
				{register && <input type="hidden" {...register(name, { required })} />}
				{error && <p className="text-xs text-red-600 mt-1">{error}</p>}
			</div>
		);
	}

	// Renderizado normal sin máscara
	return (
		<div className={clsx('flex flex-col mb-2', className)}>
			{label && <span className="mb-1 text-sm">{label}</span>}
			<input
				type={type}
				className={clsx(
					'p-2 border rounded-md bg-gray-200',
					error ? 'border-red-500' : 'border-gray-300'
				)}
				placeholder={placeholder}
				{...(register ? register(name, { required }) : {})}
			/>
			{error && <p className="text-xs text-red-600 mt-1">{error}</p>}
		</div>
	);
};
