export const getStatusBadgeVariant = (status) => {
	switch (status?.toLowerCase()) {
		case 'completed':
		case 'approved':
		case 'success':
		case 'paid':
			return 'success'
		case 'pending':
		case 'in progress':
			return 'primary'
		case 'failed':
		case 'error':
			return 'danger'
		case 'cancelled':
		case 'rejected':
			return 'secondary'
		default:
			return 'primary'
	}
}
