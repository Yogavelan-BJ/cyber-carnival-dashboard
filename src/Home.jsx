import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { BarChart } from "@mui/x-charts/BarChart";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";
import { useAppContext } from "./context";
import { useNavigate } from "react-router-dom";
function Home() {
  const { data, setData, eventFees } = useAppContext();
  const [dataset, setDataset] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const nav = useNavigate();

  async function getEvents() {
    const collections = [
      "cyberconclave",
      "capturetheflag",
      "cyberthon",
      "paperpresentation",
      "bugbounty",
      "techexpo",
      "startup",
      "freefire",
      "cinema",
      "surfing",
      "awareness",
      "workshop1",
      "workshop2",
      "title",
      "valo",
    ];

    const allData = [];
    const Tecnical = [];
    const NonTechnical = [];
    const Cyberthon = [];
    const Workshops = [];
    const Conclave = [];
    const Awareness = [];

    const newDataset = [
      { registrations: 0, revenue: 0, event: "Technical" },
      { registrations: 0, revenue: 0, event: "Non-Technical" },
      { registrations: 0, revenue: 0, event: "Cyberthon" },
      { registrations: 0, revenue: 0, event: "Workshops" },
      { registrations: 0, revenue: 0, event: "Conclave" },
      { registrations: 0, revenue: 0, event: "Awareness" },
    ];

    for (const col of collections) {
      const colRef = collection(db, col);
      const colSnapshot = await getDocs(colRef);
      const colData = colSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (col === "cyberthon") {
        newDataset[2].registrations += colSnapshot.docs.length;
        newDataset[2].revenue += colSnapshot.docs.length * eventFees[col];
        Cyberthon.push({ collection: col, documents: colData });
      } else if (col === "workshop1" || col === "workshop2") {
        newDataset[3].registrations += colSnapshot.docs.length;
        newDataset[3].revenue += colSnapshot.docs.length * eventFees[col];
        Workshops.push({ collection: col, documents: colData });
      } else if (col === "awareness") {
        newDataset[5].registrations += colSnapshot.docs.length;
        newDataset[5].revenue += colSnapshot.docs.length * eventFees[col];
        Awareness.push({ collection: col, documents: colData });
      } else if (col === "cyberconclave") {
        newDataset[4].registrations += colSnapshot.docs.length;
        newDataset[4].revenue += colSnapshot.docs.length * eventFees[col];
        Conclave.push({ collection: col, documents: colData });
      } else if (
        col === "title" ||
        col === "valo" ||
        col === "freefire" ||
        col === "cinema" ||
        col === "surfing" ||
        col === "shipwreck"
      ) {
        newDataset[1].registrations += colSnapshot.docs.length;
        newDataset[1].revenue += colSnapshot.docs.length * eventFees[col];
        NonTechnical.push({ collection: col, documents: colData });
      } else if (
        col === "startup" ||
        col === "techexpo" ||
        col === "paperpresentation" ||
        col === "bugbounty" ||
        col === "capturetheflag"
      ) {
        newDataset[0].registrations += colSnapshot.docs.length;
        newDataset[0].revenue += colSnapshot.docs.length * eventFees[col];
        Tecnical.push({ collection: col, documents: colData });
      }
      allData.push({ collection: col, documents: colData });
    }
    let TotalRevenue = 0;
    let TotalRegistrations = 0;
    for (let j of newDataset) {
      TotalRevenue += j.revenue;
      TotalRegistrations += j.registrations;
    }

    setDataset(newDataset);
    setData({
      allData,
      Tecnical,
      NonTechnical,
      Cyberthon,
      Workshops,
      Conclave,
      Awareness,
    });
    setTotalRevenue(TotalRevenue);
    setTotalRegistrations(TotalRegistrations);
  }

  useEffect(() => {
    getEvents();
  }, []);

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
      <div className="h-14 border-b-2 border-black w-full flex items-center justify-center">
        <h1 className="text-black text-2xl font-mono m-2">
          Cyber Carnival '25 Dashboard
        </h1>
      </div>
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
