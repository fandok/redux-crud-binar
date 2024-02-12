import { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import User from "./User";

class UserContainer extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    fetch("https://reqres.in/api/users", { method: "GET" })
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({
          users: dataResponse.data,
        });
      });
  }

  deleteUser(id) {
    fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" }).then(() =>
      console.log("Data user berhasil dihapus"),
    );
  }

  createCard = (userProps) => (
    <Col xs={4}>
      <User
        {...userProps}
        onDelete={this.deleteUser.bind(this, userProps.id)}
      />
    </Col>
  );

  createRow = (rows) => (
    <Row key={`${Math.random()}+${Date.now()}`}>
      {rows.map((i) => this.createCard(Object.assign(i, { key: i.id })))}
    </Row>
  );

  render() {
    const { users } = this.state;
    const contents = [];
    for (let i = 0; i < users.length; i += 3) {
      contents.push(users.slice(i, i + 3));
    }

    return (
      <Container fluid className="p-4">
        <Row className="text-end mb-1">
          <Col>
            <Link to="/add">
              <Button variant="light">+ Tambah</Button>
            </Link>
          </Col>
        </Row>
        {contents.map((i) => this.createRow(i))}
      </Container>
    );
  }
}

export default UserContainer;
