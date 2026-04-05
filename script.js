


// Data Source

const projects = [
    {
        id: 1,
        title: "Responsive Website Design",
        description: "A responsive website built with HTML5 and CSS3 that adapts seamlessly to all device sizes.",
        category: "Web Design",
        imageURL: "https://via.placeholder.com/400x250/3498db/ffffff?text=Web+Design",
        link: "#project1",
        tags: ["HTML", "CSS", "Responsive"]
    },
    {
        id: 2,
        title: "JavaScript Todo App",
        description: "Interactive todo list application with add, edit, and delete functionality using vanilla JavaScript.",
        category: "JavaScript",
        imageURL: "https://via.placeholder.com/400x250/2ecc71/ffffff?text=Todo+App",
        link: "#project2",
        tags: ["JavaScript", "Interactive", "DOM"]
    },
    {
        id: 3,
        title: "E-Commerce Product Page",
        description: "Modern e-commerce product showcase with dynamic filtering and shopping cart functionality.",
        category: "Full Stack",
        imageURL: "https://via.placeholder.com/400x250/e74c3c/ffffff?text=E-Commerce",
        link: "#project3",
        tags: ["HTML", "CSS", "JavaScript", "UI/UX"]
    },
    {
        id: 4,
        title: "Mobile App UI Kit",
        description: "Comprehensive UI kit designed for mobile applications with modern design patterns and components.",
        category: "UI/UX Design",
        imageURL: "https://via.placeholder.com/400x250/f39c12/ffffff?text=Mobile+UI",
        link: "#project4",
        tags: ["Design", "Figma", "Mobile"]
    },
    {
        id: 5,
        title: "Weather Dashboard",
        description: "Real-time weather dashboard that fetches data from an API and displays current conditions and forecast.",
        category: "Web Design",
        imageURL: "https://via.placeholder.com/400x250/9b59b6/ffffff?text=Weather+App",
        link: "#project5",
        tags: ["API", "JavaScript", "Real-time"]
    },
    {
        id: 6,
        title: "Portfolio Website",
        description: "Personal portfolio website showcasing projects and skills with smooth animations and transitions.",
        category: "Web Design",
        imageURL: "https://via.placeholder.com/400x250/1abc9c/ffffff?text=Portfolio",
        link: "#project6",
        tags: ["HTML", "CSS", "Animations"]
    }
];

// Log the projects array
console.log("Projects Data Loaded:", projects);
console.log("Total Projects:", projects.length);


// Initializes the app and renders project cards on DOM load

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing rendering engine...");
    renderProjectCards(projects);
});

/**
 * Renders all project cards by iterating through the projects array
 * and injecting generated HTML into the container
 * @param {Array} projectsToRender - Array of project objects to render
 */
function renderProjectCards(projectsToRender) {
    const container = document.getElementById('projects-container');
    
    if (!container) {
        console.error("Error: Container with ID 'projects-container' not found!");
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Check if there are projects to render
    if (projectsToRender.length === 0) {
        container.innerHTML = '<p class="no-results">No projects found.</p>';
        return;
    }
    
    // Iterate through projects and create cards
    projectsToRender.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
    
    console.log(`Rendered ${projectsToRender.length} project cards`);
}

/**
 * Creates a single project card element from project object
 * @param {Object} project - Project object with properties: id, title, description, category, imageURL, link, tags
 * @returns {HTMLElement} - The constructed article element for the project card
 */
function createProjectCard(project) {
    // Create the article element (card container)
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);
    card.setAttribute('data-category', project.category);
    
    // Build the card HTML structure using template literals
    card.innerHTML = `
        <img src="${project.imageURL}" alt="${project.title}" class="card-image">
        <div class="card-badge">${project.category}</div>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-description">${project.description}</p>
        <div class="card-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <a href="${project.link}" class="view-btn">View Project</a>
    `;
    
    return card;
}


