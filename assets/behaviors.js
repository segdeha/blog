import initProgress from './scroll-position.js';

// show progress bar as the user scrolls through an article
document.addEventListener('DOMContentLoaded', initProgress);

// apply syntax highlighting
document.addEventListener('DOMContentLoaded', () => {
    sh_highlightDocument('/blog/assets/shjs/lang/', '.js');
});

// preload prev/next images
document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-preload-img]');
    for (let i = 0; i < els.length; i += 1) {
        let src = els[i].dataset.preloadImg;
        let img = new Image();
        img.src = src;
    }
});
