// utils.js

// Check if the input is a non-empty array
export const isNotEmptyArray = (value) =>
	Array.isArray(value) && value.length > 0

// Check if the input is a non-empty object (not null and has at least one key)
export const isNotEmptyObject = (value) =>
	value &&
	typeof value === 'object' &&
	!Array.isArray(value) &&
	Object.keys(value).length > 0

// Check if the input is a string
export const isString = (value) => typeof value === 'string'

// Check if the input is a number
export const isNumber = (value) => typeof value === 'number' && !isNaN(value)

// Check if the input is a function
export const isFunction = (value) => typeof value === 'function'

// Check if the input is a boolean
export const isBoolean = (value) => typeof value === 'boolean'

// Check if the input is null or undefined
export const isNil = (value) => value === null || value === undefined

// Check if the input is a valid date object
export const isDate = (value) => value instanceof Date && !isNaN(value)

// Check if the input is an integer
export const isInteger = (value) => Number.isInteger(value)

// Check if the input is a valid email
export const isEmail = (value) =>
	typeof value === 'string' &&
	/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)

// Check if the input is a valid URL
export const isURL = (value) =>
	typeof value === 'string' &&
	/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)

// Check if the input is a valid JSON string
export const isValidJSON = (value) => {
	try {
		JSON.parse(value)
		return true
	} catch (e) {
		// eslint-disable-next-line no-console
console.log('errors--->', e);
		return false
	}
}

// Check if the input is a valid IPv4 address
export const isIPv4 = (value) =>
	typeof value === 'string' &&
	/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
		value
	)

// Check if the input is a valid phone number (basic validation for various formats)
export const isPhoneNumber = (value) =>
	typeof value === 'string' &&
	/^[+]?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})$/.test(
		value
	)

// Check if the input is a valid credit card number (using a basic Luhn algorithm)
export const isCreditCard = (value) => {
	if (typeof value !== 'string') return false
	const regex = new RegExp(
		/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|35[2-8][0-9]{12}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13})$/
	)
	if (!regex.test(value)) return false
	let sum = 0,
		shouldDouble = false
	for (let i = value.length - 1; i >= 0; i--) {
		const digit = parseInt(value.charAt(i), 10)
		if (shouldDouble) {
			if ((sum += digit * 2) > 9) sum -= 9
		} else {
			sum += digit
		}
		shouldDouble = !shouldDouble
	}
	return sum % 10 === 0
}

// Check if the input is a valid hexadecimal color code
export const isHexColor = (value) =>
	typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value)

// Check if the input is a valid HTML element (DOM node)
export const isHTMLElement = (value) => value instanceof HTMLElement

// Check if the input is an array of objects (array containing only objects)
export const isArrayOfObjects = (value) =>
	Array.isArray(value) &&
	value.every(
		(item) => item && typeof item === 'object' && !Array.isArray(item)
	)

// Check if the input is a positive integer
export const isPositiveInteger = (value) => Number.isInteger(value) && value > 0

// Check if the input is a negative integer
export const isNegativeInteger = (value) => Number.isInteger(value) && value < 0

// Check if the input is a non-empty string
export const isNotEmptyString = (value) =>
	isString(value) && value.trim().length > 0

// Check if the input is an object with only string keys (not an array)
export const isObjectWithStringKeys = (value) =>
	value &&
	typeof value === 'object' &&
	!Array.isArray(value) &&
	Object.keys(value).every((key) => typeof key === 'string')

// Check if the input is a symbol (ES6 symbol type)
export const isSymbol = (value) => typeof value === 'symbol'

export const deepCopy = (value) => JSON.parse(JSON.stringify(value))

export const onlyParsInt = (value) => {
	const phoneRegex = /^[0-9]*$/
	// Only allow numbers in the phone field
	if (!phoneRegex.test(value)) {
		value = value.replace(/[^0-9]/g, '') // Remove any non-numeric character
	}
	return value
}

export const checkFileType = (url) => {
	// Regular expressions to check for image and PDF file extensions
	const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i
	const pdfExtension = /\.pdf$/i

	// Extract the file name from the URL
	if (isString(url)) {
		const fileName = url.substring(url.lastIndexOf('/') + 1).split('?')[0]

		// Check if the file is a PDF
		if (pdfExtension.test(fileName)) {
			return 'pdf'
		}

		// Check if the file is an image
		if (imageExtensions.test(fileName)) {
			return 'image'
		}
	}

	// If neither PDF nor image, consider it normal text
	return 'text'
}


export const isFloat = (num) => {
	return num !== Math.floor(num);
  }

  // Build options for multiple-dropdown fields
export const buildDropdownOptions = (options) =>
	options?.map((opt) => ({ label: opt, value: opt })) || []