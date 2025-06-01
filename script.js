document.getElementById('portfolioForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get user input
    const name = document.getElementById('name').value;
    const type = document.getElementById('typeofeng').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('pnumber').value;
    const skillsInput = document.getElementById('Skills').value;
    const educationInput = document.getElementById('education').value;
    const workexInput = document.getElementById('workex').value;
    const intro = document.getElementById('briefintro').value;

    // Split comma-separated values into arrays and clean them up
    const skills = skillsInput.split(',').map(a => a.trim()).filter(a => a);
    const education = educationInput.split(',').map(a => a.trim()).filter(a => a);
    const workex = workexInput.split(',').map(a => a.trim()).filter(a => a);

    // HTML template for the portfolio
    const portfolioHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${name} - Portfolio</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #f5f7fa;
            color: #333;
            margin: 0;
            padding: 0;
        }
        header {
            background: #4f8cff;
            color: white;
            text-align: center;
            padding: 2rem 0 1rem 0;
        }
        header h1 { margin: 0; font-size: 2.5rem; }
        header p { margin: 0.5rem 0 0 0; font-size: 1.25rem; font-weight: 300; }
        section {
            max-width: 600px;
            margin: 2rem auto;
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        h2 { margin-top: 2rem; color: #4f8cff; }
        ul { list-style: disc; padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
        .info { margin-bottom: 1rem; }
        footer {
            text-align: center;
            padding: 1rem 0;
            background: #e9ecef;
            color: #888;
            font-size: 0.9rem;
            position: fixed;
            width: 100%;
            bottom: 0;
        }
    </style>
</head>
<body>
    <header>
        <h1>${name}</h1>
        <p>${type}</p>
    </header>
    <section>
        <div class="info"><strong>Email:</strong> ${email} &nbsp; <strong>Phone:</strong> ${phone}</div>
        <h2>Skills</h2>
        <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
        <h2>Education</h2>
        <ul>
            ${education.map(edu => `<li>${edu}</li>`).join('')}
        </ul>
        <h2>Work Experience</h2>
        <ul>
            ${workex.map(work => `<li>${work}</li>`).join('')}
        </ul>
        <h2>About Me</h2>
        <p>${intro}</p>
    </section>
    <footer>
        &copy; 2025 ${name}
    </footer>
</body>
</html>
    `;

    // Open new tab and write the portfolio HTML
    const newTab = window.open();
    newTab.document.open();
    newTab.document.write(portfolioHTML);
    newTab.document.close();
});
