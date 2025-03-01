import { Card } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

function Overview({ overview }) {
  return (
    <section className="overview-section section">
      <Card>
        <Card.Body className="text-center">
          <div className="profile-image-container mb-3">
            <FaUser size={80} />
          </div>
          <h1>{overview.name}</h1>
          <h3 className="text-muted">{overview.title}</h3>
          <p className="mt-3">{overview.summary}</p>
        </Card.Body>
      </Card>
    </section>
  );
}

export default Overview;