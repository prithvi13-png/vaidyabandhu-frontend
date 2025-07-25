import React, { forwardRef, useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Eye, EyeOff } from "lucide-react"; // Import Lucide icons

const InputOTP = forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput ref={ref} containerClassName={containerClassName} className={className} {...props} />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} style={{ display: "flex", gap: "10px" }} className={className} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = forwardRef(({ index, error, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);

  // Ensure inputOTPContext and slots exist before accessing
  if (!inputOTPContext || !inputOTPContext.slots || !inputOTPContext.slots[index]) {
    return (
      <div
        ref={ref}
        style={{
          width: "48px",
          height: "48px",
          border: `1px solid  ${error ? "red" : "#EBEBEB"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          borderRadius: "12px"
        }}
        {...props}
      >
        _
      </div>
    );
  }

  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "48px",
        height: "48px",
        fontSize: "20px",
        textAlign: "center",
        border: `1px solid ${error ? "red" : isActive ? "#EBEBEB" : "#ccc"}`, // Active state border
        backgroundColor: isActive ? "#CCE5FF" : "#EBEBEB", // Active state background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color 0.3s",
        borderRadius: "12px"
      }}
      {...props}
    >
      {char ?? "_"}
      {hasFakeCaret && (
        <div
          style={{
            position: "absolute",
            width: "2px",
            height: "20px",
            background: "#007bff",
            animation: "blink 1s infinite",
          }}
        />
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = forwardRef((props, ref) => (
  <div ref={ref} role="separator" {...props} />
));
InputOTPSeparator.displayName = "InputOTPSeparator";

// Optional - you can use these icons in any part of your OTP inputs if needed
const OTPIconToggle = ({ show, onClick }) => (
  <span onClick={onClick} style={{ cursor: 'pointer' }}>
    {show ? <EyeOff size={18} /> : <Eye size={18} />} {/* Eye icon toggle */}
  </span>
);

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, OTPIconToggle };
