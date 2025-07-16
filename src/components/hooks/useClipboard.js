import { useState } from 'react'
const useClipboard = () => {
	const [copiedText, setCopiedText] = useState(null)
	const copy = async (text) => {
		if (!navigator.clipboard) {
			// eslint-disable-next-line no-console
			console.warn('Clipboard not supported')
			return text
		}
		try {
			await navigator.clipboard.writeText(text)
			setCopiedText(text)
			return text
		} catch (error) {
			// eslint-disable-next-line no-console
			console.warn('Copy failed', error)
			setCopiedText(null)
			return null
		}
	}
	return [copiedText, copy]
}
export default useClipboard
