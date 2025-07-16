import axiosInstance from './axiosInstance'

export const loginApi = async (url, email, password) => {
	try {
		const response = await axiosInstance.post(url, {
			email,
			password,
		})
		return response.data
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Login API Error:', error)
		throw error.response?.data || 'Error during login.'
	}
}
