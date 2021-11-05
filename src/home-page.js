import Api from './api';
import Url from './url';

export default class HomePage {

    constructor() {
        this.searchFrom = 0;
    }

    loadSearchResults(jsonSearchResult) {
        let self = this;
        let searchItems = $('<div id="slideshow-start"></div>');
        searchItems.append(`
            <img class="slideshow-start-image" src="/images/Glyphicons/glyphicons-9-film.png">
            <span class="slideshow-start-text">Start Slideshow</span>
        `);
        $('#search-results').append(searchItems);
        let resultRow;
        for (let ct = 0; ct < jsonSearchResult.items.length; ct++) {
            let result = jsonSearchResult.items[ct];
            if (ct === 0 || ct % 3 == 0 || ct === jsonSearchResult.items.length) {
                resultRow = $('<div class="row image-search-row"></div>');
                $('#search-results').append(resultRow);
            }
            let imageLinkContainer = $('<div class="col-4 text-center"></div>');

            let image = $(`<img id="slideshow-image" class="image-search-item" />`)
                .prop('src', `${Api.getApiBase()}unauthenticated/cache-everything/image?path=${result.s3Path}&thumbnail=thumbnail`);
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
            localStorage.setItem("slideshowData", JSON.stringify(jsonSearchResult));
            localStorage.setItem("slideshowIndex", 0);
            window.location = "/gallery.html";
        });

        $('#image-search')[0].scrollIntoView();
    }

    getSiteOptions() {
        return `
            <option value="http://www.the-athenaeum.org">The Athenaeum</option>
            <option value="https://www.moma.org">The Museum of Modern Art in New York, United States</option>
            <option value="https://www.metmuseum.org">The Metropolitan Museum of Art in New York, United States</option>
            <option value="http://images.nga.gov">National Gallery of Art in Washington D.C., United States</option>
            <option value="http://www.musee-orsay.fr">Musée d'Orsay in Paris, France</option>
            <option value="https://www.pop.culture.gouv.fr/notice/museo/M5031">Musée du Louvre in Paris, France</option>
            <option value="https://www.pop.culture.gouv.fr">Ministère de la Culture in France</option>
            <option value="https://www.rijksmuseum.nl">Rijksmuseum in Amsterdam, Netherlands</option>`;
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

        $('#run-search').click(this.runSearch.bind(this));

        $('.view-more-works-by-featured-artist').click(function () {
            $('#exact-artist').prop('checked', true);
            $('#search-text').val('Sir Lawrence Alma-Tadema');
            $('#max-results').val(0);
            $('#run-search').click();
        });

        if (onLoadSearchText) {
            $('#run-search').click();
        }
    }

    async runSearch() {
        let self = this;
        $('#pagination').empty();
        $('#search-results').empty();

        let url = Api.getSearchUrl(
            $('#max-results').val(),
            $('#search-text').val(),
            $('#siteSelection').val(),
            $('#hide-nudity').is(':checked'),
            this.searchFrom
        );

        let json = await Api.get(url);

        let pagination = $(`<div class='art-pagination'></div>`);
        let summary = $('<div class="search-results-summary"></div>')

        summary.text(`Showing ${json.searchFrom+1} to ${json.searchFrom+json.items.length} of ${json.total}${json.maxSearchResultsHit ? '+' : ''} works of art`);
        let previousButton = $(`<input id="previous-page" type="button" value="< Previous" class="btn btn-primary"/>`);
        if (this.searchFrom === 0) {
            previousButton.prop('disabled', true);
        }
        previousButton.click(function () {
            self.searchFrom -= json.items.length;
            self.runSearch();
        });
        let nextButton = $(`<input id="next-page" type="button" value="Next >" class="btn btn-primary"/>`);
        nextButton.click(function () {
            self.searchFrom += json.items.length;
            self.runSearch();
        });
        if (json.searchFrom+json.items.length >= json.total) {
            nextButton.prop('disabled', true);
        }
        pagination.append(summary);
        pagination.append(previousButton);
        pagination.append(nextButton);

        $('#search-results').append(pagination);
        this.loadSearchResults(json);
        $('#search-results').append(pagination.clone(true));
    }
}