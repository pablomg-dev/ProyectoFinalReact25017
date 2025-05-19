import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';


function Profile() {
  const { id } = useParams();

  return (
    <Container className="mt-4">
      <h2>User Profile</h2>
      <p>Welcome, {id}</p>
    </Container>
  );
};

export default Profile;
