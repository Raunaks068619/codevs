/* eslint-disable react/jsx-key */
import React, { useState } from 'react'

const Dropdown = ({ selectedStyle , setSelectedStyle}: { selectedStyle: string, setSelectedStyle:any }) => {
  const [showModal, setShowModal] = useState(false);
  const setModal = (truth:boolean) =>{
      setShowModal(truth)
  }

  return (
    <div className="relative inline-block text-left my-2">
    <div>
        <button
          onClick={() => {
            setModal(!showModal);
          }}
          type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
        {selectedStyle || 'CSS Library'}
        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
    </div>

      {showModal && <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
        <div className="py-1" role="none">
          <a onClick={() => {
            setSelectedStyle('tailwind')
            setModal(false)
          }} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={0} id="menu-item-0">tailwind CSS</a>
          <a onClick={() => {
            setSelectedStyle('mui')
            setModal(false)
          }} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={1} id="menu-item-1">MUI</a>
          <a onClick={() => {
            setSelectedStyle('vanilla')
            setModal(false)
          }} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={1} id="menu-item-1">Vanilla</a>
        </div>
      </div>}
  </div>
  

  )
}

export default Dropdown