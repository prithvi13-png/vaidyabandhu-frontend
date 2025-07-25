import axiosInstance from "./axiosInstance"

export const appointmentActionApi = async (param) => {
	try {
		const response = await axiosInstance.get('appointment' + param)
		return response.data
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('API Error:', error)
		throw error.response?.data || 'Error'
	}
}