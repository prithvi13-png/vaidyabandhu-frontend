import { Form } from 'react-bootstrap'
import { memo, useState, useCallback } from 'react'
import { Eye, EyeOff } from 'lucide-react'  // Import Eye and EyeOff from lucide-react
import { isFunction } from '@/common/utiles/utils'

const FormInputPasswordWithoutController = ({
	id,
	label,
	name,
	containerClass,
	placeholder,
	className,
	value,
	onChange,
	errorMessage,
	displayhelp,
	...other
}) => {
	const [showPassword, setShowPassword] = useState(false)

	// Memoize the toggle function to prevent unnecessary re-renders
	const toggleShowPassword = useCallback(() => {
		setShowPassword((prevState) => !prevState)
	}, [])

	// Debounce the onChange handler to avoid excessive state updates
	const handleChange = useCallback(
		(e) => {
			if (isFunction(onChange)) {
				onChange(e)
			}
		},
		[onChange]
	)

	return (
		<Form.Group className={containerClass}>
			{label && <label>{label}</label>}
			<div className="input-group mb-0">
				<Form.Control
					className={className}
					{...other}
					id={id ?? name}
					name={name}
					type={showPassword ? 'text' : 'password'}
					placeholder={placeholder}
					value={value}
					onChange={handleChange} // use the debounced handler
					isInvalid={!!errorMessage}
				/>
				<div className={`input-group-text input-group-password`}>
					<span
						onClick={toggleShowPassword} // use memoized function
						style={{ cursor: 'pointer' }}
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />} {/* Replaced with Lucide icons */}
					</span>
				</div>
				{displayhelp && (
					<Form.Control.Feedback type="invalid" className="text-secondary">
						{displayhelp}
					</Form.Control.Feedback>
				)}
				{errorMessage && (
					<Form.Control.Feedback type="invalid" className="text-danger">
						{errorMessage}
					</Form.Control.Feedback>
				)}
			</div>
		</Form.Group>
	)
}

export default memo(FormInputPasswordWithoutController)
