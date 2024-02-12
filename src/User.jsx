import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const User = ({ id, avatar, first_name, last_name, email, onDelete }) => (
  <Card className="mb-1" style={{ width: "18rem" }}>
    <Card.Img variant="top" src={avatar} />
    <Card.Body>
      <Card.Title>
        {first_name} {last_name}
      </Card.Title>
      <Card.Text>{email}</Card.Text>
    </Card.Body>
    <Button className="me-2" variant="danger" onClick={onDelete}>
      Hapus
    </Button>
    <Link to={`/edit/${id}`}>
      <Button variant="warning">Edit</Button>
    </Link>
  </Card>
);

export default User;
