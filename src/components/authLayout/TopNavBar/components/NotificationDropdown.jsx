import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { getAllNotification } from '@/api/notificationApi'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContentWidth } from '@/hooks'
function timeSince(date) {
	if (typeof date !== 'object') {
		date = new Date(date)
	}
	const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000)
	let intervalType
	let interval = Math.floor(seconds / 31536000)
	if (interval >= 1) {
		intervalType = 'year'
	} else {
		interval = Math.floor(seconds / 2592000)
		if (interval >= 1) {
			intervalType = 'month'
		} else {
			interval = Math.floor(seconds / 86400)
			if (interval >= 1) {
				intervalType = 'day'
			} else {
				interval = Math.floor(seconds / 3600)
				if (interval >= 1) {
					intervalType = 'hr'
				} else {
					interval = Math.floor(seconds / 60)
					if (interval >= 1) {
						intervalType = 'min'
					} else {
						interval = seconds
						intervalType = 'second'
					}
				}
			}
		}
	}
	if (interval > 1 || interval === 0) {
		intervalType += 's'
	}
	return interval + ' ' + intervalType + ' ago'
}


const NotificationDropdown = (props) => {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate()
	const width = useContentWidth();

	const isMobile = width < 768

	const fetchNotifications = async () => {
		setLoading(true);
		props.setNotificationToggle(false)
		try {
			const data = await getAllNotification();
			setNotifications(data.data ?? []);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Error fetching notifications", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			fetchNotifications();
		}
	}, [isOpen]);


	const redirect = (id)=>{
		navigate(`/candidates/view-candidate?id=${id}`)
	}

	return (
		<Dropdown
			className="notification-list"
			onToggle={(open) => setIsOpen(open)}
		>
			<DropdownToggle as="a" className="nav-link arrow-none nav-icon" role="button">
				<i className="ti ti-bell" />
				{ props?.notificationToggle && <span className="alert-badge" /> }
			</DropdownToggle>

			<DropdownMenu align="end" className={`${isMobile ? 'dropdown-sm' : 'dropdown-lg'} pt-0`}>
				<h6 className="dropdown-item-text font-15 m-0 py-3 border-bottom d-flex justify-content-between align-items-center">
					Notifications{" "}
					<span className="badge bg-soft-primary badge-pill">{notifications?.length}</span>
				</h6>

				<SimpleBar className="notification-menu" data-simplebar>
					{loading ? (
						<div className="d-flex justify-content-center align-items-center mt-2">
							<div className="spinner-border text-primary" style={{ width: "2rem", height: "2rem" }}></div>
						</div>
					) : (
						notifications.map((notification, idx) => (
							<DropdownItem key={idx} className="notification-custom-dropdown py-3" style = { (notification?.event_type == 'Followup Task Reminder') ? { cursor: 'pointer'} : { cursor: 'default'}} onClick={()=> (notification?.event_type == 'Followup Task Reminder') ? redirect(notification?.id) : void(0)}>
								<small className="float-end text-muted ps-2">
									{timeSince(notification?.created_at ?? "")}
								</small>
								<div className="media">
									<div className="avatar-md bg-soft-primary">
									{notification?.event_type == 'Followup Task Reminder' ? 
										<i className={`ti ti-${'drone'}`} /> : 
										<i className={`ti ti-${'chart-arcs'}`} />
									}

									</div>
									<div className="media-body align-self-center ms-2 text-truncate">
										<h6 className="my-0 fw-normal text-dark" style={(notification?.event_type == 'Followup Task Reminder') ? {color: "#0b51b7 !important"} : {color: "#000444 !important"}}>
											{notification?.title ?? ""}
										</h6>
										<small className="text-muted mb-0">
											{notification?.message ?? ""}
										</small>
									</div>
								</div>
							</DropdownItem>
						))
					)}
					{ notifications.length == 0 && <div className="notification_no_data"> No data Found!</div> }
				</SimpleBar>

				{/*{notifications.length > 10 && (
					<Link to="" className="dropdown-item text-center text-primary">
						View all <i className="fi-arrow-right" />
					</Link>
				)}*/}
			</DropdownMenu>
		</Dropdown>
	);
};

export default NotificationDropdown;