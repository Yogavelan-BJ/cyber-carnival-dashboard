import React, { useEffect } from "react";
import { useAppContext } from "./context";
import { useParams } from "react-router-dom";

function Event() {
  const { data, eventFees } = useAppContext();
  const { id } = useParams();
  const registrations = data.allData?.filter(
    (event) => event.collection === id
  )[0].documents;
  console.log(registrations);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-gray-900 h-48 w-48 relative">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 h-10 w-10 "></div>
      </div>
    </div>
  );
}

export default Event;
