import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = ({ id, navigation }) => {
  const [formInput, setFormInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserById = (id) => {
      fetch(`https://reqres.in/api/users/${id}`, { method: "GET" }).then(
        (response) =>
          response.json().then((dataResponse) => {
            setFormInput({
              first_name: dataResponse.data.first_name,
              last_name: dataResponse.data.last_name,
              email: dataResponse.data.email,
            });
          }),
      );
    };

    if (id) {
      fetchUserById(id);
    }
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let method = "POST";
    let url = "https://reqres.in/api/users";

    if (id) {
      method = "PUT";
      url += `/${id}`;
    }

    fetch(url, {
      method,
      body: JSON.stringify(formInput),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Data berhasil ditambah");
        navigation("/");
      });
  };

  return (
    <Container fluid className="p-4">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={formInput.first_name}
            placeholder="Masukkan first name"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formInput.last_name}
            placeholder="Masukkan last name"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formInput.email}
            placeholder="Masukkan email"
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const UserFormContainer = () => (
  <UserForm navigation={useNavigate()} {...useParams()} />
);

export default UserFormContainer;
