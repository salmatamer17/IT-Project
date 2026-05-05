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
      recipe.appendChild(noResultsMsg);
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
