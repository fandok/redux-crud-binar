import { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

class UserForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
  };

  componentDidMount() {
    if (this.props.id) {
      this.fetchUserById(this.props.id);
    }
  }

  fetchUserById(id) {
    fetch(`https://reqres.in/api/users/${id}`, { method: "GET" }).then(
      (response) =>
        response.json().then((dataResponse) => {
          this.setState({
            ...dataResponse.data,
          });
        }),
    );
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let method = "POST";
    let url = "https://reqres.in/api/users";

    if (this.props.id) {
      method = "PUT";
      url += `/${this.props.id}`;
    }

    const data = this.state;
    fetch(url, {
      method,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Data berhasil ditambah");
        this.props.navigation("/");
      });
  }

  render() {
    return (
      <Container fluid className="p-4">
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={this.state.first_name}
              placeholder="Masukkan first name"
              onChange={this.onChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={this.state.last_name}
              placeholder="Masukkan last name"
              onChange={this.onChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Masukkan email"
              onChange={this.onChange.bind(this)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

const UserFormContainer = () => (
  <UserForm navigation={useNavigate()} {...useParams()} />
);

export default UserFormContainer;
