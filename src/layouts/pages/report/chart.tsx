// import "./styles.css";
import { log } from "console";
import React, { useState, useCallback } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend } from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
const data = [
  {
    bengaluru: 59,
    newdelhi: 57,
    mumbai: 86,
    lucknow: 21,
    name: "Jan",
  },
  {
    bengaluru: 50,
    newdelhi: 52,
    mumbai: 78,
    lucknow: 28,
    name: "Feb",
  },
  {
    bengaluru: 47,
    newdelhi: 53,
    mumbai: 106,
    lucknow: 41,
    name: "Mar",
  },
  {
    bengaluru: 54,
    newdelhi: 56,
    mumbai: 92,
    lucknow: 73,
    name: "Apr",
  },
  {
    bengaluru: 67,
    newdelhi: 69,
    mumbai: 92,
    lucknow: 99,
    name: "Ma",
  },
  {
    bengaluru: 60,
    newdelhi: 63,
    mumbai: 103,
    lucknow: 144,
    name: "Jun",
  },
  {
    bengaluru: 59,
    newdelhi: 60,
    mumbai: 105,
    lucknow: 19,
    name: "Jul",
  },
  {
    bengaluru: 65,
    newdelhi: 60,
    mumbai: 106,
    lucknow: 49,
    name: "Aug",
  },
  {
    bengaluru: 51,
    newdelhi: 51,
    mumbai: 95,
    lucknow: 13,
    name: "Sep",
  },
  {
    bengaluru: 60,
    newdelhi: 65,
    mumbai: 97,
    lucknow: 55,
    name: "Oct",
  },
  {
    bengaluru: 67,
    newdelhi: 64,
    mumbai: 76,
    lucknow: 48,
    name: "Nov",
  },
  {
    bengaluru: 61,
    newdelhi: 70,
    mumbai: 103,
    lucknow: 25,
    name: "Dec",
  },
];
export default function MyChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  const handleClick = useCallback(
    (entry: any, index: number) => {
      setActiveIndex(index);
      //   console.log(activeItem, activeIndex, "clicked data ");
    },
    [setActiveIndex]
  );
  console.log(activeItem.name, activeItem.bengaluru, "clicked data");

  return (
    <div>
      <p>Click each rectangle </p>
      {/* <BarChart width={150} height={40} data={data}>
        <Bar dataKey="bengaluru" onClick={handleClick}>
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart> */}
      <p className="content">{`Uv of "${activeItem.name}": ${activeItem.bengaluru}`}</p>

      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bengaluru" fill="#8884d8" onClick={handleClick} />
      </BarChart>
    </div>
  );
}
