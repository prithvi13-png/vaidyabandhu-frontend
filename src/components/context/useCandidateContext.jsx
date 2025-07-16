import axiosInstance from '@/api/axiosInstance'
import { createContext, useContext, useEffect, useState } from 'react'
import PageLoader from '@/components/PageLoader'
import { useCandidateAuthContext } from './useCandidateAuthContext'

const CandidateContext = createContext()

export const CandidateProvider = ({ children }) => {
	const { checkISAuthenticated, logout } = useCandidateAuthContext()
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	// ✅ Fetch  candidate profile data
	const getUserData = async () => {
		setLoading(true)
		try {
			const res = await axiosInstance.get(`/candidate/profile/`)
			const data = res.data

			setUser(data.data)
		} catch (error) {
		// eslint-disable-next-line no-console
			console.error(error);
			
			return null
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (!checkISAuthenticated()) {
			logout()
		} else {
			getUserData()
		}
	}, [])

	return (
		<>
			<CandidateContext.Provider
				value={{ user, setUser, loading, checkISAuthenticated }}>
				{children}
			</CandidateContext.Provider>

			{loading && <PageLoader />}
		</>
	)
}

export const useCandidateContext = () => useContext(CandidateContext)
