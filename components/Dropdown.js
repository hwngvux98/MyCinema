import { useState, useEffect, useRef } from 'react'

export default function Dropdown({ options, handleClick }) {
  const [open, setOpen] = useState(false)
  const [selectedOptionValue, setSelectedOptionValue] = useState('Season 1')

  const onSelectOption = value => {
    setSelectedOptionValue(value.name)
    handleClick(value.season_number)
  }

  let menuRef = useRef()

  useEffect(() => {
    let handler = e => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false)
        console.log(menuRef.current)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <div className='App'>
      <div className='w-48' ref={menuRef}>
        <div className=''>
          <button
            onClick={() => {
              setOpen(!open)
            }}
            className='w-48 justify-between rounded-md border-2 border-white bg-white px-2 py-2 text-gray-700 shadow '>
            <span className='select-none'>{selectedOptionValue}</span>
          </button>
        </div>

        {open ? (
          <div className='absolute z-20 mt-2 w-48 rounded-lg bg-white py-2 shadow-xl'>
            <ul>
              {options.map((option, index) => (
                <li
                  onClick={() => {
                    onSelectOption(option), setOpen(!open)
                  }}
                  key={option.id}
                  className='block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white'>
                  <a href='#' className='block text-sm'>
                    {option.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
