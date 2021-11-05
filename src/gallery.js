import Api from "./api";

const ApiBase = 'https://api.gonzalez-art-foundation.org/';
const ImageBase = 'https://images.gonzalez-art-foundation.org/';
import Url from './url';
import SlideShowSettingsForm from './slideshow-settings-form';
import moment from 'moment';
export default class Gallery {

    constructor() {
        this.hasMovedMouseOnImageViewerPage = false;
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

    showCurrentImage() {
        let jsonSearchResult = JSON.parse(localStorage.getItem('slideshowData'));
        let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex"));
        if (isNaN(slideshowIndex)) {
            alert('No images selected. Use the search on the home page to queue images for viewing.');
            location.href = 'https://www.gonzalez-art-foundation.org';
            return;
        }
        let currentImage = jsonSearchResult.items[slideshowIndex];

        $('#slideshow-index').html(jsonSearchResult.searchFrom + slideshowIndex + 1);

        let totalItems = `${jsonSearchResult.total}${jsonSearchResult.maxSearchResultsHit ? '+' : ''}`;
        $('#slideshow-count').html(totalItems);
        this.showImage(currentImage);
    }

    showImage(currentImage) {
        $('#slideshow-image').prop('src', `${ImageBase}${currentImage.s3Path}`);

        let link = (currentImage.sourceLink || '').replace('http://', 'https://');
        let linkText;

        if (currentImage.source === 'http://images.nga.gov') {
            linkText = 'National Gallery of Art, Washington';
        } else if (currentImage.source === 'http://www.musee-orsay.fr') {
            linkText = 'Musée d\'Orsay in Paris, France';
        } else if (currentImage.source === 'https://www.pop.culture.gouv.fr/notice/museo/M5031') {
            linkText = 'Musée du Louvre in Paris, France';
        } else if (currentImage.source === 'https://www.pop.culture.gouv.fr') {
            linkText = 'Ministère de la Culture in France'
        } else if (currentImage.source === 'https://www.moma.org') {
            linkText = 'The Museum of Modern Art in New York, United States';
        } else if (currentImage.source === 'http://www.the-athenaeum.org') {
            linkText = "The Athenaeum";
            link = 'https://www.the-athenaeum.org/art/detail.php?ID=' + currentImage.pageId;
        } else if (currentImage.source === 'https://www.rijksmuseum.nl') {
            linkText = 'Rijksmuseum in Amsterdam, Netherlands';
        }
        $('#slideshow-image-info').empty();
        if (currentImage.name) {
            $('#slideshow-image-info').append($('<span>').text(`${currentImage.name} `));
        }
        if (currentImage.date) {
            $('#slideshow-image-info').append($('<span>').text(`(${currentImage.date || ''}) `));
        }
        if (currentImage.originalArtist) {
            $('#slideshow-image-info').append($('<span>').text(`by ${currentImage.originalArtist || ''} - `))
        }
        $('#slideshow-image-info')
            .append($(`<a target="_blank">`).attr('href', link).text(linkText))
            .append($('<span>').text(` - Image id ${currentImage.pageId}`));
        if (currentImage.price) {
            let formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: currentImage.priceCurrency, maximumFractionDigits: 2 })
                .format(currentImage.price);
            $('#slideshow-image-info')
                .append('<br/>')
                .append($('<span>').text(`Indexed at ${moment(currentImage['@timestamp']).format("yyyy-M-D h:mm A")} - Price ${formattedPrice}`))
        }
    }

    async previousImage() {
        let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex", 0));
        if (slideshowIndex <= 0) {
            let jsonSearchResult = JSON.parse(localStorage.getItem('slideshowData'));
            let url = Api.getSearchUrl(
                jsonSearchResult.maxResults,
                jsonSearchResult.searchText,
                jsonSearchResult.source,
                jsonSearchResult.hideNudity,
                jsonSearchResult.searchFrom - jsonSearchResult.maxResults
            );
            let newJsonSearchResult = await Api.get(url);
            localStorage.setItem("slideshowData", JSON.stringify(newJsonSearchResult));
            localStorage.setItem("slideshowIndex", 0);

        } else {
            localStorage.setItem("slideshowIndex", slideshowIndex - 1);
        }

        this.showCurrentImage();
    }

    async nextImage() {
        let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex", 0));
        let jsonSearchResult = JSON.parse(localStorage.getItem('slideshowData'));
        if (slideshowIndex+2 > jsonSearchResult.items.length) {
            let url = Api.getSearchUrl(
                jsonSearchResult.maxResults,
                jsonSearchResult.searchText,
                jsonSearchResult.source,
                jsonSearchResult.hideNudity,
                jsonSearchResult.searchFrom + jsonSearchResult.maxResults
            );
            let newJsonSearchResult = await Api.get(url);
            localStorage.setItem("slideshowData", JSON.stringify(newJsonSearchResult));
            localStorage.setItem("slideshowIndex", 0);
        } else {
            localStorage.setItem("slideshowIndex", slideshowIndex + 1);
        }
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
        return window.fullScreen ||
            (window.innerWidth === screen.width && window.innerHeight === screen.height);
    }

    init() {
        let self = this;
        let source = Url.getUrlParameter('source');
        let pageId = Url.getUrlParameter('pageId');
        if (source && pageId) {
            $('#slideshow-controls').addClass('hide');
            $('#slideshow-image-container').addClass('single-image-mode');
            fetch(
                `${ApiBase}unauthenticated/cache-everything/image-classification?source=${encodeURIComponent(source)}&pageId=${encodeURIComponent(pageId)}`,
                { mode: 'cors' }).then(function (response) {
                response
                    .json()
                    .then((json) => {
                        if (self.assertSuccess(response, json)) {
                            self.showImage(json);
                        }
                    })
                    .catch(function (error) {
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
        $('#slideshow-pause')
            .hide()
            .click(() => {
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
    }
}