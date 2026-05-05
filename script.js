const recipecontent = document.querySelector('.grid');
const searchbar = document.querySelector('#search');
const searchButton = document.querySelector('#searchButton');

function closeAllRecipes() {
  const allExtraContent = document.querySelectorAll('.extra-content.open');
const allButtons = document.querySelectorAll('.view-btn');
  
  allExtraContent.forEach(content => {
    content.classList.remove('open');
  });
  
  allButtons.forEach(btn => {
    btn.textContent = 'View Recipe';
    btn.closest('.recipe-card').classList.remove('expanded');
  });
}

function handleView(event) {
  const button = event.target.closest('.view-btn');
  if (!button) return;

  const targetId = button.dataset.target;
  const details = document.getElementById(targetId);
  const card = button.closest('.recipe-card');
  
  if (!details || !card) return;

  if (details.classList.contains('open')) {
    details.classList.remove('open');
    card.classList.remove('expanded');
    button.textContent = 'View Recipe';
  } else {
    closeAllRecipes();
    
    details.classList.add('open');
    card.classList.add('expanded');
    button.textContent = 'View Less';
  }
}

// search bar filtering
function filterRecipes(searchTerm) {
  const cards = document.querySelectorAll('.recipe-card');
  const normalized = searchTerm.trim().toLowerCase();
  
  let visibleCount = 0;
  
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const description = card.querySelector('.card-subtitle').textContent.toLowerCase();
    const category = card.querySelector('.badge').textContent.toLowerCase();
    
    const matches = title.includes(normalized) || 
                   description.includes(normalized) || 
                   category.includes(normalized);
    
    if (normalized === '' || matches) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show "no results" message if needed
  if (visibleCount === 0 && normalized !== '') {
    let noResultsMsg = document.querySelector('.no-results');
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.className = 'no-results';
      noResultsMsg.style.cssText = 'grid-column: 1 / -1; padding: 2rem; text-align: center;';
      recipecontent.appendChild(noResultsMsg);
    }
    noResultsMsg.textContent = 'No recipes match your search. Try a different name.';
  } else {
    const noResultsMsg = document.querySelector('.no-results');
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
}

searchbar.addEventListener('input', (e) => {
  filterRecipes(e.target.value);
});

searchButton.addEventListener('click', () => {
  filterRecipes(searchbar.value);
});

recipecontent.addEventListener('click', handleView);

document.querySelectorAll('.recipe-card').forEach(card => {
  card.classList.add('visible');
});

// Dark mode toggle
const themeToggle = document.querySelector('#theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
  }
});

// Register Form Validation and Submission
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passError = document.getElementById("passError");

        let isValid = true;

        if (fullName === "") {
            nameError.textContent = "Please enter your name";
            isValid = false;
        } else if (fullName.length < 3) {
            nameError.textContent = "Name must be at least 3 characters";
            isValid = false;
        } else {
            nameError.textContent = "";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            emailError.textContent = "Please enter your email";
            isValid = false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email address";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        if (password === "") {
            passError.textContent = "Please enter your password";
            isValid = false;
        } else if (password.length < 6) {
            passError.textContent = "Password must be at least 6 characters";
            isValid = false;
        } else {
            passError.textContent = "";
        }

        if (isValid) {
            localStorage.setItem("userName", fullName);
            localStorage.setItem("userEmail", email);

            alert("Registration successful! Welcome, " + fullName);
            window.location.href = "home.html";
        }
    });
}
/*form registertion*/
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  localStorage.setItem("user", JSON.stringify({
    username,
    email,
    password
  }));

  localStorage.setItem("isLoggedIn", "true");

  window.location.href = "home.html";
