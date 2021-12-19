import AppDrawer from "../../components/AppBar";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";x
import "react-tabs/style/react-tabs.css";
import { collection, getDocs, db, addDoc } from "../../config/Firebase/Firebase";
import { useEffect, useState, } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FullWidthTabs from "../../components/Tabs";
import { Toolbar } from "@mui/material";
// import { collection, addDoc } from "../../config/Firebase/Firebase";

const Home = () => {
  const [bname, setbname] = useState();
  const [bpas, setbpas] = useState();
  const createAdmin =  async() => {
    const docRef = await addDoc(collection(db, "Branch Admin"), {
      name: bname,
      passward: bpas,
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Admin Added Successfully")
  };
  return (
    <>
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
          Dashboard
        </h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "20%", padding: 20, height: "100vh" }}>
          <h1 style={{ fontFamily: "sans-serif" }}>Create Branch Admins</h1>
          <input
            style={{
              width: "100%",
              height: "30px",
              borderRadius: "50px",
              padding: "5px",
            }}
            type="text"
            placeholder="User Name"
            onChange={(e)=> setbname(e.target.value)}
          />
          <br />
          <input
            style={{
              width: "100%",
              height: "30px",
              borderRadius: "50px",
              padding: "5px",
              marginTop: "20px",
          
            }}
            type="text"
            placeholder="Passward"
            onChange={(e)=> setbpas(e.target.value)}
          />
          <br />
          <button
            style={{
              width: "100%",
              height: "30px",
              borderRadius: "50px",
              padding: "5px",
              marginTop: "20px",
            }}
            onClick={createAdmin}
          >
            Create Brnch Admin
          </button>
        </div>
        <FullWidthTabs />
        <div style={{ width: "20%", padding: 20, height: "100vh" }}>
          <h1 style={{ fontFamily: "sans-serif" }}>Branch Admins</h1>
          <div
            style={{
              border: " 2px solid",
              padding: "5px",
              borderRadius: "20px",
            }}
          >
            <p>Name: umair</p>
            <p>Passward: umair123</p>
            <button
              style={{
                width: "100%",
                height: "30px",
                borderRadius: "50px",
                padding: "5px",
                marginTop: "20px",
              }}
            >
              Delete this Admin
            </button>
            <button
              style={{
                width: "100%",
                height: "30px",
                borderRadius: "50px",
                padding: "5px",
                marginTop: "20px",
              }}
            >
              Edit His Passward
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
