import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogList from "./BlogList";

import "./App.css";

function App() {
  const [data, setData] = useState({});

  const getData = () => {
    axios.get("localhost:8000/api/posts").then(res => {
      console.log(res);
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <BlogList blog={data} setData={setData} />
    </div>
  );
}

export default App;
