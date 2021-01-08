import {Alert} from "react-bootstrap"

export const showErrorMessage =(msg)=>{
    return <Alert variant="danger">
        {msg}
      </Alert>
}