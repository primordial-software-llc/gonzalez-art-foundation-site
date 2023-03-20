import Artists from './artists';
import Gallery from './gallery';
import HomePage from './home-page';
import Navigation from './navigation';

$(document).ready(function () {
    let controller;
    $('#main-nav').append(Navigation.getNavigation());
    let path = window.location.pathname.toLowerCase();
    if (path.endsWith('/index.html') || path === '/') {
        controller = new HomePage();
    } else if (path.endsWith('/gallery.html')) {
        controller = new Gallery();
    } else if (path.endsWith('/artists.html')) {
        controller = new Artists();
    }
    if (controller) {
        controller.init();
    }
});