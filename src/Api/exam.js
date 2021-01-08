import axios from "axios";
const { REACT_APP_BE_URL } = process.env;
export const startExam = async userData => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      `${REACT_APP_BE_URL}/exams/start`,
      userData,
      config
    );
    console.log("hellooo");
    return response.data
  } catch (error) {
      console.log("Exam start error", error.response.data)
      return error.response.data;
  }
};

export const sendAnswers = async(answers, examId)=> {
    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    
      try {
        const response = await axios.post(
          `${REACT_APP_BE_URL}/exams/${examId}/answer`,
          answers,
          config
        );
        console.log("hellooo");
        return response.data
      } catch (error) {
          console.log("Error with submiting answers", error.response.data)
          return error.response.data;
      }
    };

export const getScore = async(examId)=>{
    try {
        const response = await axios.get(`${REACT_APP_BE_URL}/exams/${examId}`)
        console.log("score", response.data);
        return response.data
    } catch (error) {
        console.log("Unable to get the score", error.response.data)
        return error.response.data;
    }
}