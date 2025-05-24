import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./Chart.css";

function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5111/api/Auth/user-activity-chart")
      .then((res) => res.json())
      .then((chartData) => {
        console.log("Raw API Response:", chartData); // Debugging

        if (!Array.isArray(chartData)) {
          console.error("API Response is not an array:", chartData);
          return;
        }

        const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        // Initialize dataMap with zero values
        const dataMap = allDays.reduce((acc, day) => {
          acc[day] = { name: day, Signup: 0, Login: 0 };
          return acc;
        }, {});

        // Populate actual values from API response
        chartData.forEach(entry => {
          if (entry.name in dataMap) {
            dataMap[entry.name].Signup = entry.signup || 0;
            dataMap[entry.name].Login = entry.login || 0;
          }
        });

        const formattedData = allDays.map(day => dataMap[day]);

        console.log("Formatted Data for Chart:", formattedData); // Debugging
        setData(formattedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="chart">
      <h3 className="charttitle">User Analytics</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey="Signup" stroke="green" />
          <Line type="monotone" dataKey="Login" stroke="blue" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
