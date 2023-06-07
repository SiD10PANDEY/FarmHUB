import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AuthContext from "../context/AuthContext";

export default function DetailsForm() {
  const [type, setType] = useState('');
  const { setData } = useContext(AuthContext);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        
      }}
    >
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={type}
            onInput={(e) => setType(e.target.value)}
          >
            <option>Choose Option</option>
            <option value="0">FARMER</option>
            <option value="1">CONSUMER</option>
          </Form.Select>
        </Form.Group>
        <Button className = "button"
          variant="primary"
          onClick={() => setData({ type: parseInt(type) === 0 ? "rider" : "driver" })}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
