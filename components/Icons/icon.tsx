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