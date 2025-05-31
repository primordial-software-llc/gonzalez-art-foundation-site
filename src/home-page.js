import $ from 'jquery';
window.$ = $;
window.jQuery = $;
import Api from './api';
import Url from './url';

export default class HomePage {

    constructor() {
        this.results = [];
        this.slideIndex = 0;
        this.slideShowData = [];
    }

    showSlides(n) {
        if (n >= this.slideShowData.length) {
            this.slideIndex = 0
        } else if (n < 0) {
            this.slideIndex = this.slideShowData.length - 1;
        } else {
            this.slideIndex = n;
        }
        let item = this.slideShowData[this.slideIndex];
        let workName = '';
        if (item.name) {
            workName = `${item.name} `;
        }
        if (item.date) {
            workName += `(${item.date || ''}) `;
        }
        if (item.originalArtist) {
            workName += `by ${item.originalArtist || ''}`;
        }
        $('.slideshow-slide > img').attr('alt', workName);
        $('.slideshow-slide > img').prop('src', `${Api.getImageBase()}${item.s3Path}`);
        $('.slideshow-numbertext').text(`${this.slideIndex + 1} / ${this.slideShowData.length}`);

        let link = (item.sourceLink || '').replace('http://', 'https://');
        let linkText;
        if (item.source === 'http://images.nga.gov') {
            linkText = 'National Gallery of Art, Washington DC';
        } else if (item.source === 'http://www.musee-orsay.fr') {
            linkText = 'Musée d\'Orsay in Paris, France';
        } else if (item.source === 'https://www.pop.culture.gouv.fr/notice/museo/M5031') {
            linkText = 'Musée du Louvre in Paris, France';
        } else if (item.source === 'https://www.pop.culture.gouv.fr') {
            linkText = 'Ministère de la Culture in France'
        } else if (item.source === 'https://www.moma.org') {
            linkText = 'The Museum of Modern Art in New York, United States';
        } else if (item.source === 'http://www.the-athenaeum.org') {
            linkText = "The Athenaeum";
            link = 'https://www.the-athenaeum.org/art/detail.php?ID=' + item.pageId;
        } else if (item.source === 'https://www.rijksmuseum.nl') {
            linkText = 'Rijksmuseum in Amsterdam, Netherlands';
        }
        $('#slideshow-image-link').text(workName);
        $('#slideshow-image-link').attr('href', `/gallery.html?source=${encodeURIComponent(item.source)}&pageId=${encodeURIComponent(item.pageId)}`);

        $('#slideshow-image-source-link').text(linkText);
        $('#slideshow-image-source-link').attr('href', link);
    }

    loadSearchResults(jsonSearchResult) {
        let resultRow;
        for (let ct = 0; ct < jsonSearchResult.items.length; ct++) {
            let result = jsonSearchResult.items[ct]['_source'];
            this.results.push(jsonSearchResult.items[ct]);
            if (ct === 0 || ct % 3 == 0 || ct === jsonSearchResult.items.length) {
                resultRow = $('<div class="row image-search-row"></div>');
                $('#search-result-items').append(resultRow);
            }
            let imageLinkContainer = $('<div class="col-4 text-center"></div>');
            let image = $(`<img id="slideshow-image" class="image-search-item" />`)
                .prop('src', `${Api.getImageBase()}${result.s3ThumbnailPath || result.s3Path}`);
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

        $('.current-matches').text(this.results.length);
        $('.total-matches').text(jsonSearchResult.total);

        $('.slideshow-start').unbind();
        $('.slideshow-start').click(function () {
            localStorage.setItem("slideshowData", JSON.stringify(jsonSearchResult));
            localStorage.setItem("slideshowIndex", 0);
            window.location = "/gallery.html";
        });
    }

    getSiteOptions() {
        return `
            <option value="http://www.the-athenaeum.org">The Athenaeum</option>
            <option value="http://images.nga.gov">National Gallery of Art in Washington D.C., United States</option>
            <option value="https://www.rijksmuseum.nl">Rijksmuseum in Amsterdam, Netherlands</option>`;
    }

    setCanonicalUrl(url) {
        // Remove existing canonical link if it exists
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.remove();
        }
        
        // Create and add new canonical link
        const canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = url;
        document.head.appendChild(canonicalLink);
    }

    init() {
        const self = this;
        const defaultSearchText = 'Sir Lawrence Alma-Tadema';
        const onLoadSearchText = Url.getUrlParameter('search');
        let searchText = onLoadSearchText || defaultSearchText;
        $('#siteSelection').append(`<option value="">All</option>`);
        $('#siteSelection').append(self.getSiteOptions());
        $('.last-id-input-group').hide();
        $('.search-text-input-group').show();
        $('#search-text').val(searchText);

        $('#run-search').click(function () {
            self.runSearch(false);
        });
        $('.view-more').click(async function () {
            let lastResult = self.results[self.results.length-1];
            let moreUrl = Api.getSearchUrl(
                $('#max-results').val(),
                $('#search-text').val(),
                $('#siteSelection').val(),
                JSON.stringify(lastResult.sort)
            );
            let moreJson = await Api.get(moreUrl);
            self.loadSearchResults(moreJson);
        });

        $('.view-more-works-by-featured-artist').click(function () {
            window.location.href = `/index.html?search=${encodeURIComponent('sir lawrence alma-tadema')}&artistExactMatch=true`;
        });

        if (onLoadSearchText) {
            const artistExactMatch = Url.getUrlParameter('artistExactMatch') === 'true';
            if (artistExactMatch) {
                self.setCanonicalUrl(window.location.href);
                $('.featured-artist-container').hide();
            }
            this.runSearch(artistExactMatch);
        }
        
        $('.home .slideshow-button-container-prev').click(function () {
            self.showSlides(self.slideIndex - 1);
        });
        $('.home .slideshow-button-container-next').click(function () {
            self.showSlides(self.slideIndex + 1);
        });

        fetch('/static-data/slideshows/sir-lawrence-alma-tadema.json')
            .then(function (response) {
                response
                    .json()
                    .then((json) => {
                        self.slideShowData = json;
                        self.showSlides(0);
                    })
                    .catch(function (error) {
                        console.log('Failed to get slideshow data:');
                        console.log(error);
                    });
            });
    }

    async runSearch(artistExactMatch) {
        $('#search-result-items').empty();
        this.results = [];
        let self = this;
        let url = Api.getSearchUrl(
            $('#max-results').val(),
            $('#search-text').val(),
            $('#siteSelection').val(),
            JSON.stringify(self.searchAfter),
            artistExactMatch
        );
        $('.search-result-controls').show();
        let json = await Api.get(url);
        this.loadSearchResults(json);
    }
}