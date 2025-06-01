"use client";
import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/minimal.css';

function Pagination({ setCurrentPage, totalPages, currentPage }) {
  return (
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage} 
      previousLabel="Previous" // Text for Previous button
      nextLabel="Next" // Text for Next button
      renderNav={true} 
    />
  );
}

export default Pagination;
