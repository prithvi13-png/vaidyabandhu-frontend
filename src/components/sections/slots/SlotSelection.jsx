// import { addSlotAPI, deleteSlotAPI, getSlotsAPI } from '@/api/contactApi'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { toast } from 'sonner'
import { Form, Row, Col, Spinner } from 'react-bootstrap'
import Select from 'react-select'
import AvailableTimeSection from './AvilableTimeSection'
import { dateFormat } from '../../utiles/dateFormat'
import { getSlotListAPI } from '../../../api/slotApi'

const durationOption = [
	{ label: '15 Mins', value: 15 },
	{ label: '30 Mins', value: 30 },
	{ label: '45 Mins', value: 45 },
	{ label: '60 Mins', value: 60 },
]
const slotType = [
	{ value: 'Booked Slot', color: '#ff9f43' },
	{ value: 'Avilable Slot', color: '#22b783' },
]

const SlotSelection = ({
	id,
	email,
	sData,
	setStartDate,
	startDate,
	visibleDates,
	setRefrsh,
}) => {
	const [slotsData, setSlotsData] = useState({})
	// const [bookSlotsData, setBookSlotsData] = useState({})
	const dateInputRef = useRef(null) // Reference to the date input
	// const [showModal, setShowModal] = useState('')

	const [loading, setLoading] = useState(false)
	// const [load, setLoad] = useState(false)
	// const [deleteModal, setDeleteModal] = useState(null)
	const visibleRange = `${visibleDates[0]} to ${visibleDates[6]}`
	const [selectedDuration, setSelectedDuration] = useState({
		label: '15 Mins',
		value: 15,
	})

	useEffect(() => {
		if (email) {
			getDataAPIFn(selectedDuration)
		}
	}, [JSON.stringify(visibleDates), email, JSON.stringify(selectedDuration)])

	const convertDateFormat = (dateString) => {
		const [day, month, year] = dateString.split('-')
		return `${year}-${month}-${day}`
	}

	const convertScheduleFormat = (schedule) => {
		let formattedSchedule = {}

		Object.entries(schedule).forEach(([date, slots]) => {
			// Convert date from "YYYY-MM-DD" to "DD-MM-YYYY"
			const formattedDate = date.split('-').reverse().join('-')

			// Map each slot to a "start_time - end_time" format
			formattedSchedule[formattedDate] = slots
		})

		return formattedSchedule
	}
	const getDataAPIFn = async (selectedDuration) => {
		try {
			setLoading(true)
			const start = convertDateFormat(visibleDates[0])
			// const end = convertDateFormat(visibleDates[6])
			let param = `?duration=${selectedDuration.value}&id=${id}&start_date=${start}&end_date=${start}`

			const response = await getSlotListAPI(param)
			if (response?.status) {
				const list = convertScheduleFormat(response.data.available_slots)
				const bookedList = convertScheduleFormat(response.data.blocked_slots)
				const dataListB = {}
				const dataListA = {}

				// Process bookedList (set is_blocked: true)
				Object.keys(bookedList).forEach((date) => {
					dataListB[date] = bookedList[date].map((slot) => ({
						...slot,
						is_blocked: true,
					}))
				})

				// Process list (set is_blocked: false)
				Object.keys(list).forEach((date) => {
					dataListA[date] = list[date].map((slot) => ({
						...slot,
						is_blocked: false,
					}))
				})

				// Merge the two objects
				const mergedList = {}

				// First, add all dates from dataListA
				Object.keys(dataListA).forEach((date) => {
					mergedList[date] = [...dataListA[date]]
				})

				// Then, add dates from dataListB
				Object.keys(dataListB).forEach((date) => {
					if (mergedList[date]) {
						// If date already exists, concatenate the arrays
						mergedList[date] = [...mergedList[date], ...dataListB[date]]
					} else {
						// If date doesn't exist, add it
						mergedList[date] = [...dataListB[date]]
					}
				})

				setSlotsData(mergedList)
			}
		} catch (error) {
			toast.error(
				error.message || 'Something went wrong. Please try again later.',
				{
					position: 'top-right',
					duration: 2000,
				}
			)
		} finally {
			setLoading(false)
		}
	}

	// Move to previous week (Can view but not modify)
	const handlePrevWeek = () => {
		setStartDate((prev) => {
			const newStart = new Date(prev)
			newStart.setDate(newStart.getDate() - 7)
			return newStart
		})
	}

	// Move to next week
	const handleNextWeek = () => {
		setStartDate((prev) => {
			const newStart = new Date(prev)
			newStart.setDate(newStart.getDate() + 7)
			return newStart
		})
	}

	// Function to remove a slot (Only for today and future)
	// const removeSlot = (date, id) => {
	// 	setSlotsData((prevData) => ({
	// 		...prevData,
	// 		[date]: prevData[date].filter((slot) => slot.id !== id),
	// 	}))
	// }

	// Function to add a new slot (Only for today and future)
	// const addSlot = (date) => {
	// 	if (isDateEarlierThanCurrent(date)) {
	// 		toast.error('Cannot add slots to past dates!')
	// 		return
	// 	}
	// 	setShowModal(date)

	// 	// const newSlot = prompt("Enter new slot time (e.g., 4:00 pm)");
	// 	// if (newSlot) {
	// 	//   setSlotsData((prevData) => ({
	// 	//     ...prevData,
	// 	//     [date]: [...(prevData[date] || []), newSlot].sort(),
	// 	//   }));
	// 	// }
	// }

	// Change start date
	const handleStartDateChange = (e) => {
		const selectedDate = new Date(e.target.value)
		setStartDate(selectedDate)
	}

	// Format Date as "YYYY-MM-DD" for input compatibility
	const formatDateForInput = (date) => {
		return date.toISOString().split('T')[0]
	}

	// Click anywhere in the section to open the date picker
	const handleOpenDatePicker = () => {
		if (dateInputRef.current) {
			dateInputRef.current.showPicker() // Triggers the native date picker
		}
	}

	// const handleAddSlot = async (data) => {
	// 	const payload = {
	// 		...data,
	// 		recruiter: Number(id),
	// 		date: convertDateFormat(data.date),
	// 	}
	// 	setLoad(true)
	// 	try {
	// 		const response = await addSlotAPI(payload)
	// 		if (response?.status) {
	// 			toast.success('Slot created successfully!', {
	// 				position: 'top-right',
	// 				duration: 2000,
	// 			})
	// 			getDataAPIFn()
	// 			setShowModal(false)
	// 		}
	// 	} catch (error) {
	// 		const errorMessage =
	// 			error.message || 'Something went wrong. Please try again later.'
	// 		toast.error(errorMessage, { position: 'top-right', duration: 2000 })
	// 	} finally {
	// 		setLoad(false)
	// 	}
	// }

	// const deleteSlot = async () => {
	// 	if (!isNotEmptyObject(deleteModal)) {
	// 		return
	// 	}
	// 	try {
	// 		const response = await deleteSlotAPI(deleteModal.id)
	// 		if (response?.status) {
	// 			toast.success(response.message || 'Slot is Deleted Successfully', {
	// 				position: 'bottom-right',
	// 				duration: 2000,
	// 			})
	// 			removeSlot(deleteModal.date, deleteModal.id)
	// 			setDeleteModal(null)
	// 		}
	// 	} catch (error) {
	// 		// Handle errors and show appropriate toast messages
	// 		const errorMessage =
	// 			error.message || 'Something went wrong.Please try after some time'
	// 		toast.error(errorMessage, {
	// 			position: 'top-right',
	// 			duration: 2000,
	// 		})
	// 	}
	// }

	// function isDateEarlierThanCurrent(givenDate) {
	// 	const currentDate = new Date() // Get current date
	// 	currentDate.setHours(0, 0, 0, 0) // Reset time to 00:00:00 for comparison to ignore the time part

	// 	const givenDateObj = new Date(givenDate) // Convert given date string to Date object
	// 	givenDateObj.setHours(0, 0, 0, 0) // Reset time to 00:00:00 for comparison to ignore the time part

	// 	// Compare if the given date is earlier than today's date (strictly before)
	// 	return givenDateObj < currentDate
	// }

	// const isNotCurrentTime = (startTime, date) => {
	// 	let bol = true
	// 	const today = new Date()
	// 		.toISOString()
	// 		.split('T')[0]
	// 		.split('-')
	// 		.reverse()
	// 		.join('-')

	// 	const currentDate = new Date()
	// 	const currentFormattedTime = formatTime(currentDate)
	// 	if (
	// 		today === date &&
	// 		timeToMilliseconds(currentFormattedTime) > timeToMilliseconds(startTime)
	// 	) {
	// 		bol = false
	// 	}
	// 	return bol
	// }

	return (
		<div className="container">
			{/* Header */}
			<div className="header">
				<label className="fw-bold" style={{ fontSize: '14px' }}>7 Days Slots</label>
				<div className="date-filter">
					<button className="nav-btn" onClick={handlePrevWeek}>
						<ArrowLeft />
					</button>
					<span className="visible-range">{visibleRange}</span>
					<button className="nav-btn" onClick={handleNextWeek}>
						<ArrowRight />
					</button>
				</div>
				<div className="d-flex align-items-center">
					{slotType.map((itm, itmIndex) => (
						<div key={itmIndex} className="d-flex align-items-center mx-2">
							<div
								style={{
									background: itm.color,
									borderRadius: '20px',
									marginRight: '5px',
									width: '10px',
									height: '10px',
								}}></div>
							<div>{itm.value}</div>
						</div>
					))}
					<div className="mx-2">
						<Select
							className="custom-select"
							placeholder={'Select'}
							options={durationOption}
							value={selectedDuration}
							onChange={(e) => setSelectedDuration(e)}
						/>
					</div>
					<div className="date-section" onClick={handleOpenDatePicker}>
						<Form.Group>
							<Form.Control
								type="date"
								value={formatDateForInput(startDate)}
								onChange={handleStartDateChange}
								max="2100-12-31"
								ref={dateInputRef} // Attach ref to input
								style={{ cursor: 'pointer' }}
							/>
						</Form.Group>
					</div>
				</div>
			</div>
			{loading && (
				<div
					className="d-flex align-items-center justify-content-center"
					style={{ minHeight: '400px' }}>
					<Spinner />
				</div>
			)}
			{!loading && (
				<Row>
					<Col>
						<AvailableTimeSection
							id={id}
							date={dateFormat(startDate)}
							sData={sData}
							setRefrsh={setRefrsh}
						/>
					</Col>
					<Col>
						{/* Slot Table */}
						<Row>
							{/* {visibleDates.map((date) => { */}
							{/* // const dateObj = new Date(date.split('-').reverse().join('-'))
								// const isPast = isDateEarlierThanCurrent(dateObj) */}

							{/* return ( */}
							<Col sm={12}>
								<div className="slot-day">
									<div className="date-header">
										<span>{visibleDates[0]}</span>
										{/* {!isPast && (
												<button
													className="add-btn"
													onClick={() => addSlot(date)}>
													<FaPlus />
												</button>
											)} */}
									</div>
									<div className="slots">
										{slotsData[visibleDates[0]]?.length > 0 ? (
											slotsData[visibleDates[0]].map((time) => (
												<div
													key={`${visibleDates[0]}-${time.start_time} - ${time.end_time}`}
													className={`slot ${time.is_blocked ? 'bg-warning' : 'bg-success'} text-white`}>
													{`${time.start_time} - ${time.end_time}`}
													{/* {!isPast &&
															!time.is_blocked &&
															isNotCurrentTime(time.start_time, date) && (
																<button
																	className="delete-btn"
																	onClick={(e) => {
																		e.stopPropagation()
																		setDeleteModal({ ...time, date })
																	}}>
																	<FaTrash />
																</button>
															)} */}
												</div>
											))
										) : (
											<p className="no-slots">No slots available</p>
										)}
									</div>
								</div>
							</Col>
							{/* ) */}
							{/* })} */}
						</Row>
					</Col>
				</Row>
			)}

			{/* Styles */}
			<style>{`
				.container {
					width: 100%;
					max-width: 100% !important;
					background: white;
					border-radius: 10px;
					padding: 15px;
					box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
				}
				.header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 15px;
				}
				.date-filter {
					display: flex;
					align-items: center;
					gap: 10px;
				}
				.visible-range {
					font-size: 14px;
					font-weight: bold;
					color: #333;
				}
				.nav-btn {
					background: none;
					border: none;
					font-size: 18px;
					cursor: pointer;
					color: #007bff;
				}
				.slot-table {
					display: flex;
					flex-direction: column;
					gap: 15px;
				}
				.slot-day {
					background: #f8f9fa;
					border-radius: 10px;
					padding: 10px;
					margin-bottom: 10px;
					height: calc(100% - 10px);
				}
				.date-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 16px;
					font-weight: bold;
					margin-bottom: 10px;
				}
				.add-btn {
					background: none;
					border: none;
					font-size: 16px;
					cursor: pointer;
					color: #007bff;
				}
				.slots {
					display: flex;
					flex-wrap: wrap;
					gap: 8px;
				}
				.slot {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 8px 12px;
					border: 1px solid #ccc;
					border-radius: 5px;
					background: white;
					font-size: 14px;
				}
				.slot.selected {
					background: #007bff;
					color: white;
				}
				.delete-btn {
					background: none;
					border: none;
					color: red;
					font-size: 12px;
					cursor: pointer;
				}
				.no-slots {
					font-size: 14px;
					color: #777;
				}
			`}</style>
			{/* {showModal && (
				<SlotModal
					show={showModal}
					onClose={() => setShowModal(false)}
					onSave={handleAddSlot}
					date={showModal}
					btnLoader={load}
				/>
			)}
			{isNotEmptyObject(deleteModal) && (
				<ConfirmationModal
					show={deleteModal}
					handleClose={() => setDeleteModal(null)}
					msg="Are you sure you want to delete this slot?"
					title="Delete Slot"
					handleConfirm={deleteSlot}
					actionButtonName="Yes"
				/>
			)} */}
		</div>
	)
}

// const formatTime = (date) => {
// 	let hours = date.getHours()
// 	let minutes = date.getMinutes()
// 	if (hours < 10) hours = `0${hours}`
// 	if (minutes < 10) minutes = `0${minutes}`
// 	return `${hours}:${minutes}`
// }

// const timeToMilliseconds = (time) => {
// 	const [hours, minutes] = time.split(':').map(Number) // Split and parse hours and minutes
// 	return (hours * 60 + minutes) * 60 * 1000 // Convert to milliseconds
// }

// const SlotModal = ({ show, onClose, onSave, date, btnLoader }) => {
// 	const [startTime, setStartTime] = useState('')
// 	const [endTime, setEndTime] = useState('')
// 	const [duration, setDuration] = useState('')
// 	const [error, setError] = useState('')

// 	const [isToday, setIsToday] = useState(false)
// 	const [currentTimeString, setCurrentTimeString] = useState('')

// 	// Function to format time to HH:mm (24-hour format)

// 	// Get current time and check if the selected date is today
// 	useEffect(() => {
// 		const currentDate = new Date()
// 		const currentFormattedTime = formatTime(currentDate)
// 		setCurrentTimeString(currentFormattedTime)

// 		// Compare only the date (ignoring time) by converting both dates to YYYY-MM-DD format
// 		const today = new Date()
// 			.toISOString()
// 			.split('T')[0]
// 			.split('-')
// 			.reverse()
// 			.join('-') // "YYYY-MM-DD

// 		setIsToday(today === date) // Check if it's today
// 	}, [date])

// 	const handleStartTimeChange = (e) => {
// 		setStartTime(e.target.value)

// 		let errorMessage = '' // Initialize an error message variable

// 		// Check if the start time is in the past (for today only)
// 		if (
// 			isToday &&
// 			timeToMilliseconds(currentTimeString) > timeToMilliseconds(e.target.value)
// 		) {
// 			errorMessage =
// 				'To create a slot start time should be greater than current time.'
// 		}

// 		// Check if the start time is greater than or equal to the end time
// 		if (endTime && e.target.value >= endTime) {
// 			errorMessage = 'Start time must be before End time.'
// 		}

// 		setError(errorMessage) // Set the error state to the appropriate message
// 	}

// 	const handleEndTimeChange = (e) => {
// 		setEndTime(e.target.value)
// 		let errorMessage = '' // Initialize an error message variable

// 		// Check if the start time is in the past (for today only)
// 		if (
// 			isToday &&
// 			timeToMilliseconds(currentTimeString) > timeToMilliseconds(startTime)
// 		) {
// 			errorMessage =
// 				'To create a slot start time should be greater than current time.'
// 		}

// 		if (startTime && e.target.value <= startTime) {
// 			errorMessage = 'End time must be greater than Start time.'
// 		}
// 		setError(errorMessage) // Set the error state to the appropriate message
// 	}

// 	const handleSave = () => {
// 		if (!startTime || !endTime) {
// 			setError('Both start and end times are required.')
// 			return
// 		}

// 		if (startTime >= endTime) {
// 			setError('Start time must be before End time.')
// 			return
// 		}

// 		onSave({
// 			start_time_str: startTime,
// 			end_time_str: endTime,
// 			date,
// 			slot_duration: duration,
// 		})
// 	}

// 	return (
// 		<Modal show={show} onHide={onClose} centered>
// 			<Modal.Header closeButton>
// 				<Modal.Title>Add Slot for {date}</Modal.Title>
// 			</Modal.Header>
// 			<Modal.Body>
// 				{error && <Alert variant="danger">{error}</Alert>}

// 				<Form>
// 					<Row>
// 						<Col sm={6}>
// 							<Form.Group>
// 								<Form.Label>Start Time</Form.Label>
// 								<span className="text-danger">*</span>
// 								<Form.Control
// 									type="time"
// 									value={startTime}
// 									onChange={handleStartTimeChange}
// 									min={isToday ? currentTimeString : '00:00'} // Disable past times only if today
// 									step="60"
// 								/>
// 							</Form.Group>
// 						</Col>
// 						<Col sm={6}>
// 							<Form.Group>
// 								<Form.Label>End Time</Form.Label>
// 								<span className="text-danger">*</span>
// 								<Form.Control
// 									type="time"
// 									value={endTime}
// 									onChange={handleEndTimeChange}
// 									min={isToday ? currentTimeString : '00:00'} // Disable past times only if today
// 									step="60"
// 								/>
// 							</Form.Group>
// 						</Col>
// 					</Row>
// 					<Row className="mt-2">
// 						<Col sm={6}>
// 							<Form.Group>
// 								<Form.Label>Duration (minutes)</Form.Label>
// 								<span className="text-danger">*</span>
// 								<Form.Control
// 									as="select"
// 									value={duration}
// 									onChange={(e) => setDuration(parseInt(e.target.value))}>
// 									<option value="">Select duration</option>
// 									<option value={30}>30</option>
// 									<option value={45}>45</option>
// 									<option value={60}>60</option>
// 								</Form.Control>
// 							</Form.Group>
// 						</Col>
// 					</Row>
// 				</Form>
// 			</Modal.Body>

// 			<Modal.Footer>
// 				<Button variant="secondary" onClick={onClose}>
// 					Cancel
// 				</Button>
// 				<Button
// 					variant="primary"
// 					onClick={handleSave}
// 					disabled={
// 						error ||
// 						btnLoader ||
// 						!duration ||
// 						!startTime ||
// 						!endTime ||
// 						startTime >= endTime
// 					} // Disable button if invalid
// 				>
// 					{btnLoader && (
// 						<Spinner animation="border" role="status" size="sm"></Spinner>
// 					)}
// 					Add Slot
// 				</Button>
// 			</Modal.Footer>
// 		</Modal>
// 	)
// }

export default SlotSelection
