import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { BarChart } from "@mui/x-charts/BarChart";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";
import { useAppContext } from "./context";
import { useNavigate } from "react-router-dom";
function Home() {
  const {
    data,
    dataset,
    totalRegistrations,
    totalRevenue,
    verifiedData,
    verifiedDataset,
    verifiedTotalRegistrations,
    verifiedTotalRevenue,
  } = useAppContext();
  const nav = useNavigate();
  const chartSetting = {
    xAxis: [
      {
        label: "Registrations",
      },
    ],
    width: 800,
    height: 400,
  };

  function valueFormatter(value) {
    return `${value}`;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-mono my-10">Overall Statistics</h1>
      <div className="flex items-center justify-center flex-wrap w-full px-24">
        <div className="flex flex-col items-center justify-center">
          <h2 className="my-4 text-xl font-mono">
            Total Registrations : {totalRegistrations}
          </h2>
          <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: "band", dataKey: "event" }]}
            sx={{}}
            margin={{ left: 100 }}
            series={[
              {
                dataKey: "registrations",
                label: "Registrations",
                valueFormatter,
              },
            ]}
            layout="horizontal"
            grid={{ vertical: true }}
            {...chartSetting}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="my-4 text-xl font-mono">
            Total Revenue : Rs.{totalRevenue}
          </h2>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: dataset[0]?.revenue, label: "Technical" },
                  { id: 1, value: dataset[1]?.revenue, label: "Non-Technical" },
                  { id: 2, value: dataset[2]?.revenue, label: "Cyberthon" },
                  { id: 3, value: dataset[3]?.revenue, label: "Workshops" },
                  { id: 4, value: dataset[4]?.revenue, label: "Conclave" },
                  { id: 5, value: dataset[5]?.revenue, label: "Awareness" },
                ],
              },
            ]}
            width={500}
            height={200}
          />
        </div>
      </div>

      <div className="flex items-center justify-center flex-wrap w-full px-24 my-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="my-4 text-xl font-mono">
            Verified Registrations : {verifiedTotalRegistrations}
          </h2>
          <BarChart
            dataset={verifiedDataset}
            yAxis={[{ scaleType: "band", dataKey: "event" }]}
            sx={{}}
            margin={{ left: 100 }}
            series={[
              {
                dataKey: "registrations",
                label: "Registrations",
                valueFormatter,
              },
            ]}
            layout="horizontal"
            grid={{ vertical: true }}
            {...chartSetting}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="my-4 text-xl font-mono">
            Verified Revenue : Rs.{verifiedTotalRevenue}
          </h2>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: verifiedDataset[0]?.revenue,
                    label: "Technical",
                  },
                  {
                    id: 1,
                    value: verifiedDataset[1]?.revenue,
                    label: "Non-Technical",
                  },
                  {
                    id: 2,
                    value: verifiedDataset[2]?.revenue,
                    label: "Cyberthon",
                  },
                  {
                    id: 3,
                    value: verifiedDataset[3]?.revenue,
                    label: "Workshops",
                  },
                  {
                    id: 4,
                    value: verifiedDataset[4]?.revenue,
                    label: "Conclave",
                  },
                  {
                    id: 5,
                    value: verifiedDataset[5]?.revenue,
                    label: "Awareness",
                  },
                ],
              },
            ]}
            width={500}
            height={200}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center my-10">
        <h1 className="text-2xl font-mono text-black m-4">Technical Events</h1>
        <div className="flex flex-wrap justify-center items-center">
          {data.Tecnical?.map((event) => (
            <div
              key={event.collection}
              onClick={() => nav(`/event/${event.collection}`)}
              className="hover:scale-105 hover:shadow-teal-300 cursor-pointer shadow-xl shadow-teal-600 m-4 rounded-md flex items-center justify-center h-48 w-64 bg-teal-800 duration-300"
            >
              <h1 className="text-2xl font-mono text-white">
                {event.collection}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-mono text-black m-4">
          Non-Technical Events
        </h1>
        <div className="flex flex-wrap justify-center items-center">
          {data.NonTechnical?.map((event) => (
            <div
              key={event.collection}
              onClick={() => nav(`/event/${event.collection}`)}
              className="hover:scale-105 hover:shadow-teal-300 cursor-pointer shadow-xl shadow-teal-600 m-4 rounded-md flex items-center justify-center h-48 w-64 bg-teal-800 duration-300"
            >
              <h1 className="text-2xl font-mono text-white">
                {event.collection}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-mono text-black m-4">Workshops</h1>
        <div className="flex flex-wrap justify-center items-center">
          {data.Workshops?.map((event) => (
            <div
              key={event.collection}
              onClick={() => nav(`/event/${event.collection}`)}
              className="hover:scale-105 hover:shadow-teal-300 cursor-pointer shadow-xl shadow-teal-600 m-4 rounded-md flex items-center justify-center h-48 w-64 bg-teal-800 duration-300"
            >
              <h1 className="text-2xl font-mono text-white">
                {event.collection}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-mono text-black m-4">Other Events</h1>
        <div className="flex flex-wrap justify-center items-center">
          <div
            onClick={() => nav("/event/cyberthon")}
            className="hover:scale-105 hover:shadow-teal-300 cursor-pointer shadow-xl shadow-teal-600 m-4 rounded-md flex items-center justify-center h-48 w-64 bg-teal-800 duration-300"
          >
            <h1 className="text-2xl font-mono text-white">Cyberthon</h1>
          </div>
          <div
            onClick={() => nav("/event/awareness")}
            className="hover:scale-105 hover:shadow-teal-300 cursor-pointer shadow-xl shadow-teal-600 m-4 rounded-md flex items-center justify-center h-48 w-64 bg-teal-800 duration-300"
          >
            <h1 className="text-2xl font-mono text-white">Awareness</h1>
          </div>
          <div
            onClick={() => nav("/event/cyberconclave")}
            className="hover:scale-105 hover:shadow-teal-300 cursor-pointer shadow-xl shadow-teal-600 m-4 rounded-md flex items-center justify-center h-48 w-64 bg-teal-800 duration-300"
          >
            <h1 className="text-2xl font-mono text-white">Conclave</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
