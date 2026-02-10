const themeSwitch = document.getElementById('theme-switch');

const enableLightMode = () => {
    document.body.classList.add('lightmode'); // Rettet: ingen bindestreg
    localStorage.setItem('lightMode', 'active');
};

const disableLightMode = () => {
    document.body.classList.remove('lightmode'); // Rettet: ingen bindestreg
    localStorage.removeItem('lightMode');
};

// Tjek ved indlæsning
if (localStorage.getItem('lightMode') === 'active') {
    enableLightMode();
}

themeSwitch.addEventListener('click', () => {
    const isLight = localStorage.getItem('lightMode') === 'active';
    isLight ? disableLightMode() : enableLightMode();

    themeSwitch.blur();
});