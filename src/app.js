import Artists from './artists';
import Gallery from './gallery';
import HomePage from './home-page';
import Navigation from './navigation';

$(document).ready(function () {
    let controller;
    $('#main-nav').append(Navigation.getNavigation());
    var path = window.location.pathname.toLowerCase();
    if (path === '/index.html' || path === '/') {
        controller = new HomePage();
    } else if (path === '/gallery.html') {
        controller = new Gallery();
    } else if (path === '/artists.html') {
        controller = new Artists();
    }
    if (controller) {
        controller.init();
    }
});