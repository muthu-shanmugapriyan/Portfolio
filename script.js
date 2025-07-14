const sideMenu = document.querySelector("#sideMenu");
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

function openMenu() {
  sideMenu.style.transform = "translateX(-16rem)";
}
function closeMenu() {
  sideMenu.style.transform = "translateX(16rem)";
}

window.addEventListener("scroll", () => {
  if (scrollY > 50) {
    navBar.classList.add(
      "bg-white",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "shadow-sm",
      "dark:bg-darkTheme",
      "dark:shadow-white/20"
    );
    navLinks.classList.remove(
      "bg-white",
      "shadow-sm",
      "bg-opacity-50",
      "dark:border",
      "dark:border-white/50",
      "dark:bg-transparent"
    );
  } else {
    navBar.classList.remove(
      "bg-white",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "shadow-sm",
      "dark:bg-darkTheme",
      "dark:shadow-white/20"
    );
    navLinks.classList.add(
      "bg-white",
      "shadow-sm",
      "bg-opacity-50",
      "dark:border",
      "dark:border-white/50",
      "dark:bg-transparent"
    );
  }
});

// -------- light mode and dark mode -----------

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.theme = "dark";
  } else {
    localStorage.theme = "light";
  }
}

// --- DYNAMIC PROJECT SLIDER ---

// 1. YOUR PROJECT DATA
// To add a new project, just copy a block and fill in your details.

// 690*390
const projects = [
  {
    image: "./images/work-1.png",
    title: "3D Portfolio Website Using React",
    description:
      "A responsive and modern web design showcasing front-end skills with interactive elements.",
    link: "https://my-portfolio-theta-six-67.vercel.app/", // Add the live URL here
    githubLink: "https://github.com/muthu-shanmugapriyan/My-Portfolio", // Add the GitHub repo URL here
  },
  {
    image: "./images/work-2.png",
    title: "Geo Based App",
    description:
      "A mobile application concept that uses geolocation to provide location-based services and data.",
    link: "#", // Add the live URL here
    githubLink: "#", // Add the GitHub repo URL here
  },
  {
    image: "./images/work-3.png",
    title: "Photography Site",
    description:
      "A clean and visually appealing portfolio website designed for a professional photographer.",
    link: "#", // Add the live URL here
    githubLink: "#", // Add the GitHub repo URL here
  },
  {
    image: "./images/work-4.png",
    title: "UI/UX Designing",
    description:
      "A comprehensive UI/UX design project focusing on user-centered design principles and a seamless user experience.",
    link: "#", // Add the live URL here
    githubLink: "#", // Add the GitHub repo URL here
  },
  // --- ADD NEW PROJECTS ABOVE THIS LINE ---
];

const projectContainer = document.getElementById("project-container");

// 2. Function to create and inject project cards into the HTML
function displayProjects() {
  projectContainer.innerHTML = ""; // Clear existing projects
  projects.forEach((project) => {
    const projectCard = `
          <div class="w-full flex-shrink-0 snap-center p-4">
          <div class="group rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2" 
     style="background-color: #2a004a4d;">

              <img
                src="${project.image}"
                alt="${project.title}"
                class="w-full aspect-video object-cover"
              />
              <div class="p-6">
                <h3 class="font-semibold text-xl mb-2 dark:text-white">${project.title}</h3>
                <p class="text-gray-600 dark:text-white/80 mb-4">${project.description}</p>
                <div class="flex items-center gap-4 mt-5">
                  <a
                    href="${project.link}"
                    target="_blank"
                    
                    class="inline-block bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out group-hover:scale-105 shadow-md hover:shadow-lg hover:shadow-fuchsia-400/50"
                  >
                    Visit Site
                  </a>
                  <a href="${project.githubLink}" target="_blank" class="group">
                     <img src="./images/github1.png" alt="GitHub" class="w-7 h-7 transition-transform duration-300 ease-in-out group-hover:scale-110">
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
    projectContainer.innerHTML += projectCard;
  });
}

// 3. Slider Controls and Auto-Scroll
const scrollLeftBtn = document.getElementById("scroll-left");
const scrollRightBtn = document.getElementById("scroll-right");

if (projectContainer && scrollLeftBtn && scrollRightBtn) {
  const scrollAmount = () => projectContainer.clientWidth;

  scrollLeftBtn.addEventListener("click", () => {
    projectContainer.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", () => {
    projectContainer.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });

  // Auto-scroll functionality
  let autoScrollInterval = setInterval(() => {
    // If we are at the end, scroll to the beginning
    if (
      projectContainer.scrollLeft + projectContainer.clientWidth >=
      projectContainer.scrollWidth - 10
    ) {
      projectContainer.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      projectContainer.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    }
  }, 4000); // Scrolls every 4 seconds

  // Stop auto-scroll on mouse hover
  projectContainer.addEventListener("mouseenter", () =>
    clearInterval(autoScrollInterval)
  );

  // Resume auto-scroll when mouse leaves
  projectContainer.addEventListener("mouseleave", () => {
    autoScrollInterval = setInterval(() => {
      if (
        projectContainer.scrollLeft + projectContainer.clientWidth >=
        projectContainer.scrollWidth - 10
      ) {
        projectContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        projectContainer.scrollBy({ left: scrollAmount(), behavior: "smooth" });
      }
    }, 4000);
  });
}

// Initial display of projects when the page loads
displayProjects();
