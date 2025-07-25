export const formatUnderscoresText = (role) => {
	// Input = No_access  // Output = No Access
	return role
		.replace(/_/g, ' ') // Replace underscores with spaces
		.replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
}
