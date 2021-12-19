import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  collection,
  getDocs,
  db,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
} from "../../config/Firebase/Firebase";
import { useEffect, useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [Data, setData] = useState([]);
  const [acceptedData, setacceptedData] = useState([]);
  const [rejectedData, setrejectedData] = useState([]);

  const [state, setstate] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const getData = async () => {
    // const querySnapshot = await getDocs(collection(db, "AllApplicstions"));
    // let arr = [];
    // querySnapshot.forEach(async (doc) => {
    //   console.log(doc.data());

    //   arr.push(doc.data());
    // });
    // setData(arr);
    const citiesRef = collection(db, "AllApplicstions");

    // Create a query against the collection.
    const q = query(citiesRef, where("reqStatus", "==", "pending"));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      arr.push(doc.data());
    });
    setData(arr);
  };

  const getAcceptedData = async () => {
    const citiesRef = collection(db, "AllApplicstions");

    // Create a query against the collection.
    const q = query(citiesRef, where("reqStatus", "==", "Accepted"));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setacceptedData(arr);
  };
  useEffect(() => {
    getData();
    getAcceptedData();
    getRejectedData();
  }, []);

  const getRejectedData = async () => {
    const citiesRef = collection(db, "AllApplicstions");

    // Create a query against the collection.
    const q = query(citiesRef, where("reqStatus", "==", "Rejected"));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setrejectedData(arr);
  };
  useEffect(() => {
    getData();
    getAcceptedData();
  }, []);

  const accept = async (v) => {
    const washingtonRef = doc(db, "AllApplicstions", v.userData.UID);
    await updateDoc(washingtonRef, {
      reqStatus: "Accepted",
    }).then(() => {
      alert("Request Accepted");
    });
  };
  const reject = async (v) => {
    const washingtonRef = doc(db, "AllApplicstions", v.userData.UID);
    await updateDoc(washingtonRef, {
      reqStatus: "Rejected",
    }).then(() => {
      alert("Request Rejected");
    });
  };
  console.log(acceptedData);
  return (
    <Box sx={{ bgcolor: "background.paper", width: 500 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Pending Requests" {...a11yProps(0)} />
          <Tab label="Accepted Requests" {...a11yProps(1)} />
          <Tab label="Rejected Requests" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {Data.map((v, i) => {
            // console.log(v)
            return (
              <div
                style={{
                  width: "80%",
                  height: "auto",
                  backgroundColor: "#cdcde0",
                  margin: "0 auto",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                key={i}
              >
                <p>Name: {v.userData.name}</p>
                <p>Father Name: {v.userData.Father}</p>
                <p>Date Of Birth: {v.userData.DOB}</p>
                <p>No. Of Family Members: {v.userData.Fmembers}</p>
                <p>Request Type: {v.userData.selectedValue}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => {
                      accept(v);
                    }}
                    style={{ marginRight: "5px" }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      reject(v);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {acceptedData.map((v, i) => {
            return (
              <div
                style={{
                  width: "80%",
                  height: "auto",
                  backgroundColor: "#cdcde0",
                  margin: "0 auto",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                key={i}
              >
                <p>Name: {v.userData.name}</p>
                <p>Father Name: {v.userData.Father}</p>
                <p>Date Of Birth: {v.userData.DOB}</p>
                <p>No. Of Family Members: {v.userData.Fmembers}</p>
                <p>Request Type: {v.userData.selectedValue}</p>
                <p>CNIC: {v.userData.CNIC}</p>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {rejectedData.map((a, i) => {
            return (
              <div
                style={{
                  width: "80%",
                  height: "auto",
                  backgroundColor: "#cdcde0",
                  margin: "0 auto",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <p>Name: {a.userData.name}</p>
                <p>Father Name: {a.userData.Father}</p>
                <p>Date Of Birth: {a.userData.DOB}</p>
                <p>No. Of Family Members: {a.userData.Fmembers}</p>
                <p>Request Type: {a.userData.selectedValue}</p>
                <p>CNIC: {a.userData.CNIC}</p>
              </div>
            );
          })}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
