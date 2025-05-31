export default class Navigation {
    static getNavigation() {
        return `<div class="container">
            <a class="navbar-brand" href="index.html">Gonzalez Art Foundation</a>
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="gallery.html">Gallery</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="artists.html?letter=a">Artists</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="about.html">About</a>
                </li>
            </ul>
        </div>`;
    }
}