


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
    }
];

// Log the projects array
console.log("Projects Data Loaded:", projects);
console.log("Total Projects:", projects.length);


// Initializes the app and renders project cards on DOM load

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing rendering engine...");
    renderProjectCards(projects);
    setupSearchFunctionality();
    setupFilterButtons();
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


/**
 * Sets up real-time search functionality
 * Attaches event listener to search input for live filtering
 */
function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    
    if (!searchInput) {
        console.warn("Warning: Search input with ID 'search-input' not found!");
        return;
    }
    
    // Add event listener for real-time search as user types
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        console.log("Search term:", searchTerm);
        
        // Filter projects based on search term
        const filteredProjects = filterProjectsBySearch(projects, searchTerm);
        
        // Reset category filter and render results
        resetFilterButtons();
        renderProjectCards(filteredProjects);
    });
}

/**
 * Filters projects based on search term
 * Searches across title, description, category, and tags
 * @param {Array} projectList - Array of projects to search through
 * @param {String} searchTerm - The search query (case-insensitive)
 * @returns {Array} - Filtered array of matching projects
 */
function filterProjectsBySearch(projectList, searchTerm) {
    // Return all projects if search term is empty
    if (!searchTerm.trim()) {
        return projectList;
    }
    
    return projectList.filter(project => {
        // Search in title
        const titleMatch = project.title.toLowerCase().includes(searchTerm);
        
        // Search in description
        const descriptionMatch = project.description.toLowerCase().includes(searchTerm);
        
        // Search in category
        const categoryMatch = project.category.toLowerCase().includes(searchTerm);
        
        // Search in tags
        const tagsMatch = project.tags.some(tag => 
            tag.toLowerCase().includes(searchTerm)
        );
        
        // Return true if any field matches
        return titleMatch || descriptionMatch || categoryMatch || tagsMatch;
    });
}

/**
 * Sets up category filter buttons
 * Attaches event listeners for category filtering
 */
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-filter');
            console.log("Filter selected:", selectedCategory);
            
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Clear search input
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Filter and render projects by category
            let filteredProjects;
            if (selectedCategory === 'all') {
                filteredProjects = projects;
            } else {
                filteredProjects = projects.filter(project => 
                    project.category === selectedCategory
                );
            }
            
            renderProjectCards(filteredProjects);
        });
    });
}

// Resets filter buttons to show all projects
function resetFilterButtons() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
}
