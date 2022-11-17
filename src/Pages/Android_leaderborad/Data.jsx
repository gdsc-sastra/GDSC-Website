import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ROW = styled.tr`
  text-align: center;
  border-bottom: 1px solid #a2a2a253;
  td{
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    line-height: 35px;
    color: #636363;
  }
`;
let val =0
const Leaderboard = ({ user, score }) => { 
  useEffect(()=>{
    val = 0
  },[])  
  val+=1
  return (
      <ROW>
        <td>{val}</td>
        <td>{user}</td>
        <td>{score}</td>
      </ROW>
  );
};

export default Leaderboard;
