"use client"
import WinHolidayModal from "@component/modals/WinHolidayModal";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Table = ({ winHolidayData,setIsTrue }) => {
  const [showModal, setShowModal] = useState(false);
  const [rowDataID, setRowDataId] = useState();

  

  const handleShowModal = (id) => {
    setShowModal(true);
    setRowDataId(id)
  }


  const rowData = winHolidayData.find(item => item._id === rowDataID)
  const winnerName = rowData?.applied_users.find((item)=>item?.winner === true)

  console.log("winnerName",winnerName,rowData)

  return (
    <div className="table-responsive">
      <table className="table align-middle theme-table mb-0 bg-white">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Competition</th>
            <th>Holiday Date</th>
            <th>Created At</th>
            <th>Applied</th>
            <th>Winner</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {winHolidayData?.map((item, index) => {
            return (
              <tr>
                <td>{item?.title}</td>
                <td>{moment(item?.competitionclosure).format("DD-MM-YYYY")}</td>
                <td> {moment(item?.dateFrom).format("DD-MM-YYYY")}</td>
                <td>{moment(item?.dateTo).format("DD-MM-YYYY")}</td>
                <td>{item?.applied_users.length > 0 ? item?.applied_users.length + 1 : "0"}</td>
                <td>
                  <div className="declared-status">
                    {/* {item?.resultDeclared ? winnerName?.first_name + " " +  winnerName?.last_name : "Not Declared"} */}
                    {item?.resultDeclared ? "Declared" : "Not Declared"}
                    </div></td>
                <td>
                  <div className="item-status"> {item?.status}</div>
                </td>
                <td className="text-center">
                  <button type="button" className="" onClick={() => handleShowModal(item?._id)}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="cursor-pointer h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>
                  </button>
                </td>
              </tr>
            )
          })}
          {showModal && (<WinHolidayModal rowData={rowData} setShowModal={setShowModal} setIsTrue={setIsTrue}/>)}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
