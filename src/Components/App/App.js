import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Background from "../../Assets/background-image.jpg";
import { Image } from "react-bootstrap";
import Home from "../Home";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import StartForm from "../StartForm/StartForm";
import React, { useState } from "react";
import { startExam } from "../../Api/exam";
import Questions from "../Questions/Questions";
import ExamContext from "../../Contexts/ExamContext";

function App(props) {
  const [exam, setExam] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [formData, setformData] = useState({
    candidateName: "",
    name: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await startExam(formData);
    if (!result.success) {
      setErrorMsg(result.errors);
    } else {
      setExam(result.data);
      setRedirect(true);
    }
  };

  const handleFormChange = e => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Router>
      <>
        <Image src={Background} className="hero-image" />
        <ExamContext.Provider value={exam}>
          <Route path="/" exact component={Home} />
          <Route exact path="/start/form">
            {redirect ? (
              <Redirect to="/questions" />
            ) : (
              <StartForm
                {...props}
                handleSubmit={handleSubmit}
                handleFormChange={handleFormChange}
                formData={formData}
                errorMsg={errorMsg}
              />
            )}
          </Route>
          <Route path='/questions' exact component={Questions} />
        </ExamContext.Provider>
      </>
    </Router>
  );
}

export default App;
