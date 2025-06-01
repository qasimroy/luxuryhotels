import StickyHeadTable from "@component/helper/MuiTable";
import moment from "moment";
import React from "react";

function WinHolidayModal({ rowData, setShowModal,setIsTrue }) {
  console.log("rowData",rowData)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white w-3/4 rounded-lg p-4 shadow-lg overflow-y-auto max-h-[80vh]" style={{height:"80%",width:"80%"}}>
        <div className="flex justify-between items-center mb-2 py-1 border-b border-golden">
          <h2 className="text-xl font-bold text-golden">Holiday Details</h2>
          <button className="text-golden font-bold text-lg" onClick={()=>setShowModal(false)}>×</button>
        </div>
        <div className="w-full flex justify-center flex-col items-center">
          <p className="text-md p-1 bg-golden w-full text-center text-white ">
            {rowData?.hotelId?.hotel_name} ({rowData?.hotelId?.country?.country})
          </p>
          <p className="text-sm w-full text-center font-bold my-2">
           {rowData?.title}
          </p>
          {/* <p className="text-xs w-full text-center">
            Magnis nascetur quis elit pharetra est habitant torquent phasellus sem enim...
          </p> */}
          <div className="w-full grid grid-cols-2 mt-2 gap-2">
            <p className="text-xs">
              <strong className="text-golden mr-1">Date from :</strong>{moment(rowData?.dateFrom).format("MMMM D, YYYY")}
            </p>
            <p className="text-xs">
              <strong className="text-golden mr-1">Date to :</strong>{moment(rowData?.dateTo).format("MMMM D, YYYY")}
            </p>
            <p className="text-xs">
              <strong className="text-golden mr-1">Closure Date:</strong>{moment(rowData?.competitionclosure).format("MMMM D, YYYY")}
            </p>
            <p className="text-xs">
              <strong className="text-golden mr-1">Attendant:</strong>{rowData?.adult_attendees} Adult and {rowData?.children_attendees} children
            </p>
            <p className="text-xs">
              <strong className="text-golden mr-1">Number of users applied:</strong> {rowData?.applied_users?.length}
            </p>
            <p className="text-xs">
              <strong className="text-golden mr-1">Status:</strong>{rowData?.status}
            </p>
          </div>
        </div>
        <div className="w-full">
          <p className="text-lg font-semibold my-3 text-golden border-b border-golden">Applied users</p>
          <StickyHeadTable applied_users={rowData?.applied_users} setIsTrue={setIsTrue} setShowModal={setShowModal}/>
        </div>
        <button className="w-100 save-btn" onClick={()=>setShowModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
}

export default WinHolidayModal;
