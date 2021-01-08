import React, { useContext } from "react";
import { showErrorMessage } from "../../Utilites/message";
import { Container, Form } from "react-bootstrap";
import "./StartForm.scss";
import ExamContext from "../../Contexts/ExamContext";

function StartForm(props) {
  const { candidateName, name } = props.formData;
  const { errorMsg } = props;

  const exam = useContext(ExamContext);

  const showForm = () => {
    return (
      <Form onSubmit={props.handleSubmit}>
        <Form.Group>
          <Form.Label>What's your name?</Form.Label>
          <Form.Control
            id="candidateName"
            onChange={props.handleFormChange}
            value={candidateName}
            type="text"
            placeholder="Enter name"
          />
          <Form.Text className="text-muted">
            Your posted results will be kept annoymous
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Which exam are you taking today?</Form.Label>
          <Form.Control
            id="name"
            value={name}
            onChange={props.handleFormChange}
            type="text"
            placeholder="Name of Exam"
          />
          <Form.Text className="text-muted">
            Please reference the document for official exam name{" "}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <button variant="primary" type="submit">
          Submit
        </button>
      </Form>
    );
  };
  return (
    <div className="stater-form">
      <Container>
        <h1>Before we start</h1>
        <p>Let us know who you are & what exam</p>
        <div>{showForm()}</div>
        {errorMsg && (<div className="mt-3">{showErrorMessage(errorMsg)}</div>)}
      </Container>
    </div>
  );
}

export default StartForm;
