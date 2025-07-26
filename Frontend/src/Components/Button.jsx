import React from 'react'
import Loader from './Loader/Loader'

const Button = ({ text, handleClick, loading }) => {
    if (loading) return <div className='flex justify-center'><Loader /></div>
    return (
        <button
            type="submit"
            className="w-full cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
            onClick={handleClick}
        >
            {text}
        </button>
    )
}

export default Button
