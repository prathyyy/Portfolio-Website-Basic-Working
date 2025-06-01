document.getElementById('portfolioForm').addEventListener('submit', async (e) => {
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

    // Convert inputs to HTML lists
    const skills = skillsInput.split(',').map(a => `<li>${a.trim()}</li>`).join('');
    const education = educationInput.split(',').map(a => `<li>${a.trim()}</li>`).join('');
    const workex = workexInput.split(',').map(a => `<li>${a.trim()}</li>`).join('');

    // Determine template file
    let templateFile;
    switch (type) {
        case 'Software Engineer':
            templateFile = 'templates/software.html';
            break;
        case 'Mechanical Engineer':
            templateFile = 'templates/mechanical.html';
            break;
        default:
            templateFile = 'templates/general.html';
    }

    try {
        // Fetch the template
        const response = await fetch(templateFile);
        let html = await response.text();

        // Replace placeholders with data
        const currentYear = new Date().getFullYear();
        html = html
            .replace(/{{name}}/g, name)
            .replace(/{{email}}/g, email)
            .replace(/{{phone}}/g, phone)
            .replace('{{skills}}', skills)
            .replace('{{education}}', education)
            .replace('{{workex}}', workex)
            .replace('{{intro}}', intro)
            .replace(/{{year}}/g, currentYear);

        // Open new tab with generated HTML
        const newTab = window.open();
        newTab.document.open();
        newTab.document.write(html);
        newTab.document.close();
    } catch (error) {
        alert('Error loading template. Make sure you’re using a local server!');
    }
});
