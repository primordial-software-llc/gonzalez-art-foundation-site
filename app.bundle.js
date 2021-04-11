(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _gallery = _interopRequireDefault(require("./gallery"));

var _homePage = _interopRequireDefault(require("./home-page"));

var _navigation = _interopRequireDefault(require("./navigation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
  let controller;
  $('#main-nav').append(_navigation.default.getNavigation());
  var path = window.location.pathname.toLowerCase();

  if (path === '/index.html' || path === '/') {
    controller = new _homePage.default();
  } else if (path === '/gallery.html') {
    controller = new _gallery.default();
  }

  if (controller) {
    controller.init();
  }
});

},{"./gallery":2,"./home-page":3,"./navigation":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(require("./url"));

var _slideshowSettingsForm = _interopRequireDefault(require("./slideshow-settings-form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ApiBase = 'https://api.gonzalez-art-foundation.org/';

class Gallery {
  constructor() {
    this.hasMovedMouseOnImageViewerPage = false;
  }

  assertSuccess(response, json) {
    if (!response || response.status < 200 || response.status > 299) {
      if (json && json.ExceptionMessage === 'Not authenticated') {
        alert('Please Login');
      } else {
        console.log(response);
        console.log(json);
        alert('Failed to get data: ' + JSON.stringify(json, 0, 4));
      }

      return false;
    }

    return true;
  }

  showCurrentImage() {
    let slideshowItems = JSON.parse(localStorage.getItem('slideshowData'));
    let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex"));

    if (isNaN(slideshowIndex)) {
      alert('No images selected. Use the search on the home page to queue images for viewing.');
      location.href = 'https://www.gonzalez-art-foundation.org';
      return;
    }

    let currentImage = slideshowItems[slideshowIndex];
    $('#slideshow-index').html(slideshowIndex + 1);
    $('#slideshow-count').html(slideshowItems.length);
    this.showImage(currentImage);
  }

  showImage(currentImage) {
    $('#slideshow-image').prop('src', `${ApiBase}unauthenticated/cache-everything/image?path=${currentImage.s3Path}`);
    let link = (currentImage.sourceLink || '').replace('http://', 'https://');
    let linkText;

    if (currentImage.source === 'http://images.nga.gov') {
      linkText = 'Courtesy National Gallery of Art, Washington';
    } else if (currentImage.source === 'http://www.musee-orsay.fr') {
      linkText = 'Courtesy Musée d\'Orsay in Paris, France';
    } else if (currentImage.source === 'https://www.pop.culture.gouv.fr/notice/museo/M5031') {
      linkText = 'Courtesy Musée du Louvre in Paris, France';
    } else if (currentImage.source === 'https://www.pop.culture.gouv.fr') {
      linkText = 'Ministère de la Culture in France';
    } else if (currentImage.source === 'https://www.moma.org') {
      linkText = 'The Museum of Modern Art in New York, United States';
    } else if (currentImage.source === 'http://www.the-athenaeum.org') {
      linkText = "Courtesy The Athenaeum";
      link = 'https://www.the-athenaeum.org/art/detail.php?ID=' + currentImage.pageId;
    }

    $('#slideshow-image-info').empty().append($('<span>').text(`${currentImage.name} (${currentImage.date}) by ${currentImage.originalArtist} - `)).append($(`<a target="_blank">`).attr('href', link).text(linkText)).append($('<span>').text(` - Image id ${currentImage.pageId}`));
  }

  previousImage() {
    let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex", 0));
    localStorage.setItem("slideshowIndex", slideshowIndex - 1);
    this.showCurrentImage();
  }

  nextImage() {
    let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex", 0));
    localStorage.setItem("slideshowIndex", slideshowIndex + 1);
    this.showCurrentImage();
  }

  pauseSlideshow() {
    clearInterval(this.slideshowTimer);
    $('#slideshow-pause').hide();
    $('#slideshow-play').show();
  }

  showPlayer() {
    this.hasMovedMouseOnImageViewerPage = true;
    $(".slideshow-player").slideDown("slow", function () {
      $(".slideshow-player").show();
      $('#slideshow-image-container').removeClass('hide-controls');
    });
    $('body').css('cursor', '');
  }

  hidePlayer() {
    $('body').css('cursor', 'none');
    $(".slideshow-player").slideUp("slow", function () {
      $(".slideshow-player").hide();
      $('#slideshow-image-container').addClass('hide-controls');
    });
  }
  /**
   * Chrome requires full-screen mode to be user engaged.
   */


  showFullscreen() {
    this.hidePlayer();
    let element = document.getElementsByTagName('html')[0];

    if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  tryHidePlayer() {
    if (!this.hasMovedMouseOnImageViewerPage) {
      this.hidePlayer();
    }

    this.hasMovedMouseOnImageViewerPage = false;
  }

  isFullScreen() {
    return window.fullScreen || window.innerWidth === screen.width && window.innerHeight === screen.height;
  }

  init() {
    let self = this;

    let source = _url.default.getUrlParameter('source');

    let pageId = _url.default.getUrlParameter('pageId');

    if (source && pageId) {
      $('#slideshow-controls').addClass('hide');
      $('#slideshow-image-container').addClass('single-image-mode');
      fetch(`${ApiBase}unauthenticated/cache-everything/image-classification?source=${encodeURIComponent(source)}&pageId=${encodeURIComponent(pageId)}`, {
        mode: 'cors'
      }).then(function (response) {
        response.json().then(json => {
          if (self.assertSuccess(response, json)) {
            self.showImage(json);
          }
        }).catch(function (error) {
          console.log('Failed to get data:');
          console.log(error);
        });
      });
    } else {
      this.showCurrentImage();
    }

    $('#slideshow-return-home').click(() => {
      window.location = "/";
    });
    $('#slideshow-fullscreen').click(() => {
      self.showFullscreen();
    });
    $(document).mousemove(() => {
      if (!self.isFullScreen()) {
        self.showPlayer();
      }
    });
    $(document).keypress(() => {
      if (!self.isFullScreen()) {
        self.showPlayer();
      }
    });
    setInterval(function () {
      self.tryHidePlayer();
    }, 15000);
    $('#slideshow-previous').click(function () {
      self.previousImage();
      self.pauseSlideshow();
    });
    $('#slideshow-next').click(function () {
      self.nextImage();
      self.pauseSlideshow();
    });
    let defaultInterval = 6;
    $('#slideshow-interval').val(defaultInterval);
    $('#slideshow-pause').hide().click(() => {
      self.pauseSlideshow();
    });
    $('#slideshow-play').click(function () {
      function slideshowTimerAction() {
        self.nextImage();
      }

      let intervalInMs = parseFloat($('#slideshow-interval').val()) * 1000;
      self.slideshowTimer = setInterval(slideshowTimerAction, intervalInMs);
      $('#slideshow-pause').show();
      $('#slideshow-play').hide();
    });
    $('#slideshow-settings').click(function () {
      let slideShowSettingsForm = new _slideshowSettingsForm.default();
      $('body').append(slideShowSettingsForm.getView());
    });
  }

}

exports.default = Gallery;

},{"./slideshow-settings-form":5,"./url":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const ApiBase = 'https://api.gonzalez-art-foundation.org/';

class HomePage {
  loadSearchResults(results) {
    let summary = $('<div id="search-results-summary"></div>');
    summary.text(`Works of art found: ${results.length}`);
    $('#search-results').append(summary);
    let searchItems = $('<div id="slideshow-start"></div>');
    searchItems.append(`
            <img class="slideshow-start-image" src="/images/Glyphicons/glyphicons-9-film.png">
            <span class="slideshow-start-text">Start Slideshow</span>
        `);
    $('#search-results').append(searchItems);
    let resultRow;

    for (let ct = 0; ct < results.length; ct++) {
      let result = results[ct];

      if (ct === 0 || ct % 3 == 0 || ct === results.length) {
        resultRow = $('<div class="row image-search-row"></div>');
        $('#search-results').append(resultRow);
      }

      let imageLinkContainer = $('<div class="col-4 text-center"></div>');
      let image = $(`<img id="slideshow-image" class="image-search-item" />`).prop('src', `${ApiBase}unauthenticated/cache-everything/image?path=${result.s3Path}&thumbnail=thumbnail`);
      let imageWrapper = $('<div class="image-search-item-image-wrapper"></div>');
      imageWrapper.append(image);
      let imageUrl = `/gallery.html?source=${encodeURIComponent(result.source)}&pageId=${encodeURIComponent(result.pageId)}`;
      image.click(function () {
        window.open(imageUrl, "_blank");
      });
      imageLinkContainer.append(imageWrapper);
      let imageLink = $('<a target="_blank"></a>');
      imageLink.attr('href', imageUrl);
      imageLink.attr('title', result.source + ' - ' + result.pageId);
      imageLink.text(result.name + ' (' + result.date + ') by ' + result.originalArtist);
      let imageLinkWrapper = $('<div></div>');
      imageLinkWrapper.append(imageLink);
      imageLinkContainer.append(imageLinkWrapper);
      resultRow.append(imageLinkContainer);
    }

    $('#slideshow-start').click(function () {
      localStorage.setItem("slideshowData", JSON.stringify(results));
      localStorage.setItem("slideshowIndex", 0);
      window.location = "/gallery.html";
    });
    $('#image-search')[0].scrollIntoView();
  }

  assertSuccess(response, json) {
    if (!response || response.status < 200 || response.status > 299) {
      console.log(response);
      console.log(json);
      alert('Failed to get data: ' + JSON.stringify(json, 0, 4));
      return false;
    }

    return true;
  }

  async loadSearchResultsFromUrl(url) {
    $('#search-results').empty();
    $('.loader-group').removeClass('hide');

    try {
      let response = await fetch(url, {
        credentials: "same-origin"
      });
      let json = await response.json();

      if (this.assertSuccess(response, json)) {
        this.loadSearchResults(json);
      }
    } catch (error) {
      console.log('Failed to get data:');
      console.log(error);
    } finally {
      $('.loader-group').addClass('hide');
    }
  }

  init() {
    const self = this; //let onLoadSearchText = this.getUrlParameter('search');
    //if (onLoadSearchText) {
    // UPDATE THIS. I WANT TO FIND ALL LIKE ARTISTS TO CLICK AN ARTIST NAME IN THE IMAGE VIEWER/GALLERY/HERE
    // AND SEE THOSE ARTISTS WORKS OF ARTS.
    // TAGS CAN COME BACK LATER. THERE IS NOT ADEQUATE TAGGING TO USE THE FEATURE RIGHT NOW PUBLICLY.
    //}

    $('input[name=search-type]').change(function () {
      let selectedType = $('input[name=search-type]:checked').val();

      if (selectedType === 'search-by-text') {
        $('.site-input-group').hide();
        $('.last-id-input-group').hide();
        $('.search-text-input-group').show();
        $('#search-text').val('van gogh');
      } else if (selectedType === 'view-from-last-id') {
        $('.site-input-group').show();
        $('.last-id-input-group').show();
        $('.search-text-input-group').hide();
        $('#search-last-id').val('0');
      }
    });
    $('#run-search').click(function () {
      let selectedType = $('input[name=search-type]:checked').val();
      let url;

      if (selectedType === 'search-by-text') {
        url = `${ApiBase}unauthenticated/search` + `?maxResults=${encodeURIComponent($('#max-results').val())}` + `&searchText=${encodeURIComponent($('#search-text').val())}`;
      } else if (selectedType === 'view-from-last-id') {
        url = `${ApiBase}unauthenticated/scan` + `?maxResults=${encodeURIComponent($('#max-results').val())}` + `&lastPageId=${encodeURIComponent($('#search-last-id').val())}` + `&source=${encodeURIComponent($('#siteSelection').val())}`;
      }

      self.loadSearchResultsFromUrl(url);
    });
    $('input[name=search-type]').change();
    $('.view-more-works-by-featured-artist').click(function () {
      $('#exact-artist').prop('checked', true);
      $('#search-text').val('Sir Lawrence Alma-Tadema');
      $('#max-results').val(0);
      $('#run-search').click();
    });
  }

}

exports.default = HomePage;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Navigation {
  static getNavigation() {
    return `<div class="container">
            <nav class="navbar navbar-light">
                <a class="navbar-brand" href="index.html">Gonzalez Art Foundation</a>
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="gallery.html">Gallery</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about.html">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="legal.html">Legal</a>
                    </li>
                </ul>
            </nav>
        </div>`;
  }

}

exports.default = Navigation;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SlideShowSettingsForm {
  getView() {
    return $(`
            <div class="container">
                <h2>Slideshow Settings</h2>
                <div class="input-form form-group row">
                    <label for="max-results" class="col-sm-2 col-form-label">Number of Screens:</label>
                    <input id="max-results" type="text" class="col-sm-10 form-control" value="100" />
                </div>
            </div>
        `);
  }

}

exports.default = SlideShowSettingsForm;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Url {
  static getUrlParameter(name) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === name) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  }

}

exports.default = Url;

},{}]},{},[1]);
