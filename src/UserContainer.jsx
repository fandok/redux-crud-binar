import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import User from "./User";

const UserContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://reqres.in/api/users", { method: "GET" })
        .then((response) => response.json())
        .then((dataResponse) => {
          // convert dari setState ke setUsers
          //   this.setState({
          //     users: dataResponse.data,
          //   });

          setUsers(dataResponse.data);
        });
    };

    fetchData();
  }, []);

  const deleteUser = (id) => {
    fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" }).then(() =>
      console.log("Data user berhasil dihapus"),
    );
  };

  const createCard = (userProps) => (
    <Col key={userProps.key} xs={4}>
      <User {...userProps} onDelete={() => deleteUser(userProps.id)} />
    </Col>
  );

  const createRow = (rows) => (
    <Row key={`${Math.random()}+${Date.now()}`}>
      {rows.map((card) => createCard({ ...card, key: card.id }))}
    </Row>
  );

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
      {contents.map((i) => createRow(i))}
    </Container>
  );
};

export default UserContainer;
