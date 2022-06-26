import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Table,
  ButtonGroup,
  Button,
  Form,
} from "react-bootstrap";
const api = "https://react-todossonserver.herokuapp.com/api";
const initialState = { name: "", email: "", contact: "", address: "" };
const App = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(initialState);
  const [userId, setUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { name, email, contact, address } = state;
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const response = await axios.get(api);
    setData(response.data);
  };

  const handleDelet = async (id) => {
    if (window.confirm("are You sure delete?")) {
      axios.delete(`${api}/${id}`);
      setTimeout(() => loadUsers(), 500);
    }
  };

  const handleUpdate = (id) => {
    const singleUsers = data.find((item) => item.id == id);
    setState({ ...singleUsers });
    setUserId(id);
    setEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !contact || !email) {
      alert("error");
    } else {
      if (!editMode) {
        axios.post(api, state);
        setState({ name: "", email: "", address: "", contact: "" });

        setTimeout(() => loadUsers(), 500);
      } else {
        axios.put(`${api}/${userId}`, state);
        setState({ name: "", email: "", address: "", contact: "" });
        setUserId(null);
        setEditMode(false);
        setTimeout(() => loadUsers(), 500);
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand>hello react</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: 70 }}>
        <Row>
          <Col md={4}>
            {/* <h2>form</h2> */}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  placeholder="Enter Contact"
                  value={contact}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={address}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-2">
                <Button type="submit" variant="primary" size="lg ">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={8}>
            {/* <h2>table</h2> */}
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name.</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data &&
                data.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td>{item.address}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            style={{ marginRight: 5 }}
                            variant="secondary"
                            onClick={() => handleUpdate(item.id)}
                          >
                            Update
                          </Button>
                          <Button
                            onClick={() => handleDelet(item.id)}
                            style={{ marginRight: 5 }}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
