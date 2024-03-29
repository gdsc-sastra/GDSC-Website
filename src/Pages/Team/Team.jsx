import React, { useState, useEffect } from "react";
import "./App.css";
import bg1 from "../../Backgrounds/BG_1.png";
import bg2 from "../../Backgrounds/BG_2.png";
import Cluster from "./Cluster.jsx";
import arrow from "../Logos/down-arrow.svg";
import loader from "../../loader.gif";
import styled from "styled-components";
import data2022 from './Cluster_2022.json'
import axios from "axios";
import git from "../Logos/github.svg";
import linkedin from "../Logos/linkedin.svg";

function getRandomNumber() {
  return parseInt(1 + Math.random() * 99);
}

const CURRENT_YEAR = 2020;

const BatchSwitch = styled.button`
  padding: 0.7em;
  border-radius: 50px;
  background-color: ${(props) => (props.selected ? "#292929" : "#fff")};
  font-size: 1em;
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  outline: none;
  border: 2px solid #000;
  transition: background-color 0.5s ease-out, transform 0.5s ease-out;
  cursor: pointer;
`;

const Teams = () => {
  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [batchSelected, setBatchSelected] = useState("current");
  // const [newData2022,setNewData2022] = useState(data2022);
  
  // const url = "http://13.115.182.165:8000/get-members";
  
  useEffect(() => {
    // fetch("https://dscsastraapi.herokuapp.com/MembersbyCluster)
    //   .then((res) => res.json())
    //   .then((newdata) => {
      //     console.log(newdata);
      // console.log(jsonData[0]);
      
      data2022.map((newdata)=>{
        // axios.get(url)
        // .then(function (newdata) {
        //   console.log(newdata);
          let batchData = { current: {}, previous: {} };
          for (let cluster in newdata[0]) {
          let currentCluster = newdata[0][cluster];
          if (cluster == "lead") {
            let batchAssign =
              parseInt(currentCluster.batch) - CURRENT_YEAR >= 0
                ? "current"
                : "previous";
            batchData[batchAssign][cluster] = currentCluster;
            //Delete this
            // batchData["previous"][cluster] = {
            //   batch: 2019,
            //   github: "https://github.com/kavinraju",
            //   imgUrl: "https://i.postimg.cc/yNYKtWvw/Kavin-Raju.jpg",
            //   linkedin: "https://www.linkedin.com/in/kavinraju/",
            //   name: "XYZ",
            //   role: "DSC Lead, App Developer",
            //   twitter: "https://twitter.com/kavinRajuS",
            // };
          }
          if (Array.isArray(currentCluster)) {
            batchData["previous"][cluster] = [];
            batchData["current"][cluster] = [];

            currentCluster.forEach((member) => {
              let batchAssign =
                parseInt(member.batch) - CURRENT_YEAR >= 0
                  ? "current"
                  : "previous";
              batchData[batchAssign][cluster].push(member);
            });

            // currentCluster.forEach((member) => {
            //   batchData["previous"][cluster].push(member);
            // });
          }
        }
        setData(newdata);
        console.log(data);
        setAllData(batchData);
      // });
    })
  }, []);

  useEffect(() => {
    if (allData) {
      setData(allData[batchSelected]);
    }
  }, [batchSelected]);

  if (data == null) {
    return (
      <div className="loader">
        <img src={loader} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <img src={bg1} className="bg1" />
        <img src={bg2} className="bg2" />
        <main className="jumbotron">
          <div className="quote-wrapper">
            <h1>Alone we do so little. Together we can change the world</h1>
            <h2>We are team GDSC SASTRA </h2>
          </div>
          <a href="#main-team" className="scroller">
            <img src={arrow} />
          </a>
        </main>
        <main id="main-team">
        <section className="lead">
            <div className="lead-container">
              <img className="lead-img" src={require(`${data.lead.imgUrl}`)} style={{ width: "170px" }} />
              <h3>{data.lead.name}</h3>
              <p>{data.lead.role}</p>
              <div className="social">
                <a href={data.lead.github} target="_blank">
                  <img src={git} />
                </a>
                <a href={data.lead.linkedin} target="_blank">
                  <img src={linkedin} />
                </a>
              </div>
            </div>
          </section>
          <div className="batch-button">
            {batchSelected == "current" ? (
              <>
                {/* <BatchSwitch
                  onClick={() => setBatchSelected("current")}
                  selected
                >
                  Current Batch
                </BatchSwitch> */}
                {/* <BatchSwitch onClick={() => setBatchSelected("previous")}>
                  Previous Batch
                </BatchSwitch> */}
              </>
            ) : (
              <>
                <BatchSwitch onClick={() => setBatchSelected("current")}>
                  Current Batch
                </BatchSwitch>
                <BatchSwitch
                  onClick={() => setBatchSelected("previous")}
                  selected
                >
                  Previous Batch
                </BatchSwitch>
              </>
            )}
          </div>
          <section className="others">
            <Cluster
              name="android"
              img="android.svg"
              color="green"
              right={true}
              id={0}
              data={data.android}
            />
            <Cluster
              name="web"
              img="coding.svg"
              right={false}
              color="blue"
              id={1}
              data={data.web}
            />
            <Cluster
              name="machine learning"
              img="learning.svg"
              color="yellow"
              right={true}
              id={2}
              data={data.ml}
            />

            {/* <Cluster
              name="AR / VR"
              img="vr-glasses.svg"
              right={false}
              color="red"
              id={3}
              data={data.arvr}
            /> */}
            <Cluster
              name="Flutter development"
              img="flutterio-icon.svg"
              color="red"
              right={false}
              id={3}
              data={data.flutter}
            />
            <Cluster
              name="Cloud"
              img="setting.svg"
              right={true}
              color="green"
              id={5}
              data={data.cloud}
            />
            <Cluster
              name="Digital creations"
              img="tools.svg"
              color="blue"
              right={false}
              id={6}
              data={data.digital}
            />
            <Cluster
              name="Content writing"
              img="report.svg"
              right={true}
              color="yellow"
              id={7}
              data={data.content}
            />
            <Cluster
              name="Promotions and marketing"
              img="setting.svg"
              color="red"
              right={false}
              id={8}
              data={data.marketing}
            />
            {/* <Cluster
              name="Event Coverage"
              img="camera.jpg"
              right={true}
              color="yellow"
              id={9}
              data={data.eventcoverage}
            /> */}
          </section>
        </main>
      </div>
    );
  }
};

export default Teams;
