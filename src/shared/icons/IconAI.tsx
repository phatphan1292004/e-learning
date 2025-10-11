import { ComponentProps } from "react";

const IconAI = (props: ComponentProps<"svg">) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="64" height="64" rx="16" fill="#4F46E5" />
      <g filter="url(#glow)">
        <circle cx="32" cy="32" r="20" fill="#6366F1" opacity="0.6" />
      </g>
      <g>
        <ellipse cx="32" cy="36" rx="15" ry="9" fill="#fff" opacity="0.92" />
        <ellipse cx="32" cy="29" rx="12" ry="7" fill="#E0E7FF" />
        <ellipse cx="32" cy="35" rx="2.5" ry="1.5" fill="#6366F1" />
        <circle cx="26" cy="33" r="1.8" fill="#6366F1" />
        <circle cx="38" cy="33" r="1.8" fill="#6366F1" />
        <rect x="23" y="41" width="18" height="4" rx="2" fill="#6366F1" opacity="0.7" />
        <path
          d="M44 24C44 18 20 18 20 24"
          stroke="#6366F1"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter id="glow" x="8" y="8" width="48" height="48" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default IconAI;