import React, { useEffect, useState } from "react";
import { useAppContext } from "./context";
import { useParams } from "react-router-dom";

function Event() {
  const { data, eventFees } = useAppContext();
  const { id } = useParams();
  const [currentOpen, setCurrentOpen] = useState(null);
  const registrations = data.allData?.filter(
    (event) => event.collection === id
  )[0].documents;
  let revenue = 0;
  for (let i = 0; i < registrations?.length; i++) {
    revenue += eventFees[id];
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-4xl font-mono font-bold my-4">{id}</h1>
      <div>
        <h1 className="text-3xl font-mono">
          Registrations: {registrations?.length}
        </h1>
        <h1 className="text-3xl font-mono">Revenue : Rs.{revenue} </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {registrations?.map((row, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full p-4"
          >
            <>
              <div className="flex w-full border-2 border-black p-4 my-2">
                <h1 className="text-xl font-mono w-1/6">{index + 1}</h1>
                <h1 className="text-xl font-mono w-1/6">{row.name}</h1>
                <h1 className="text-xl font-mono w-1/6">{row.email}</h1>
                <h1 className="text-xl font-mono w-1/6">{row.phone}</h1>
                <h1 className="text-xl font-mono w-1/6">{row.college}</h1>
                <h1 className="text-xl font-mono w-1/6">Not-Verified</h1>
                <button onClick={() => setCurrentOpen(index)}>o</button>
              </div>
              {currentOpen === index && (
                <div className="flex w-full border-2 border-black p-4 my-2 rounded-2xl h-80 relative justify-center">
                  <button
                    onClick={() => setCurrentOpen(null)}
                    className="absolute top-0 right-0 m-4"
                  >
                    x
                  </button>
                  <div className="flex flex-col w-1/2">
                    <h1 className="text-xl font-mono ">Name: {row.name}</h1>
                    <h1 className="text-xl font-mono ">Email: {row.email}</h1>
                    <h1 className="text-xl font-mono">Phone: {row.phone}</h1>
                    <h1 className="text-xl font-mono">
                      Institution: {row.college}
                    </h1>
                    <h1 className="text-xl font-mono">
                      Transaction ID: {row.transactionID}
                    </h1>
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <img
                      src={row.screenshotUrl}
                      className="object-contain h-full w-full"
                    />
                  </div>
                </div>
              )}
            </>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Event;
