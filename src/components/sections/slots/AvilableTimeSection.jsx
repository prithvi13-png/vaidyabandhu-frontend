import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { MinusCircle } from 'lucide-react';


import { toast } from 'sonner'
import { saveWorkingHourAPI } from '../../../api/slotApi'
import { deepCopy, isNotEmptyArray } from '../../utiles/utils'

function getNext7Days(dateString) {
	const startDate = new Date(dateString)
	return Array.from({ length: 7 }, (_, i) => {
		const date = new Date(startDate)
		date.setDate(startDate.getDate() + i)
		return {
			day: date.toLocaleDateString('en-US', { weekday: 'long' }),
			date: date.toISOString().split('T')[0],
		}
	})
}

const AvailableTimeSection = ({ id, date, sData, setRefrsh }) => {
	const daysOfWeek = getNext7Days(date)

	const [businessHours, setBusinessHours] = useState(null)
	const [originalData, setOriginalData] = useState(null)

	useEffect(() => {
		const defaultHours = daysOfWeek.reduce((acc, { day, date }) => {
			const sDataEntries = sData?.filter((item) => item.slot_date === date)
			const givenDate = new Date(date)

			// Get today's date
			const todayDate = new Date()

			// Set the time for today's date to 00:00:00 to ignore time differences
			todayDate.setHours(0, 0, 0, 0)

			// Compare the given date with today's date
			const isLessThanToday = givenDate < todayDate

			return {
				...acc,
				[day]: {
					timeRanges:
						sDataEntries.length > 0
							? sDataEntries.map(({ start_time, end_time, ...rest }) => ({
									...rest,
									start: start_time,
									end: end_time,
								}))
							: [{ start: '09:00', end: '17:00' }],
					isNotAvailable: !sDataEntries.every(el=> el.is_active) || isLessThanToday,
					disable: isLessThanToday,
				},
			}
		}, {})
		setBusinessHours(defaultHours)
		setOriginalData(deepCopy(defaultHours))
	}, [JSON.stringify(sData), date])

	const [validationErrors, setValidationErrors] = useState({})
	const [submitError, setSubmitError] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const timeToMinutes = (time) => {
		const [hours, minutes] = time.split(':').map(Number)
		return hours * 60 + minutes
	}

	const doTimeRangesOverlap = (range1, range2) => {
		const start1 = timeToMinutes(range1.start)
		const end1 = timeToMinutes(range1.end)
		const start2 = timeToMinutes(range2.start)
		const end2 = timeToMinutes(range2.end)
		return !(end1 <= start2 || end2 <= start1)
	}

	const validateTimeRanges = (timeRanges) => {
		for (let i = 0; i < timeRanges.length; i++) {
			if (
				timeToMinutes(timeRanges[i].start) >= timeToMinutes(timeRanges[i].end)
			) {
				return 'Start time must be before end time'
			}
			for (let j = i + 1; j < timeRanges.length; j++) {
				if (doTimeRangesOverlap(timeRanges[i], timeRanges[j])) {
					return 'Time ranges cannot overlap'
				}
			}
		}
		return null
	}

	const handleTimeChange = (day, index, field, value) => {
		const updatedHours = { ...businessHours }
		updatedHours[day].timeRanges[index][field] = value
		setBusinessHours(updatedHours)
		const newErrors = { ...validationErrors }
		delete newErrors[day]
		setValidationErrors(newErrors)
	}

	const addTimeRange = (day) => {
		const updatedHours = { ...businessHours }
		updatedHours[day].timeRanges.push({is_active: true, weekday: updatedHours[day].timeRanges[0].weekday, slot_date: updatedHours[day].timeRanges[0].slot_date, start: '09:00', end: '17:00' })
		setBusinessHours(updatedHours)
	}
	const [removedIds, setRemoveIds] = useState([])

	const removeTimeRange = (day, index) => {
		const updatedHours = { ...businessHours }
		if (updatedHours[day].timeRanges.length > 1) {
			const removeItem = updatedHours[day].timeRanges.splice(index, 1)
			if (removeItem?.[0]?.id) {
				setRemoveIds((prev) => [...prev, { id: removeItem?.[0]?.id }])
			}

			setBusinessHours(updatedHours)
		}
	}

	const toggleClosed = (day) => {
		const updatedHours = { ...businessHours }
		
		updatedHours[day].isNotAvailable = !updatedHours[day].isNotAvailable
		updatedHours[day].timeRanges = updatedHours[day].timeRanges.map(el => ({...el, is_active : !el.is_active}))
		// if (updatedHours[day].isNotAvailable) {
		// 	updatedHours[day].timeRanges = [{ start: '09:00', end: '17:00' }]
		// }
		setBusinessHours(updatedHours)
		const newErrors = { ...validationErrors }
		delete newErrors[day]
		setValidationErrors(newErrors)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setSubmitError(null)
		setValidationErrors({})

		const errors = {}
		Object.keys(businessHours).forEach((day) => {
			if (!businessHours[day].isNotAvailable) {
				const validationError = validateTimeRanges(
					businessHours[day].timeRanges
				)
				if (validationError) {
					errors[day] = validationError
				}
			}
		})

		if (Object.keys(errors).length > 0) {
			setValidationErrors(errors)
			return
		}

		function processTimeSlots(inputData, removedIds, originalData) {
			const outputData = {
				create: [],
				update: [],
				delete: isNotEmptyArray(removedIds) ? removedIds : [],
			};
		
			// Identify removed slots by comparing originalData with inputData
			Object.keys(originalData).forEach((day) => {
				const originalTimeRanges = originalData[day]?.timeRanges || [];
		
				originalTimeRanges.forEach((origSlot) => {
					// Check if this slot is still present in inputData
					const isStillPresent = inputData[day]?.timeRanges?.some((slot) => slot.id === origSlot.id);
		
					if (!isStillPresent) {
						// If the slot is missing in inputData, mark it for deletion
						outputData.delete.push({ id: origSlot.id });
					}
				});
			});
		
			Object.keys(inputData).forEach((day) => {
				const details = inputData[day];
				const isNotAvailable = details.isNotAvailable;
		
				details.timeRanges.forEach((slot) => {
					const startTime = slot.start || '';
					const endTime = slot.end || '';
		
					if (slot.id) {
						// Fetch original data for comparison
						const originalDayData = originalData[day] || { timeRanges: [] };
						const originalSlot = originalDayData.timeRanges.find((s) => s.id === slot.id);
		
						if (isNotAvailable) {
							// If the slot is marked unavailable, add to delete
							if(originalSlot.is_active !== slot.is_active){
								outputData.delete.push({ id: slot.id });
							}
						} else if (originalSlot) {
							// Compare fields to check if any change occurred
							const hasChanged =
								originalSlot.start !== startTime ||
								originalSlot.end !== endTime ||
								originalSlot.weekday !== slot.weekday ||
								originalSlot.is_active !== slot.is_active ||
								originalSlot.slot_date !== slot.slot_date;
		
							if (hasChanged) {
								outputData.update.push({
									id: slot.id,
									contact_id: slot.contact_id,
									slot_date: slot.slot_date,
									start_time: startTime,
									is_active:slot.is_active,
									end_time: endTime,
									weekday: slot.weekday,
								});
							}
						}
					} else {
						// If no id and available, add to create
						if (!isNotAvailable) {
							outputData.create.push({
								contact: id, // Default contact ID for new slots
								slot_date: slot.slot_date, // Placeholder date
								start_time: startTime,
								end_time: endTime,
								weekday: day,
							});
						}
					}
				});
			});
		
			return outputData;
		}
		
		const submitData = processTimeSlots(businessHours, removedIds, originalData)

		try {
			setIsSubmitting(true)
			const response = await saveWorkingHourAPI({
				create: isNotEmptyArray(submitData?.create) ? [...new Map(submitData.create.map(item => [item.id, item])).values()]: null,
				update: isNotEmptyArray(submitData?.update) ? [...new Map(submitData.update.map(item => [item.id, item])).values()] : null,
				delete:  isNotEmptyArray(submitData?.delete) ? [...new Map(submitData.delete.map(item => [item.id, item])).values()] : null,
			})
			if (response?.status === 200) {
				toast.success('Working Hours Saved Successfully', {
					position: 'bottom-right',
					duration: 2000,
				})
				setRefrsh(Math.random())
			} else {
				setSubmitError(response.message)
			}
		} catch (error) {
			setSubmitError(error.message)
		} finally {
			setIsSubmitting(false)
		}
	}

	if (!businessHours) {
		return <></>
	}

	return (
		<Container>
			<h4 className="mb-4">Working Hours</h4>
			<Form onSubmit={handleSubmit}>
				{daysOfWeek.map(({ day, date }) => (
					<Row key={day} className="mb-3">
						<Col md={2}>
							<Form.Label className="mb-0 mt-2 text-black">{day} <br /> {date}</Form.Label>
						</Col>
						<Col md={7}>
							{businessHours[day].timeRanges.map((range, index) => (
								<Row key={index} className="mb-2 align-items-center">
									<Col md={5}>
										<Form.Control
											type="time"
											value={range.start}
											onChange={(e) =>
												handleTimeChange(day, index, 'start', e.target.value)
											}
											disabled={businessHours[day].isNotAvailable}
										/>
									</Col>
									<Col md={5}>
										<Form.Control
											type="time"
											value={range.end}
											onChange={(e) =>
												handleTimeChange(day, index, 'end', e.target.value)
											}
											disabled={businessHours[day].isNotAvailable}
										/>
									</Col>
									{businessHours[day].timeRanges.length > 1 &&
										!businessHours[day].isNotAvailable && (
											<Col md={1}>
												<Button
													variant="outline-danger"
													size="sm"
													onClick={() => removeTimeRange(day, index)}>
													<MinusCircle size={16} />
												</Button>
											</Col>
										)}
								</Row>
							))}
							{validationErrors[day] && (
								<Alert variant="danger" className="mt-2">
									{validationErrors[day]}
								</Alert>
							)}
							{!businessHours[day].isNotAvailable && (
								<Button
									variant="outline-primary"
									size="sm"
									onClick={() => addTimeRange(day)}>
									+ Add Time Range
								</Button>
							)}
						</Col>
						<Col md={3} className="mt-2">
							<Form.Check
								type="checkbox"
								label="Not Available"
								disabled={businessHours[day].disable}
								checked={businessHours[day].isNotAvailable}
								onChange={() => toggleClosed(day)}
							/>
						</Col>
					</Row>
				))}

				{submitError && (
					<Alert variant="danger" className="mt-3">
						{submitError}
					</Alert>
				)}
				<div className="text-center mt-4">
					<Button
						variant="primary"
						type="submit"
						disabled={
							isSubmitting ||
							JSON.stringify(originalData) === JSON.stringify(businessHours)
						}>
						{isSubmitting ? 'Updating...' : 'Update'}
					</Button>
				</div>
			</Form>
		</Container>
	)
}

export default AvailableTimeSection
