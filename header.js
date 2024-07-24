window.addEventListener('load', () => {
    addHeadContent();
    addHeader();
    addFooter();

    setTimeout(() => {
        document.querySelector('body').style.display = 'block';
    }, '50');
});
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body').style.display = 'none';
});

const file_map = {
    // '/': 'Accueil',
    '/fractal/': 'Fractal',
    '/game_of_life/': 'Jeu de la vie',
    '/minecraft_beacon/': 'Beacon Minecraft',
    '/hanoi_tower/': 'Tour de Hanoi',
    '/spiral_ulam/': "Spirale d'Ulam",
};

function baliseClass(name_balise, class_balise, balise_parent, content) {
    const balise = document.createElement(name_balise);
    balise.className = class_balise;
    if (balise_parent) {
        balise_parent.appendChild(balise);
    }
    balise.textContent = content;
    return balise;
}

function addHeadContent() {
    const head = document.querySelector('head');

    const metaCharset = baliseClass('meta', '', head);
    metaCharset.setAttribute('charset', 'utf-8');

    const metaViewport = createMetaTag(head, 'viewport', 'width=device-width, initial-scale=1.0');
    const metaKeyword = createMetaTag(head, 'keywords', 'HTML, CSS, JavaScript');
    const metaAuthor = createMetaTag(head, 'author', 'Donovan Ferreira');
    const metaDescription = createMetaTag(
        head,
        'description',
        'Experimentation de Donovan Ferreira'
    );

    setTitle();
    createLinkFontAwesome(head);
    createLinkBoostrapStyle(head);
    createLinkMainCSS(head);
    // createLinkMainScript(head);
    createLinkBoostrapScript(head);
    createLinkChartJsScript(head);
}

function createMetaTag(head, name, content) {
    const metaViewport = baliseClass('meta', '', head);
    metaViewport.name = name;
    metaViewport.content = content;
}

function addHeader() {
    const headers = document.querySelector('header');

    let h1 = baliseClass('h1', '', headers, 'Experimentation de Donovan Ferreira');
    let h2 = baliseClass('h2', '', headers, "Developpeur d'application");
    let nav = baliseClass('nav', 'nav-bar row row-cols-2 row-cols-md-4', headers);
    const urlRoot = getURlRoot();
    Object.keys(file_map).forEach((key) => {
        createLinkNav(nav, `${urlRoot}${key}`, file_map[key]);
    });
}

function createLinkNav(nav, href, text) {
    let link = baliseClass('a', 'nav-bar-link', nav, text);
    link.href = href;
    if (document.title === text) {
        link.classList.add('active');
    }
}

function getURlRoot() {
    const pathname = window.location.pathname.replace('/experimentation', '');
    const href = window.location.href;
    const regexName = new RegExp(pathname + '$');
    let urlRoot = href.replace(regexName, '');
    return urlRoot;
}
function setTitle() {
    const pathname = window.location.pathname;
    document.title = file_map[pathname];
}

function addFooter() {
    const footer = document.getElementsByTagName('footer')[0];
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerHTML = 'Copyright © 2024 Donovan Ferreira. Tous droits réservés.';
    div.appendChild(span);
    footer.appendChild(div);
}

function createLink(head, href, rel, integrity, crossorigin) {
    let balise = document.createElement('script');
    balise.src = href;
    if (['stylesheet', 'preconnect'].includes(rel)) {
        balise = document.createElement('link');
        balise.rel = rel;
        balise.href = href;
    }
    if (integrity) {
        balise.integrity = integrity;
    }
    if (crossorigin) {
        balise.crossOrigin = crossorigin;
    }
    head.appendChild(balise);
}

function createLinkFontAwesome(head) {
    createLink(
        head,
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        'stylesheet'
    );
}

function createLinkBoostrapStyle(head) {
    createLink(
        head,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'stylesheet',
        'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH',
        'anonymous'
    );
}

function createLinkMainCSS(head) {
    let nameFileCss = `${getURlRoot()}/style.css`;
    createLink(head, nameFileCss, 'stylesheet');
}

// function createLinkMainScript(head) {
//     if (document.title !== 'Accueil') {
//         createLink(head, './script.js', 'script');
//     }
// }

function createLinkBoostrapScript(head) {
    createLink(
        head,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
        'script',
        'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz',
        'anonymous'
    );
}

function createLinkChartJsScript(head) {
    createLink(head, 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js', 'script');
}
