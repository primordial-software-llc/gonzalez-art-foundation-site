import Api from './api';
import Url from './url';

export default class HomePage {

    constructor() {
        this.results = [];
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
            <option value="https://www.moma.org">The Museum of Modern Art in New York, United States</option>
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
        $('#search-result-items').empty();
        this.results = [];
        let self = this;
        let url = Api.getSearchUrl(
            $('#max-results').val(),
            $('#search-text').val(),
            $('#siteSelection').val(),
            JSON.stringify(self.searchAfter)
        );
        $('.search-result-controls').show();
        let json = await Api.get(url);
        this.loadSearchResults(json);
    }
}