import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Button, Overlay, Popover, Card } from 'react-bootstrap'
import { Calendar as CalendarIcon, X as XIcon, RotateCcw as ResetIcon } from 'lucide-react'

import PresetsSidebar from './PresetSidebar'
import CalendarMonth from './CalendarMonth'
import DateRangeFooter from './DateRangeFooter'

import {
	normalizeDate,
	getDateRange,
	getPresetIdFromDates,
	getPresetLabel,
	formatDate,
} from './utils'
import { MONTHS, SHORT_MONTHS } from './constants'

const DateRangeFilter2 = ({
	onFilter = () => {},
	onClear = () => {},
	date = null,
	hideClear = false,
	hidePreset = false,
	showReset = false,
}) => {
	const [showPopover, setShowPopover] = useState(false)

	const [appliedDates, setAppliedDates] = useState({
		start: null,
		end: null,
	})

	const [tempDates, setTempDates] = useState({
		start: null,
		end: null,
	})

	const [displayText, setDisplayText] = useState('Select start & end date')
	const [selectedPreset, setSelectedPreset] = useState(null)
	const [isMobile, setIsMobile] = useState(false)
	const targetRef = useRef(null)

	useEffect(() => {
		const checkIfMobile = () => setIsMobile(window.innerWidth <= 768)
		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)
		return () => window.removeEventListener('resize', checkIfMobile)
	}, [])

	useEffect(() => {
		if (date?.start && date?.end) {
			setAppliedDates({ start: date.start, end: date.end })
			setTempDates({ start: date.start, end: date.end })
			setSelectedPreset(getPresetIdFromDates(date.start, date.end))
		} else {
			setAppliedDates({ start: null, end: null })
			setTempDates({ start: null, end: null })
			setSelectedPreset(null)
			setDisplayText('Select start & end date')
		}
	}, [date])

	useEffect(() => {
		const { start, end } = appliedDates
		if (start && end) setDisplayText(getPresetLabel(start, end))
		else if (start) setDisplayText(`From: ${formatDate(start)}`)
		else if (end) setDisplayText(`Until: ${formatDate(end)}`)
		else setDisplayText('Select start & end date')
	}, [appliedDates])

	const handleClear = useCallback(
		(e) => {
			e?.stopPropagation()
			setAppliedDates({ start: null, end: null })
			setTempDates({ start: null, end: null })
			setSelectedPreset(null)
			setDisplayText('Select start & end date')
			onClear()
		},
		[onClear]
	)

	const handleApply = useCallback(() => {
		if (!tempDates.start || !tempDates.end) return
		setAppliedDates({ start: tempDates.start, end: tempDates.end })
		setShowPopover(false)
		onFilter({ start: tempDates.start, end: tempDates.end })
	}, [onFilter, tempDates])

	const handleCancel = useCallback(() => setShowPopover(false), [])

	const handlePresetClick = useCallback(
		(presetId) => {
			const { start, end } = getDateRange(presetId)
			if (!start || !end) return
			setTempDates({ start, end })
			setAppliedDates({ start, end })
			setSelectedPreset(presetId)
			onFilter({ start, end })
			setShowPopover(false)
		},
		[onFilter]
	)

	const [currentStartMonth, setCurrentStartMonth] = useState(() => {
		const now = new Date()
		return new Date(now.getFullYear(), now.getMonth(), 1)
	})
	const [currentEndMonth, setCurrentEndMonth] = useState(() => {
		const now = new Date()
		return new Date(now.getFullYear(), now.getMonth() + 1, 1)
	})

	const prevStartMonth = useCallback(() => {
		setCurrentStartMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
		)
	}, [])
	const nextStartMonth = useCallback(() => {
		setCurrentStartMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
		)
	}, [])

	const prevEndMonth = useCallback(() => {
		setCurrentEndMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
		)
	}, [])
	const nextEndMonth = useCallback(() => {
		setCurrentEndMonth(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
		)
	}, [])

	const handleStartYearChange = useCallback((year) => {
		setCurrentStartMonth((prev) => new Date(year, prev.getMonth(), 1))
	}, [])
	const handleEndYearChange = useCallback((year) => {
		setCurrentEndMonth((prev) => new Date(year, prev.getMonth(), 1))
	}, [])
	const handleStartMonthChange = useCallback((monthIndex) => {
		setCurrentStartMonth((prev) => new Date(prev.getFullYear(), monthIndex, 1))
	}, [])
	const handleEndMonthChange = useCallback((monthIndex) => {
		setCurrentEndMonth((prev) => new Date(prev.getFullYear(), monthIndex, 1))
	}, [])

	const isToday = useCallback((date) => {
		const today = new Date()
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		)
	}, [])

	const isDateInRange = useCallback(
		(date) => {
			if (!tempDates.start || !tempDates.end) return false
			const time = date.getTime()
			const startTime = normalizeDate(tempDates.start).getTime()
			const endTime = normalizeDate(tempDates.end, true).getTime()
			return time >= startTime && time <= endTime
		},
		[tempDates]
	)

	const generateCalendarDays = useCallback(
		(calendarDate) => {
			const year = calendarDate.getFullYear()
			const month = calendarDate.getMonth()
			const daysInMonth = new Date(year, month + 1, 0).getDate()
			const firstDayOfMonth = new Date(year, month, 1).getDay()
			const prevMonth = month === 0 ? 11 : month - 1
			const prevYear = month === 0 ? year - 1 : year
			const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()
			const days = []

			for (let i = firstDayOfMonth - 1; i >= 0; i--) {
				const day = daysInPrevMonth - i
				const d = new Date(prevYear, prevMonth, day)
				days.push({
					date: d,
					day,
					isCurrentMonth: false,
					isSelected: isDateInRange(d),
					isStart: tempDates.start && d.toDateString() === tempDates.start.toDateString(),
					isEnd: tempDates.end && d.toDateString() === tempDates.end.toDateString(),
				})
			}

			for (let i = 1; i <= daysInMonth; i++) {
				const d = new Date(year, month, i)
				days.push({
					date: d,
					day: i,
					isCurrentMonth: true,
					isSelected: isDateInRange(d),
					isToday: isToday(d),
					isStart: tempDates.start && d.toDateString() === tempDates.start.toDateString(),
					isEnd: tempDates.end && d.toDateString() === tempDates.end.toDateString(),
				})
			}

			const nextMonth = month === 11 ? 0 : month + 1
			const nextYear = month === 11 ? year + 1 : year
			const totalAdded = firstDayOfMonth + daysInMonth
			const remaining = 42 - totalAdded

			for (let i = 1; i <= remaining; i++) {
				const d = new Date(nextYear, nextMonth, i)
				days.push({
					date: d,
					day: i,
					isCurrentMonth: false,
					isSelected: isDateInRange(d),
					isStart: tempDates.start && d.toDateString() === tempDates.start.toDateString(),
					isEnd: tempDates.end && d.toDateString() === tempDates.end.toDateString(),
				})
			}

			return days
		},
		[isDateInRange, isToday, tempDates]
	)

	const startCalendarDays = useMemo(
		() => generateCalendarDays(currentStartMonth),
		[currentStartMonth, generateCalendarDays]
	)
	const endCalendarDays = useMemo(
		() => generateCalendarDays(currentEndMonth),
		[currentEndMonth, generateCalendarDays]
	)

	const handleDateClick = useCallback(
		(d) => {
			setSelectedPreset(null)
			const { start, end } = tempDates
			if (!start || (start && end) || d < start) {
				setTempDates({ start: new Date(d), end: null })
			} else {
				setTempDates({ start, end: new Date(d) })
			}
		},
		[tempDates]
	)

	const yearOptions = useMemo(() => {
		const currentYear = new Date().getFullYear()
		const years = []
		for (let i = currentYear - 10; i <= currentYear + 10; i++) years.push(i)
		return years
	}, [])

	const startMonthDisplay = useMemo(
		() => ({
			monthName: SHORT_MONTHS[currentStartMonth.getMonth()],
			fullMonthName: MONTHS[currentStartMonth.getMonth()],
			fullYear: currentStartMonth.getFullYear(),
			monthIndex: currentStartMonth.getMonth(),
		}),
		[currentStartMonth]
	)
	const endMonthDisplay = useMemo(
		() => ({
			monthName: SHORT_MONTHS[currentEndMonth.getMonth()],
			fullMonthName: MONTHS[currentEndMonth.getMonth()],
			fullYear: currentEndMonth.getFullYear(),
			monthIndex: currentEndMonth.getMonth(),
		}),
		[currentEndMonth]
	)

	return (
		<div style={{ position: 'relative', minWidth: 120 }}>
			<Card
				ref={targetRef}
				onClick={() => setShowPopover((v) => !v)}
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '8px 10px',
					cursor: 'pointer',
					userSelect: 'none',
					flexDirection: 'row',
					marginBottom: 0
				}}
				className="hover-effect">
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<CalendarIcon
						size={16}
						style={{ marginRight: 6, color: '#6c757d' }}
					/>
					<span
						style={{
							fontSize: 14,
							color:
								!appliedDates.start && !appliedDates.end
									? '#98a6ad'
									: '#495057',
							fontWeight: appliedDates.start || appliedDates.end ? 500 : 400,
						}}>
						{displayText}
					</span>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{!hideClear && (appliedDates.start || appliedDates.end) && (
						<Button
							variant="link"
							size="sm"
							onClick={(e) => {
								e.stopPropagation()
								handleClear(e)
							}}
							style={{ padding: 0, color: '#6c757d', textDecoration: 'none' }}>
							<XIcon size={14} />
						</Button>
					)}
					{showReset && appliedDates.start && appliedDates.end && (
						<Button
							variant="link"
							size="sm"
							onClick={(e) => {
								e.stopPropagation()
								handleClear(e)
							}}
							style={{ padding: 0, color: '#6c757d', textDecoration: 'none' }}>
							<ResetIcon size={16} />
						</Button>
					)}
					<span style={{ marginLeft: 8, color: '#adb5bd', fontSize: 10 }}>
						▼
					</span>
				</div>
			</Card>
			<Overlay
				show={showPopover}
				target={targetRef.current}
				placement="bottom"
				container={document.body}
				rootClose
				onHide={() => setShowPopover(false)}>
				<Popover
					id="date-range-popover"
					style={{
						width: isMobile ? '90vw' : 700,
						maxWidth: isMobile ? '90vw' : 700,
						height: isMobile ? 'auto' : 358,
						border: 'none',
						borderRadius: 12,
						boxShadow: '0 6px 30px rgba(0,0,0,0.15)',
						zIndex: 9999
					}}>
					<Card
						style={{ borderRadius: 12, marginBottom: 0, overflow: 'hidden' }}>
						<div
							className="date-range-wrapper"
							style={{
								display: 'flex',
								flexDirection: isMobile ? 'column' : 'row',
								width: '100%',
							}}>
							{!hidePreset && !isMobile && (
								<PresetsSidebar
									selectedPreset={selectedPreset}
									onSelectPreset={handlePresetClick}
									style={{
										width: 140,
										borderRight: '1px solid #eef2f7',
										backgroundColor: '#f8f9fa',
										overflowY: 'auto',
										padding: '10px 5px 0',
									}}
								/>
							)}
							<div
								className="calendars-container"
								style={{
									display: 'flex',
									flexDirection: isMobile ? 'column' : 'row',
									flex: 1,
									padding: '15px',
									gap: isMobile ? 20 : 30,
								}}>
								<div style={{ flex: 1, minWidth: isMobile ? '100%' : 'auto' }}>
									<div
										className="calendar-header"
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginBottom: 8,
										}}>
										<Button
											variant="outline-secondary"
											size="sm"
											onClick={prevStartMonth}
											style={{
												borderRadius: '50%',
												padding: 4,
												width: 28,
												height: 28,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}>
											<CalendarIcon
												size={12}
												style={{ transform: 'rotate(90deg)' }}
											/>
										</Button>
										<div style={{ display: 'flex', gap: 8 }}>
											<select
												value={startMonthDisplay.monthIndex}
												onChange={(e) =>
													handleStartMonthChange(parseInt(e.target.value))
												}
												style={{
													border: '1px solid #dee2e6',
													borderRadius: 4,
													padding: '2px 4px',
													fontSize: 12,
													backgroundColor: 'white',
												}}>
												{MONTHS.map((month, index) => (
													<option key={index} value={index}>
														{month}
													</option>
												))}
											</select>
											<select
												value={startMonthDisplay.fullYear}
												onChange={(e) =>
													handleStartYearChange(parseInt(e.target.value))
												}
												style={{
													border: '1px solid #dee2e6',
													borderRadius: 4,
													padding: '2px 4px',
													fontSize: 12,
													backgroundColor: 'white',
												}}>
												{yearOptions.map((year) => (
													<option key={year} value={year}>
														{year}
													</option>
												))}
											</select>
										</div>
										<Button
											variant="outline-secondary"
											size="sm"
											onClick={nextStartMonth}
											style={{
												borderRadius: '50%',
												padding: 4,
												width: 28,
												height: 28,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}>
											<CalendarIcon
												size={12}
												style={{ transform: 'rotate(-90deg)' }}
											/>
										</Button>
									</div>
									<CalendarMonth
										calendarDays={startCalendarDays}
										onDateClick={handleDateClick}
									/>
								</div>
								<div style={{ flex: 1, minWidth: isMobile ? '100%' : 'auto' }}>
									<div
										className="calendar-header"
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginBottom: 8,
										}}>
										<Button
											variant="outline-secondary"
											size="sm"
											onClick={prevEndMonth}
											style={{
												borderRadius: '50%',
												padding: 4,
												width: 28,
												height: 28,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}>
											<CalendarIcon
												size={12}
												style={{ transform: 'rotate(90deg)' }}
											/>
										</Button>
										<div style={{ display: 'flex', gap: 8 }}>
											<select
												value={endMonthDisplay.monthIndex}
												onChange={(e) =>
													handleEndMonthChange(parseInt(e.target.value))
												}
												style={{
													border: '1px solid #dee2e6',
													borderRadius: 4,
													padding: '2px 4px',
													fontSize: 12,
													backgroundColor: 'white',
												}}>
												{MONTHS.map((month, index) => (
													<option key={index} value={index}>
														{month}
													</option>
												))}
											</select>
											<select
												value={endMonthDisplay.fullYear}
												onChange={(e) =>
													handleEndYearChange(parseInt(e.target.value))
												}
												style={{
													border: '1px solid #dee2e6',
													borderRadius: 4,
													padding: '2px 4px',
													fontSize: 12,
													backgroundColor: 'white',
												}}>
												{yearOptions.map((year) => (
													<option key={year} value={year}>
														{year}
													</option>
												))}
											</select>
										</div>
										<Button
											variant="outline-secondary"
											size="sm"
											onClick={nextEndMonth}
											style={{
												borderRadius: '50%',
												padding: 4,
												width: 28,
												height: 28,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}>
											<CalendarIcon
												size={12}
												style={{ transform: 'rotate(-90deg)' }}
											/>
										</Button>
									</div>
									<CalendarMonth
										calendarDays={endCalendarDays}
										onDateClick={handleDateClick}
									/>
								</div>
							</div>
						</div>
						<DateRangeFooter
							tempDates={tempDates}
							onClearStart={() =>
								setTempDates((prev) => ({ ...prev, start: null }))
							}
							onClearEnd={() =>
								setTempDates((prev) => ({ ...prev, end: null }))
							}
							onCancel={handleCancel}
							onApply={handleApply}
							disableApply={!tempDates.start || !tempDates.end}
						/>
					</Card>
				</Popover>
			</Overlay>
		</div>
	)
}

export default DateRangeFilter2
