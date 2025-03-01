import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Overview from './components/Overview';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  const [overview, setOverview] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const overviewRes = await fetch('http://localhost:8000/getOverview');
        const eduRes = await fetch('http://localhost:8000/getEdu');
        const expRes = await fetch('http://localhost:8000/getExp');
        const skillsRes = await fetch('http://localhost:8000/getSkills');

        const overviewData = await overviewRes.json();
        const eduData = await eduRes.json();
        const expData = await expRes.json();
        const skillsData = await skillsRes.json();

        setOverview(overviewData);
        setEducation(eduData);
        setExperience(expData);
        setSkills(skillsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please ensure your server is running.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading resume data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <Header />
      <Container className="resume-container">
        {overview && <Overview overview={overview} />}
        
        <h2 className="section-title">Experience</h2>
        {experience.length > 0 && <Experience experience={experience} />}
        
        <h2 className="section-title">Education</h2>
        {education.length > 0 && <Education education={education} />}
        
        <h2 className="section-title">Skills</h2>
        {skills.length > 0 && <Skills skills={skills} />}
      </Container>
      <Footer />
    </div>
  );
}

export default App;