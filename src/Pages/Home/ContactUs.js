import React, { useState } from "react";
import styled from "styled-components";
import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
// const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n');
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;


const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};

const Card = styled.div`
  background-color: white;
  margin: auto auto;
  width: 40%;
  margin: 0 auto;
  border-radius: 30px;
  height: 520px;
  position: relative;
  width: 50%;
  box-shadow: 1px 1px 15px var(--shadow-grey);
  @media (max-width: 768px) {
    width: 90%;
    padding-top: 20px;
    width: 90%;
  }
`;

const Title = styled.div`
  background-color: var(--green);
  padding: 5px 10px;
  width: 100%;
  max-width: ${(props) => (props.width ? props.width : "400px")};
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 200px;
  color: white;
  text-align: center;
  font-size: 1.2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10% auto;
  & > input,
  textarea {
    margin: 10px;
    border-radius: 30px;
    outline: none;
    border: 1px solid #c9c9c9;
    padding: 15px 20px;
    font-size: 20px;
  }

  & > button {
    width: auto;
    background-color: var(--green);
    color: white;
    font-size: 20px;
    padding: 10px;
    border-radius: 100px;
    outline: none;
    border: 1px solid var(--green);
    margin-left: auto;
    margin-right: 1%;
  }
  @media (max-width: 768px) {
    width: 90%;
    & > button {
      width: 70%;
      margin: 0 auto;
    }
  }
`;

const ContactUs = (props) => {
  const [state, setState] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState[e.target.name] = e.target.value;
    setState(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.name !== "" && state.message !== "" && state.email !== "") {
      // fetch("https://dscsastra.herokuapp.com/contact", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(state),
      // });
      appendSpreadsheet(state);
      setState({
        email: "",
        name: "",
        message: "",
      });
      console.log("Response noted!");
    }
  };

  return (
    <Card>
      <Title width="200px">Contact us</Title>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-Mail"
          value={state.email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Name"
          value={state.name}
          name="name"
          onChange={handleChange}
        />
        <textarea
          name="message"
          type="text"
          rows={5}
          placeholder="Message"
          onChange={handleChange}
          value={state.message}
        />
        <button>Submit</button>
      </Form>
    </Card>
  );
};

export default ContactUs;
