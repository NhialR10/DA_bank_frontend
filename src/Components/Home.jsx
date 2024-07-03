import React, { useContext, useEffect, useState } from "react";
import { FaDollarSign, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
const { formatNumber } = require("../utils");
function Home() {
  const { userLogin } = useContext(AuthContext);
  const [activeBranch, setActiveBranch] = useState({});
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    // Fetch users when component mounts
    const getActiveBranch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/branches/get-branch/${userLogin.branch._id}`
        );
        setActiveBranch(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getActiveBranch();
  }, [userLogin]); // Trigger fetchUsers() when fetchUsers changes
  console.log(activeBranch);
  return (
    <main1 className="main1-container">
      <div className="main1-title">
        <h3>{activeBranch.name} </h3>
      </div>

      <div className="main1-card1s">
        <div className="card1">
          <div className="card1-inner">
            <h3>AMOUNT IN USD</h3>
            <FaDollarSign className="card1_icon" />
          </div>
          <h1>{formatNumber(activeBranch.dollarsAmount)} </h1>
        </div>
        <div className="card1">
          <div className="card1-inner">
            <h3>AMOUNT IN KSH</h3>
            <FaMoneyBillWave className="card1_icon" />
          </div>
          <h1>{formatNumber(activeBranch.kshAmount)}</h1>
        </div>
        <div className="card1">
          <div className="card1-inner">
            <h3>AMOUNT IN UGX</h3>
            <FaMoneyBillWave className="card1_icon" />
          </div>
          <h1>{formatNumber(activeBranch.ugxAmount)}</h1>
        </div>
        <div className="card1">
          <div className="card1-inner">
            <h3>AMOUNT IN SSD</h3>
            <FaMoneyBillWave className="card1_icon" />
          </div>
          <h1>{formatNumber(activeBranch.sspAmount)}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main1>
  );
}

export default Home;
