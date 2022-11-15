import React, { useState } from "react";
import styled from "styled-components";

const CONTAINER = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 170px;
`;

const INPUT = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
  gap: 20px;
  input {
    padding: 10px 20px;
    width: 100%;
    border-radius: 15px;
    border: 2px solid #3ddb84;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  }
  button {
    padding: 10px 15px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  }
  button:hover {
    background-color: #3ddb84;
  }
  @media (max-width: 768px) {
    width: 60%;
    margin-bottom: 50px;
  }
`;

const AddNewPerson = () => {
  const URL = process.env.REACT_APP_LEADERBOARD_API;
  const [name, setName] = useState(null);
  const [score, setScore] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };
  const post = () => {
    const response = window.confirm(`name: ${name} score: ${score}`);
    if (response === true && (name != null || score != null)) {
      console.log(name, score);
      if (name && score) {
        const object = {
          user: name.trim(),
          score,
        };
        fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        })
          .then((response) => response.json())
          .then((data) => data)
          .catch((error) => error);
      }
    }
  };
  return (
    <CONTAINER>
      <INPUT>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            handleNameChange(e);
          }}
          placeholder="NAME"
          required
        />
        <input
          type="text"
          value={score}
          onChange={(e) => {
            handleScoreChange(e);
          }}
          placeholder="SCORE"
          required
        />
        <button onClick={post}>Submit</button>
      </INPUT>
    </CONTAINER>
  );
};

export default AddNewPerson;
