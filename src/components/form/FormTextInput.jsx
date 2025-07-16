import { Controller } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'  // Import Lucide icons

const FormInput = ({
	control,
	id,
	label,
	name,
	containerClass,
	placeholder,
	labelClassName,
	className,
	type,
	noValidate,
	...other
}) => {
	const [showPassword, setShowPassword] = useState(false)  // state to toggle password visibility

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev)
	}

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={''}
			render={({ field, fieldState }) => (
				<Form.Group className={containerClass}>
					{label && <Form.Label className={labelClassName}>{label}</Form.Label>}
					<div className="input-group mb-0">
						<Form.Control
							className={className}
							id={id ?? name}
							type={showPassword && type === 'password' ? 'text' : type} // Toggle password type
							placeholder={placeholder}
							isInvalid={!noValidate && fieldState.error != null}
							{...other}
							{...field}
						/>
						{/* Password visibility toggle icon */}
						{type === 'password' && (
							<div className="input-group-text" style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />} {/* Using Lucide icons */}
							</div>
						)}
					</div>
					{/* Validation error message */}
					{!noValidate && fieldState.error?.message && (
						<Form.Control.Feedback type="invalid" className="text-danger">
							{fieldState.error?.message}
						</Form.Control.Feedback>
					)}
				</Form.Group>
			)}
		/>
	)
}

export default FormInput
