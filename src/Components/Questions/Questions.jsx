import React, { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getScore, sendAnswers } from "../../Api/exam";
import ExamContext from "../../Contexts/ExamContext";
import "./Questions.scss";

function Questions(props) {
  const [page, setPage] = useState(0);
  const[score, setScore]= useState(0);
  const [answers, setAnswers] = useState([]);
  const exam = useContext(ExamContext);
  const questions = exam?.questions;

//   const selectedAnswer = e => {};

  const handleAnswerClick = e => {
    const selectedIndex = Number(e.target.id);
    const currentQuestion = page;
    setAnswers([
      ...answers,
      { question: currentQuestion, answer: selectedIndex },
    ]);
    setPage(page + 1);
  };
  const handleTestAgain = () => {
    setPage(0);
    setAnswers([]);
  };

 const handleSubmitAnswers= async ()=>{
 const resultForPost = await sendAnswers(answers, exam._id);
  const resultScore = await getScore(exam._id);
setScore(resultScore.data.score);
setPage(page+1);
 };

  const showQuestion = () => {
    return (
      <div className="question">
        <h4 className="text-center">{questions[page].text}</h4>

        <div className="answers">
          <Container>
            <Row>
              {questions[page].answers.map((answer, index) => {
                return (
                  <Col md={6}>
                    <h5
                      id={index}
                      onClick={handleAnswerClick}
                      className="answer-cell"
                    >
                      {answer.text}
                    </h5>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    );
  };

  const questionPage = () => {
    return (
      <div>
        <h1 className="text-center">Question {page + 1}/5</h1>
        {showQuestion()}
      </div>
    );
  };
  const submitPage = () => {
    return (
      <div>
          <h4>Congrats {exam.candidateName}! You've finished!</h4>
          <p>If your happy with your answers, be sure to submite</p>
        <button onClick={handleSubmitAnswers}>Submit Answers</button>
        <p>Else start the exam again</p>

        <button onClick={handleTestAgain}>Test Again</button>
      </div>
    );
  };

const showScorePage =()=>{
    return (
<div>
    <h2>{exam.candidateName}, your score is: {score}</h2>
</div>
    )
  };
  
  return (
    <div className="quiz-page">
      {page === 5 ? submitPage() : page === 6? showScorePage() : questionPage()}
    </div>
  );
}

export default Questions;
