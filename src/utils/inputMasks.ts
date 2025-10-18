export interface InputMask {
	format: (value: string) => string;
	unformat: (value: string) => string;
	suffix?: string;
	prefix?: string;
	placeholder?: string;
}

export const currencyMask = (currency: string = 'DOP', decimals: number = 2): InputMask => ({
	format: (value: string) => {
		const cleaned = value.replace(/[^\d.]/g, '');

		const parts = cleaned.split('.');
		if (parts.length > 2) {
			return parts[0] + '.' + parts.slice(1).join('');
		}

		if (!cleaned) return '';

		const [integerPart, decimalPart] = cleaned.split('.');

		const formattedInteger = parseInt(integerPart || '0').toLocaleString('en-US');

		if (decimalPart !== undefined) {
			const limitedDecimals = decimalPart.slice(0, decimals);
			return `${formattedInteger}.${limitedDecimals}`;
		}

		if (cleaned.endsWith('.')) {
			return `${formattedInteger}.`;
		}

		return formattedInteger;
	},
	unformat: (value: string) => {
		return value.replace(/[^\d.]/g, '');
	},
	suffix: currency,
	placeholder: '0.00',
});

// Máscara para teléfono local (809) 123-4567
export const phoneMask: InputMask = {
	format: (value: string) => {
		const num = value.replace(/\D/g, '');
		if (!num) return '';
		if (num.length <= 3) return `(${num}`;
		if (num.length <= 6) return `(${num.slice(0, 3)}) ${num.slice(3)}`;
		return `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6, 10)}`;
	},
	unformat: (value: string) => value.replace(/\D/g, ''),
	placeholder: '(809) 123-4567',
};

// Máscara para teléfono internacional +1 (809) 123-4567
export const phoneInternationalMask: InputMask = {
	format: (value: string) => {
		const num = value.replace(/\D/g, '');
		if (!num) return '';
		if (num.length <= 1) return `+${num}`;
		if (num.length <= 4) return `+${num.slice(0, 1)} (${num.slice(1)}`;
		if (num.length <= 7) return `+${num.slice(0, 1)} (${num.slice(1, 4)}) ${num.slice(4)}`;
		return `+${num.slice(0, 1)} (${num.slice(1, 4)}) ${num.slice(4, 7)}-${num.slice(7, 11)}`;
	},
	unformat: (value: string) => value.replace(/\D/g, ''),
	placeholder: '+1 (809) 123-4567',
};

// Máscara para porcentaje
export const percentageMask: InputMask = {
	format: (value: string) => {
		const num = value.replace(/[^\d.]/g, '');
		if (!num) return '';
		return num;
	},
	unformat: (value: string) => value.replace(/[^\d.]/g, ''),
	suffix: '%',
	placeholder: '0',
};

// Máscara para cédula dominicana 001-1234567-8
export const cedulaMask: InputMask = {
	format: (value: string) => {
		const num = value.replace(/\D/g, '');
		if (!num) return '';
		if (num.length <= 3) return num;
		if (num.length <= 10) return `${num.slice(0, 3)}-${num.slice(3)}`;
		return `${num.slice(0, 3)}-${num.slice(3, 10)}-${num.slice(10, 11)}`;
	},
	unformat: (value: string) => value.replace(/\D/g, ''),
	placeholder: '001-1234567-8',
};

// Máscara para RNC 1-23-45678-9
export const rncMask: InputMask = {
	format: (value: string) => {
		const num = value.replace(/\D/g, '');
		if (!num) return '';
		if (num.length <= 1) return num;
		if (num.length <= 3) return `${num.slice(0, 1)}-${num.slice(1)}`;
		if (num.length <= 8) return `${num.slice(0, 1)}-${num.slice(1, 3)}-${num.slice(3)}`;
		return `${num.slice(0, 1)}-${num.slice(1, 3)}-${num.slice(3, 8)}-${num.slice(8, 9)}`;
	},
	unformat: (value: string) => value.replace(/\D/g, ''),
	placeholder: '1-23-45678-9',
};

// Máscara para fecha DD/MM/YYYY
export const dateMask: InputMask = {
	format: (value: string) => {
		const num = value.replace(/\D/g, '');
		if (!num) return '';
		if (num.length <= 2) return num;
		if (num.length <= 4) return `${num.slice(0, 2)}/${num.slice(2)}`;
		return `${num.slice(0, 2)}/${num.slice(2, 4)}/${num.slice(4, 8)}`;
	},
	unformat: (value: string) => value.replace(/\D/g, ''),
	placeholder: 'DD/MM/YYYY',
};

// Máscara para tarjeta de crédito 1234 5678 9012 3456
export const creditCardMask: InputMask = {
	format: (value: string) => {
		const num = value.replace(/\D/g, '');
		if (!num) return '';
		const groups = num.match(/.{1,4}/g);
		return groups ? groups.join(' ') : num;
	},
	unformat: (value: string) => value.replace(/\D/g, ''),
	placeholder: '1234 5678 9012 3456',
};

// Máscara para código postal
export const zipCodeMask: InputMask = {
	format: (value: string) => {
		const num = value.replace(/\D/g, '');
		return num.slice(0, 5);
	},
	unformat: (value: string) => value.replace(/\D/g, ''),
	placeholder: '10000',
};
