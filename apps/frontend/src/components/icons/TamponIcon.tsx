import React from 'react'

interface TamponIconProps {
    size?: number
    color?: string
    className?: string
}

export default function TamponIcon({ size = 24, color = "currentColor", className }: TamponIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            color={color}
            className={className}
        >
            <path
                d="M4.12967 9.3125H14.1574C14.3716 9.3125 14.5452 9.48609 14.5452 9.70031V12.559C14.5452 12.7733 14.3716 12.9468 14.1574 12.9468H4.12967C3.12506 12.9468 2.3125 12.1343 2.3125 11.1297C2.3125 10.1251 3.12506 9.3125 4.12967 9.3125Z"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
            />
            <path
                d="M14.5469 11.1328H15.9282C16.9882 11.1328 17.8451 11.9934 17.8451 13.0497C17.8451 14.106 18.7057 14.9666 19.762 14.9666C20.8183 14.9666 21.6789 14.106 21.6789 13.0497"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
            />
        </svg>
    )
}
