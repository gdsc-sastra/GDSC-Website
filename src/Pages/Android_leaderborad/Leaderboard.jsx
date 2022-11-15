import React from "react";
import { useEffect, useState } from "react";
import Row from "./Data";
import styled from "styled-components";
import loader from "../../loader.gif";


const CONTAINER = styled.div`
  margin:40px 100px 50px;
  @media (max-width: 768px) {
    margin: 40px 15px;
    h1{
      font-size: 35px !important;
      margin-bottom: 40px !important;
    }
  }
  h1 {
    text-align: center;
    color: #3DDB84;
    margin-bottom: 50px;
  }
`;
const TABLE = styled.table`
  width: 90%;
  margin: auto ;
  padding-bottom: 10px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-collapse: collapse;
  @media (max-width: 768px) {
    th{
      font-size: 20px !important;
    }
    td{
      font-size: 18px ;
      line-height: 25px;
    }
    th:nth-of-type(1){
      width: 8%;
  }
  margin-bottom: 55px;
  }
  tr:first-of-type{
    background-color: #ECFBF3;
    th{
      font-size: 25px;
    }
  }
  tr:last-of-type, tr:first-of-type{
    border-bottom: none;
  }
  th:nth-of-type(1){
    width: 28%;
    border-radius: 14px 0 0 0;
  }
  th:nth-of-type(3){
    border-radius: 0 14px 0 0;
  }
  tr:last-child td{
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
  }
  tr:nth-child(2) td{
    color: #3DDB84;
    border-bottom: 1px solid #ECFBF3;
  }
  tr:nth-child(3){
    background-image: linear-gradient(#ECFBF3,white);
  }
  th,
  td {
    padding: 13px;
  }
`;

const Landingpage = () => {
  const URL = process.env.REACT_APP_LEADERBOARD_API;
  const [data, setData] = useState(null);
  const Arr = [[]];

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((jsonData) => {
        const resultArray = jsonData.result;
        resultArray.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        const map = new Map();
        for (const item of resultArray) {
          if (!map.has(item.user)) {
            map.set(item.user, true);
            Arr[0].push(item);
          }
        }
        setData(Arr[0]);
      });
  }, []);

  if (data != null) {
    return (
        <CONTAINER>
            <h1>Android League</h1>
            <TABLE>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Points</th>
              </tr>
              {data.map((val) => {
                return <Row key={val.user} {...val} num={1} />;
              })}
            </TABLE>
        </CONTAINER>
    );
  } else {
    return (
      <div className="loader">
        <img src={loader} />
      </div>
    );
  }
};

export default Landingpage;
