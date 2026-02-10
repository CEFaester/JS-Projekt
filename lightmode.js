// kode af Coding2GO på YouTube - https://www.youtube.com/watch?v=_gKEUYarehE

const themeSwitch = document.getElementById('theme-switch');

const enableLightMode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightMode', 'active');
};

const disableLightMode = () => {
    document.body.classList.remove('lightmode');
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