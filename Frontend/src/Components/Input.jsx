import React from 'react'

const Input = ({ type, placeholder, value, name, onChange }) => {
    return (
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"

            onChange={onChange}
        />
    )
}

export default Input
