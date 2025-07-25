import axiosInstance from "./axiosInstance"

export const addSlotApi = async payload => {
	try {
		const response = await axiosInstance.post(`slots/slot/`, payload)
		return response.data
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('API Error:', error)
		throw error.response?.data || 'Error'
	}
}

export const updateSlotApi = async payload => {
	try {
		const response = await axiosInstance.patch(`slots/slot/`, payload)
		return response.data
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('API Error:', error)
		throw error.response?.data || 'Error'
	}
}