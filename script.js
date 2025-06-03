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
    const imgFile = document.getElementById('profileImg') ? document.getElementById('profileImg').files[0] : null;

    // Convert comma-separated values to HTML lists
    const skills = skillsInput
        .split(',')
        .map(a => a.trim())
        .filter(a => a)
        .map(skill => `<li>${skill}</li>`)
        .join('');
    const education = educationInput
        .split(',')
        .map(a => a.trim())
        .filter(a => a)
        .map(edu => `<li>${edu}</li>`)
        .join('');
    const workex = workexInput
        .split(',')
        .map(a => a.trim())
        .filter(a => a)
        .map(job => `<li>${job}</li>`)
        .join('');

    // Choose the template file based on user selection
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

    // Function to process and open the portfolio
    async function generatePortfolio(imgSrcHtml) {
        try {
            const response = await fetch(templateFile);
            let html = await response.text();

            html = html
                .replace(/{{name}}/g, name)
                .replace(/{{type}}/g, type)
                .replace(/{{email}}/g, email)
                .replace(/{{phone}}/g, phone)
                .replace('{{skills}}', skills)
                .replace('{{education}}', education)
                .replace('{{workex}}', workex)
                .replace('{{intro}}', intro)
                .replace('{{imgSrc}}', imgSrcHtml);

            const newTab = window.open();
            newTab.document.open();
            newTab.document.write(html);
            newTab.document.close();
        } catch (error) {
            alert('Error loading template. Make sure you’re using a local server and the template path is correct!');
            console.error(error);
        }
    }

    // If an image is selected, read it as a Data URL
    if (imgFile) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            const imgSrcHtml = `<img src="${evt.target.result}" alt="Profile Photo" style="width:100%;height:100%;max-width:220px;max-height:220px;object-fit:cover;border-radius:16px;margin:auto;display:block;background:#e2bcbc;">`;
            generatePortfolio(imgSrcHtml);
        };
        reader.readAsDataURL(imgFile);
    } else {
        // No image selected, use a placeholder
        const imgSrcHtml = `<img src="https://via.placeholder.com/220x220.png?text=Your+Photo" alt="Profile Photo" style="width:100%;height:100%;max-width:220px;max-height:220px;object-fit:cover;border-radius:16px;margin:auto;display:block;background:#e2bcbc;">`;
        generatePortfolio(imgSrcHtml);
    }
});
