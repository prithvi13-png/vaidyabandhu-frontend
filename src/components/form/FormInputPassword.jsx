import { Controller } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'  // Import icons from lucide-react

const FormInputPassword = ({
	control,
	id,
	label,
	name,
	containerClass,
	placeholder,
	labelClassName,
	className,
	...other
}) => {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<Controller
			control={control}
			defaultValue={''}
			render={({ field, fieldState }) => (
				<Form.Group className={containerClass}>
					{label && <Form.Label className={labelClassName}>{label}</Form.Label>}
					<div className="input-group mb-0">
						<Form.Control
							className={className}
							{...other}
							id={id ?? name}
							{...field}
							type={showPassword ? 'text' : 'password'}
							placeholder={placeholder}
							isInvalid={fieldState.error != null}
						/>
						<div className={`input-group-text input-group-password `}>
							<span onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />} {/* Use Lucide icons */}
							</span>
						</div>
						{fieldState.error?.message && (
							<Form.Control.Feedback type="invalid" className="text-danger">
								{fieldState.error?.message}
							</Form.Control.Feedback>
						)}
					</div>
				</Form.Group>
			)}
			name={name}
		/>
	)
}
export default FormInputPassword
