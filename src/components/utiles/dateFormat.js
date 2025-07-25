import { format } from 'date-fns'

export const formatDate = (isoDate) => {
	const date = new Date(isoDate)
	const options = {
		year: 'numeric',
		month: 'short', // "Nov"
		day: '2-digit', // "21"
		hour: 'numeric',
		minute: '2-digit',
		hour12: true, // Converts to 12-hour format with am/pm
	}

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
	return formattedDate.replace(',', '') // To match the exact format "Nov 21, 2024, 6:47 am"
}

export const formatDateWithoutTime = (isoDate) => {
	const date = new Date(isoDate)
	const options = {
		year: 'numeric',
		month: 'short', // "Nov"
		day: '2-digit',
	}

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
	return formattedDate.replace(',', '') // To match the exact format "Nov 21, 2024, 6:47 am"
}

export const formatTimeFromDate = (isoDate) => {
	const date = new Date(isoDate)
	const options = {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true, // Converts to 12-hour format with am/pm
	}

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
	return formattedDate.replace(',', '') // To match the exact format "Nov 21, 2024, 6:47 am"
}

export const dateFormat = (dat, frmt) => {
	const date = new Date(dat)

	// Format the date to 'YYYY-MM-DD'
	const formattedDate = format(date, frmt || 'yyyy-MM-dd')

	return formattedDate
}

export const getMilliseconds = (dateString) => {
	const date = new Date(dateString);
	return date.getTime();
  };


  export const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth() + 1; // Months are 0-based, so add 1
}