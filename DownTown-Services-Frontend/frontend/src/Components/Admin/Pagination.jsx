import React from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { api } from '../../axios';
import { useDispatch } from 'react-redux';
import { setUsers } from '../../redux/admin';

function Pagination({role, postsPerPage, totalPages, currentPage, onPageChange }) {

    console.log(totalPages, 'length');
    
    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationNumbers.push(i);
    }

    const handlePrevious = ()=>{
        if (currentPage > 1){
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = ()=>{
        if (currentPage < totalPages){
            onPageChange(currentPage + 1)
        }
    }

  return (
    <div className='w-full flex justify-center p-4'>
        <div className='flex gap-3'>
            {currentPage > 1 && (
            <div className='border w-7 flex items-center justify-center p-1 rounded-sm' onClick={handlePrevious}>
                <FaAngleLeft />
            </div>
            )}
            {paginationNumbers.map((pageNumber) => (
                <div className={`border p-1 rounded-sm w-7 items-center font-semibold flex justify-center cursor-pointer ${currentPage === pageNumber ? 'text-blue-400' : ''}`} onClick={() => {onPageChange(pageNumber)}}>
                    <h3 key={pageNumber} className={currentPage === pageNumber? 'text-blue-400' : ''}>{pageNumber}</h3>
                </div>
            ))}
            {currentPage < totalPages && (
                <div className='border p-1 rounded-sm w-7 items-center flex justify-center' onClick={handleNext}>
                    <FaAngleRight />
                </div>
            )}
        </div>
    </div>
  )
}

export default Pagination
