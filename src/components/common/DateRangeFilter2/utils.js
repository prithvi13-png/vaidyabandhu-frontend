import {
	subDays,
	startOfWeek,
	startOfMonth,
	endOfMonth,
	subMonths,
	startOfYear,
	endOfYear,
	subYears,
  } from 'date-fns'
import { PRESETS } from './constants'
  
  // ------ DATE UTILS ------
  export const normalizeDate = (date, endOfDay = false) => {
	if (!date) return null
	const d = new Date(date)
	if (endOfDay) d.setHours(23, 59, 59, 999)
	else d.setHours(0, 0, 0, 0)
	return d
  }
  
  export const formatDate = (date) => {
	if (!date) return ''
	const d = date.getDate().toString().padStart(2, '0')
	const m = (date.getMonth() + 1).toString().padStart(2, '0')
	const y = date.getFullYear()
	return `${d}/${m}/${y}`
  }
  
  // Main logic for each presetId
  export const getDateRange = (presetId) => {
	const today = new Date()
	const todayStart = normalizeDate(today)
	const todayEnd = normalizeDate(today, true)
  
	switch (presetId) {
	  case 'today':
		return { start: todayStart, end: todayEnd }
	  case 'yesterday': {
		const yesterday = subDays(todayStart, 1)
		return { start: yesterday, end: normalizeDate(yesterday, true) }
	  }
	  case 'thisWeek': {
		const start = startOfWeek(today, { weekStartsOn: 1 })
		return { start, end: todayEnd }
	  }
	  case 'lastWeek': {
		const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 })
		const start = subDays(thisWeekStart, 7)
		const end = subDays(thisWeekStart, 1)
		return { start, end: normalizeDate(end, true) }
	  }
	  case 'last7':
		return { start: subDays(todayStart, 6), end: todayEnd }
	  case 'next7': {
		// Next 7 days including today
		const start = todayStart
		const end = normalizeDate(subDays(todayStart, -6), true) // add 6 days to today
		return { start, end }
	  }
	  case 'last14':
		return { start: subDays(todayStart, 13), end: todayEnd }
	  case 'last30':
		return { start: subDays(todayStart, 29), end: todayEnd }
	  case 'thisMonth': {
		const start = startOfMonth(today)
		return { start, end: todayEnd }
	  }
	  case 'lastMonth': {
		const start = startOfMonth(subMonths(today, 1))
		const end = endOfMonth(subMonths(today, 1))
		return { start, end: normalizeDate(end, true) }
	  }
	  case 'last6Months': {
		const startOfThisMonth = startOfMonth(today)
		const start = subMonths(startOfThisMonth, 6)
		const end = subDays(startOfThisMonth, 1)
		return { start, end: normalizeDate(end, true) }
	  }
	  case 'this6Months': {
		const month = today.getMonth()
		if (month < 6) {
		  const start = new Date(today.getFullYear(), 0, 1)
		  const end = new Date(today.getFullYear(), 5, 30, 23, 59, 59, 999)
		  return { start, end }
		} else {
		  const start = new Date(today.getFullYear(), 6, 1)
		  const end = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999)
		  return { start, end }
		}
	  }
	  case 'thisYear': {
		const start = startOfYear(today)
		return { start, end: todayEnd }
	  }
	  case 'lastYear': {
		const start = startOfYear(subYears(today, 1))
		const end = endOfYear(subYears(today, 1))
		return { start, end: normalizeDate(end, true) }
	  }
	  default:
		return { start: null, end: null }
	}
  }
  
  // Recognize the preset for a given custom range
  export const getPresetIdFromDates = (start, end) => {
	if (!start || !end) return null
  
	const startN = normalizeDate(start)
	const endN = normalizeDate(end, true)
	const today = new Date()
	const todayStart = normalizeDate(today)
	const todayEnd = normalizeDate(today, true)
  
	const equals = (a, b) => a.getTime() === b.getTime()
  
	if (equals(startN, todayStart) && equals(endN, todayEnd)) return 'today'
  
	const yesterdayStart = normalizeDate(subDays(todayStart, 1))
	const yesterdayEnd = normalizeDate(subDays(todayStart, 1), true)
	if (equals(startN, yesterdayStart) && equals(endN, yesterdayEnd)) return 'yesterday'
  
	if (
	  equals(startN, normalizeDate(subDays(todayStart, 6))) &&
	  equals(endN, todayEnd)
	)
	  return 'last7'
  
	// Next 7 days: todayStart to todayStart + 6 days (end of day)
	if (
	  equals(startN, todayStart) &&
	  equals(endN, normalizeDate(subDays(todayStart, -6), true))
	)
	  return 'next7'
  
	if (
	  equals(startN, normalizeDate(subDays(todayStart, 13))) &&
	  equals(endN, todayEnd)
	)
	  return 'last14'
  
	if (
	  equals(startN, normalizeDate(subDays(todayStart, 29))) &&
	  equals(endN, todayEnd)
	)
	  return 'last30'
  
	if (
	  equals(startN, normalizeDate(startOfMonth(today))) &&
	  equals(endN, todayEnd)
	)
	  return 'thisMonth'
  
	if (
	  equals(startN, normalizeDate(startOfMonth(subMonths(today, 1)))) &&
	  equals(endN, normalizeDate(endOfMonth(subMonths(today, 1)), true))
	)
	  return 'lastMonth'
  
	if (
	  equals(startN, normalizeDate(startOfWeek(today, { weekStartsOn: 1 }))) &&
	  equals(endN, todayEnd)
	)
	  return 'thisWeek'
  
	const thisWeekStart = normalizeDate(startOfWeek(today, { weekStartsOn: 1 }))
	if (
	  equals(startN, normalizeDate(subDays(thisWeekStart, 7))) &&
	  equals(endN, normalizeDate(subDays(thisWeekStart, 1), true))
	)
	  return 'lastWeek'
  
	const startOfThisMonth = normalizeDate(startOfMonth(today))
	const sixMonthsAgo = normalizeDate(subMonths(startOfThisMonth, 6))
	const endOfLastMonth = normalizeDate(subDays(startOfThisMonth, 1), true)
	if (equals(startN, sixMonthsAgo) && equals(endN, endOfLastMonth))
	  return 'last6Months'
  
	const month = today.getMonth()
	let sixMonthStart, sixMonthEnd
	if (month < 6) {
	  sixMonthStart = normalizeDate(new Date(today.getFullYear(), 0, 1))
	  sixMonthEnd = normalizeDate(new Date(today.getFullYear(), 5, 30), true)
	} else {
	  sixMonthStart = normalizeDate(new Date(today.getFullYear(), 6, 1))
	  sixMonthEnd = normalizeDate(new Date(today.getFullYear(), 11, 31), true)
	}
	if (equals(startN, sixMonthStart) && equals(endN, sixMonthEnd))
	  return 'this6Months'
  
	if (
	  equals(startN, normalizeDate(startOfYear(today))) &&
	  equals(endN, todayEnd)
	)
	  return 'thisYear'
  
	if (
	  equals(startN, normalizeDate(startOfYear(subYears(today, 1)))) &&
	  equals(endN, normalizeDate(endOfYear(subYears(today, 1)), true))
	)
	  return 'lastYear'
  
	return null
  }
  
  // Returns display label for a given range
  export const getPresetLabel = (start, end) => {
	if (!start || !end) return 'Select start & end date'
	const presetId = getPresetIdFromDates(start, end)
	if (presetId) {
	  const preset = PRESETS.find((p) => p.id === presetId)
	  return preset ? preset.label : `${formatDate(start)} - ${formatDate(end)}`
	}
	return `${formatDate(start)} - ${formatDate(end)}`
  }
  