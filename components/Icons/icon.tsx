import { IconType } from "react-icons";

// BullMQ — hexagon shape with "B" lettermark (matches their actual brand)
export const BullMQIcon: IconType = ({ size = 24, color = "currentColor", style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={style as React.CSSProperties}
    {...props}
  >
    {/* Hexagon outline */}
    <path
      d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
      stroke={color as string}
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
    {/* B lettermark */}
    <path
      d="M9.5 8H13C14.1 8 15 8.9 15 10C15 10.6 14.7 11.1 14.3 11.5C14.8 11.8 15.2 12.4 15.2 13.1C15.2 14.2 14.3 15 13.1 15H9.5V8Z"
      fill={color as string}
    />
    <path
      d="M11 9.5V11H12.8C13.2 11 13.5 10.7 13.5 10.3C13.5 9.8 13.2 9.5 12.8 9.5H11Z"
      fill="none"
      stroke="none"
    />
    {/* cleaner B shape */}
    <path
      d="M10.5 9H12.8C13.5 9 14 9.45 14 10.1C14 10.55 13.75 10.9 13.35 11.1C13.85 11.28 14.2 11.7 14.2 12.25C14.2 13.05 13.6 13.5 12.75 13.5H10.5V9Z"
      fill={color as string}
      opacity="0.15"
    />
    <path
      d="M10.5 9H12.8C13.5 9 14 9.45 14 10.1C14 10.55 13.75 10.9 13.35 11.1C13.85 11.28 14.2 11.7 14.2 12.25C14.2 13.05 13.6 13.5 12.75 13.5H10.5V9Z"
      stroke={color as string}
      strokeWidth="1.1"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Inngest — lightning bolt inside rounded rect (matches their actual brand feel)
export const InngestIcon: IconType = ({ size = 24, color = "currentColor", style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={style as React.CSSProperties}
    {...props}
  >
    {/* Rounded rect background outline */}
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      stroke={color as string}
      strokeWidth="1.5"
      fill="none"
    />
    {/* Lightning bolt — Inngest's actual icon shape */}
    <path
      d="M13.5 5L8 13H12.5L10.5 19L17 11H12.5L13.5 5Z"
      fill={color as string}
    />
  </svg>
);

// NgrokIcon
export const NgrokIcon: IconType = ({ size = 24, color = "currentColor", style, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color, ...style }}
    {...props}
  >
    {/* Background Badge (optional, remove path if you only want the 'n' symbol) */}
    <rect width="24" height="24" rx="4" fill="#1f1f23" />
    
    {/* Exact Lowercase 'n' Icon Path */}
    <path
      d="M7.5 16.5V7.5H9.7V9.1C10.2 8.1 11.2 7.5 12.5 7.5C14.7 7.5 15.5 8.9 15.5 11.2V16.5H13.3V11.5C13.3 10.1 12.8 9.3 11.7 9.3C10.5 9.3 9.7 10.2 9.7 11.7V16.5H7.5Z"
      fill={color}
    />
  </svg>
);

// ZustandIcon
export const ZustandIcon: IconType = ({ size = 24, color = "currentColor", style, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color, ...style }}
    {...props}
  >
    <path
      d="M4.5 4.5C3.67 4.5 3 5.17 3 6V8C3 8.83 3.67 9.5 4.5 9.5H5V14.5C5 15.33 5.67 16 6.5 16H8V18.5C8 19.33 8.67 20 9.5 20H11V16H13V20H14.5C15.33 20 16 19.33 16 18.5V16H17.5C18.33 16 19 15.33 19 14.5V9.5H19.5C20.33 9.5 21 8.83 21 8V6C21 5.17 20.33 4.5 19.5 4.5H18C17.17 4.5 16.5 5.17 16.5 6V7.5H7.5V6C7.5 5.17 6.83 4.5 6 4.5H4.5ZM8.5 10.5C9.05 10.5 9.5 10.95 9.5 11.5C9.5 12.05 9.05 12.5 8.5 12.5C7.95 12.5 7.5 12.05 7.5 11.5C7.5 10.95 7.95 10.5 8.5 10.5ZM15.5 10.5C16.05 10.5 16.5 10.95 16.5 11.5C16.5 12.05 16.05 12.5 15.5 12.5C14.95 12.5 14.5 12.05 14.5 11.5C14.5 10.95 14.95 10.5 15.5 10.5Z"
      fill="currentColor"
    />
  </svg>
);

//TanStack Logo Icon 
export const TanStackIcon: IconType = ({ size = 24, color = "currentColor", style, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color, ...style }}
    {...props}
  >
    {/* Outer Circle */}
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
    
    {/* Palm Tree Leaf / Island Shape */}
    <path
      d="M11 15.5C10 13 8 11.5 6 11C8.5 11 11 9 11.5 7.5C12.5 9 15 10 16.5 10C14.5 11.5 13.5 13.5 13 15.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Chair / Lounge on Beach */}
    <path
      d="M10 16.5L12.5 12.5L15.5 15.5L11.5 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Waves */}
    <path
      d="M6.5 17.5C8 16.8 10 16.8 11.5 17.5C13 18.2 15 18.2 16.5 17.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);
