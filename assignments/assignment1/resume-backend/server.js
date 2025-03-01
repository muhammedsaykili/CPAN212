const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' // Allow React app to access
}));

// Sample data - Replace with your own fictitious data
const educationData = [
    {
        id: 1,
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        year: "2018 - 2022",
        description: "Graduated with honors. Focused on web development and database management."
    },
    {
        id: 2,
        institution: "Tech Bootcamp",
        degree: "Full-stack Web Development",
        year: "2022",
        description: "Intensive 12-week program covering modern JavaScript frameworks."
    }
];

const experienceData = [
    {
        id: 1,
        company: "Tech Solutions Inc.",
        position: "Junior Web Developer",
        year: "2022 - 2023",
        description: "Developed and maintained company websites. Implemented responsive designs and integrated APIs."
    },
    {
        id: 2,
        company: "Digital Innovations",
        position: "Frontend Developer",
        year: "2023 - Present",
        description: "Lead frontend development for client projects. Work with React, TypeScript, and modern CSS frameworks."
    }
];

const overviewData = {
    name: "Alex Johnson",
    title: "Frontend Developer",
    summary: "Passionate web developer with 3 years of experience creating responsive and user-friendly applications. Proficient in JavaScript, React, and Node.js. Looking for opportunities to create impactful digital experiences."
};

const skillsData = [
    { id: 1, name: "JavaScript", level: "Advanced" },
    { id: 2, name: "React", level: "Advanced" },
    { id: 3, name: "Node.js", level: "Intermediate" },
    { id: 4, name: "Express", level: "Intermediate" },
    { id: 5, name: "CSS/SCSS", level: "Advanced" },
    { id: 6, name: "HTML", level: "Advanced" },
    { id: 7, name: "Git", level: "Intermediate" },
    { id: 8, name: "MongoDB", level: "Basic" }
];

// API endpoints
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

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});