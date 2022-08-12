import React from "react"

const Header = () => {
  return (
    <>
      <div className='flex justify-center mb-1'>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <div className='bg-white m-1 p-2 border border-gray-300 '>{key}</div>
        ))}
      </div>
      <div className='flex justify-center mb-1'>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <div className='bg-white m-1 p-2 border border-gray-300 '>{key}</div>
        ))}
      </div>
      <div className='flex justify-center mb-1'>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <div className='bg-white m-1 p-2 border border-gray-300 '>{key}</div>
        ))}
      </div>
    </>
  )
}

export default Header
