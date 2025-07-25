import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from '.'
import PageLoader from '../common/PageLoader'
import { isNotEmptyArray } from '../utiles/utils'
import axiosInstance from '../../api/axiosInstance'

const userContext = createContext()

export const UserProvider = ({ children }) => {
	const { checkISAuthenticated, logout } = useAuthContext()
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	// ✅ Fetch app_configs API
	const getAppConfigs = async () => {
		try {
			const response = await axiosInstance.get(`/app_configs/`)
			return response?.data?.data || {} // Return the configs
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error fetching app configs:', error)
			return {} // Return empty object on failure
		}
	}

	// ✅ Fetch user profile data
	const getUserData = async () => {
		try {
			const res = await axiosInstance.get(`/admin/profile/`)
			const { data } = res.data
			if (!data) return null
			// Handle Permissions
			const permissionsObj = {}
			if (isNotEmptyArray(data?.permissions)) {
				data.permissions.forEach((item) => {
					if (
						item?.app_permission?.permission_slug_name &&
						item?.access_level === 'Everything'
					) {
						permissionsObj[item.app_permission.permission_slug_name] = true
					}
				})
			}
			return {
				...data,
				permissionsObj,
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error fetching user data:', error)
			return null
		}
	}

	// ✅ Fetch both APIs together and merge results
	const fetchUserAndConfigs = async () => {
		setLoading(true)
		try {
			const results = await Promise.allSettled([getUserData(), getAppConfigs()])
			const userData = results[0].status === 'fulfilled' ? results[0].value : {}
			const appConfigs =
				results[1].status === 'fulfilled' ? results[1].value : {}
			// if (userData) {
			setUser({ ...userData, appConfigs }) // Merge both results
			// }
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error in fetching data:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!checkISAuthenticated()) {
			logout()
		} else {
			fetchUserAndConfigs()
		}
	}, [])

	return (
		<>
			<userContext.Provider value={{ user, setUser, loading }}>
				{children}
			</userContext.Provider>
			{loading && <PageLoader />}
		</>
	)
}

export const useUserContext = () => useContext(userContext)
