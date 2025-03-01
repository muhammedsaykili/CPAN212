import { Card } from 'react-bootstrap';
import { FaBriefcase } from 'react-icons/fa';

function Experience({ experience }) {
  return (
    <section className="experience-section section">
      {experience.map((exp) => (
        <Card key={exp.id} className="mb-3">
          <Card.Header className="d-flex align-items-center">
            <FaBriefcase className="me-2" />
            <strong>{exp.company}</strong>
          </Card.Header>
          <Card.Body>
            <Card.Title>{exp.position}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{exp.year}</Card.Subtitle>
            <Card.Text>{exp.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
}

export default Experience;