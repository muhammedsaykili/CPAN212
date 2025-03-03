const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' 
}));

const educationData = [
    {
        id: 1,
        institution: "Humber College",
        degree: "Degree In Computer Programming And Analysis",
        year: "2023 - 2025",
        description: "Focused on web development and database management."
    },
];

const experienceData = [
    {
        id: 1,
        company: "Company A",
        position: "Junior Developer",
        year: "2026 - 2027",
        description: "Developed and maintained company websites. Implemented responsive designs and integrated APIs."
    },
];

const overviewData = {
    name: "Muhammed Saykili",
    title: "Frontend And Backend Developer",
    summary: "Recent Humber College graduate with knowledge of front-end and back-end development. Proficient in JavaScript, React, and Node.js. Looking for an opportunity to apply my skills in a professional setting."
};

const skillsData = [
    { id: 1, name: "JavaScript", level: " = Advanced" },
    { id: 2, name: "React", level: " = Advanced" },
    { id: 3, name: "Node.js", level: " = Moderate" },
    { id: 4, name: "Express", level: " = Moderate" },
    { id: 5, name: "CSS", level: " = Advanced" },
    { id: 6, name: "HTML", level: " = Advanced" },
    { id: 7, name: "Git", level: " = Moderate" },
    { id: 8, name: "MongoDB", level: " = Advanced" }
];

app.get('/getEdu', (req, res) => {
    res.json(educationData);
});

app.get('/getExp', (req, res) => {
    res.json(experienceData);
});

app.get('/getOverview', (req, res) => {
    res.json(overviewData);
});

app.get('/getSkills', (req, res) => {
    res.json(skillsData);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});