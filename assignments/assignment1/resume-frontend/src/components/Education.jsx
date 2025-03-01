import { Card } from 'react-bootstrap';
import { FaGraduationCap } from 'react-icons/fa';

function Education({ education }) {
  return (
    <section className="education-section section">
      {education.map((edu) => (
        <Card key={edu.id} className="mb-3">
          <Card.Header className="d-flex align-items-center">
            <FaGraduationCap className="me-2" />
            <strong>{edu.institution}</strong>
          </Card.Header>
          <Card.Body>
            <Card.Title>{edu.degree}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{edu.year}</Card.Subtitle>
            <Card.Text>{edu.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
}

export default Education;