import { Row, Col, ProgressBar } from 'react-bootstrap';

function Skills({ skills }) {
  const getProgressValue = (level) => {
    switch (level) {
      case 'Basic':
        return 25;
      case 'Intermediate':
        return 60;
      case 'Advanced':
        return 90;
      default:
        return 50;
    }
  };

  return (
    <section className="skills-section section">
      <Row>
        {skills.map((skill) => (
          <Col key={skill.id} xs={12} md={6} className="mb-3">
            <div className="skill-item">
              <div className="d-flex justify-content-between mb-1">
                <span>{skill.name}</span>
                <span>{skill.level}</span>
              </div>
              <ProgressBar 
                now={getProgressValue(skill.level)} 
                variant={
                  skill.level === 'Advanced' ? 'success' : 
                  skill.level === 'Intermediate' ? 'info' : 'warning'
                } 
              />
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default Skills;