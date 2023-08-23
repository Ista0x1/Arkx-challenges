const toggleButton = document.getElementById('darkModeToggle');
const currentTheme = localStorage.getItem('theme'); 

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleButton.textContent = 'Toggle Light Mode';
    }
}

toggleButton.addEventListener('click', function () {
    let theme = 'light'; // default to light theme
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        theme = 'dark';
        toggleButton.textContent = 'Toggle Light Mode';
    } else {
        toggleButton.textContent = 'Toggle Dark Mode';
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save theme preference
});
