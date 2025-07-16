import React, { useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, LayoutDashboard } from 'lucide-react'
import { useUserContext } from '../../context/userContext'

// Add placeholder logos - replace with your actual logo imports
const newLogo = '/path/to/your/logo.png'
const milesLogoWithoutText = '/path/to/your/logo-small.png'

const icons = {
	dashboard: {
		icon: <LayoutDashboard />,
		label: 'Dashboard',
		url: '/dashboard',
		// permissionKey:'dashboard_all_permission'
	},
}

const LeftSidebar = () => {
	const [selectedKey, setSelectedKey] = useState(null)
	const location = useLocation()
	const navigate = useNavigate()
	const { user, setUser } = useUserContext()
	
	// Use user's isExpanded state if available, otherwise default to false
	const isExpanded = user?.isExpanded || false

	useEffect(() => {
		// Get the first segment of the pathname to determine which tab is selected
		const pathSegment = location.pathname.split('/')[1] || 'dashboard'
		setSelectedKey(pathSegment)
	}, [location])

	const toggleExpand = () => {
		const newExpandedState = !isExpanded
		if (user) {
			setUser({ ...user, isExpanded: newExpandedState })
		}
	}

	const handleNavigation = (url) => {
		navigate(url)
	}

	const filteredIcons = Object.keys(icons).reduce((acc, key) => {
		const iconData = icons[key]
		if (
			user?.permissionsObj?.[iconData?.permissionKey] ||
			key === 'dashboard'
		) {
			acc[key] = iconData
		}
		return acc
	}, {})

	return (
		<div
			className={`left-sidebar ${isExpanded ? 'expanded' : ''} blue_theme_side_bar_bg`}>
			{/* Logo Section */}
			<div
				className="logo-section"
				onClick={() =>
					handleNavigation(
						user?.user_type === 'Vendor' ? '/vendorsDashboard' : '/dashboard'
					)
				}>
				{isExpanded ? (
					<img src={newLogo} alt="Logo" />
				) : (
					<img src={milesLogoWithoutText} alt="Logo" />
				)}
			</div>

			{/* Icon Section */}
			<nav className="icon-section">
				{Object.entries(filteredIcons).map(([key, { icon, label, url }]) => (
					<div
						key={key}
						className={`icon-wrapper ${selectedKey === key ? 'selected' : ''}`}
						onClick={() => handleNavigation(url)}
						data-tooltip-id={`tooltip-${key}`}>
						<div className="icon">{icon}</div>
						{isExpanded && (
							<span
								className={`icon-label ${selectedKey === key ? 'selected' : ''}`}>
								{label}
							</span>
						)}
						{!isExpanded && (
							<Tooltip
								id={`tooltip-${key}`}
								place="right"
								content={label}
							/>
						)}
					</div>
				))}
			</nav>

			{/* Expand/Collapse Button */}
			<div className="expand-button hide-phone" onClick={toggleExpand}>
				{isExpanded ? (
					<ArrowLeft title="Collapse" />
				) : (
					<ArrowRight title="Expand" />
				)}
			</div>
		</div>
	)
}

export default LeftSidebar