const ApiBase = 'https://api.gonzalez-art-foundation.org/';
import Url from './url';

export default class HomePage {

    loadSearchResults(results) {
        let summary = $('<div id="search-results-summary"></div>')
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

            let image = $(`<img id="slideshow-image" class="image-search-item" />`)
                .prop('src', `${ApiBase}unauthenticated/cache-everything/image?path=${result.s3Path}&thumbnail=thumbnail`);
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
            let response = await fetch(url, { credentials: "same-origin" });
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

    getSiteOptions() {
        return `
            <option value="http://www.the-athenaeum.org">The Athenaeum</option>
            <option value="https://www.moma.org">The Museum of Modern Art in New York, United States</option>
            <option value="https://www.metmuseum.org">The Metropolitan Museum of Art in New York, United States</option>
            <option value="http://images.nga.gov">National Gallery of Art in Washington D.C., United States</option>
            <option value="http://www.musee-orsay.fr">Musée d'Orsay in Paris, France</option>
            <option value="https://www.pop.culture.gouv.fr/notice/museo/M5031">Musée du Louvre in Paris, France</option>
            <option value="https://www.pop.culture.gouv.fr">Ministère de la Culture in France</option>`;
    }

    init() {
        const self = this;
        const defaultSearchText = 'Sir Lawrence Alma-Tadema';
        const onLoadSearchText = Url.getUrlParameter('search');
        let searchText = onLoadSearchText || defaultSearchText;
        $('input[name=search-type]').change(function () {
            $('#siteSelection').empty();
            let selectedType = $('input[name=search-type]:checked').val();
            if (selectedType === 'search-by-text') {
                $('#siteSelection').append(`<option value="">All</option>`);
                $('#siteSelection').append(self.getSiteOptions());
                $('.last-id-input-group').hide();
                $('.search-text-input-group').show();
                $('#search-text').val(searchText);
            } else if (selectedType === 'view-from-last-id') {
                $('#siteSelection').append(self.getSiteOptions());
                $('.last-id-input-group').show();
                $('.search-text-input-group').hide();
                $('#search-last-id').val('0');
            }
        });
        $('#run-search').click(function () {
            let selectedType = $('input[name=search-type]:checked').val();
            let url;
            if (selectedType === 'search-by-text') {
                url = `${ApiBase}unauthenticated/search` +
                    `?maxResults=${encodeURIComponent($('#max-results').val())}` +
                    `&searchText=${encodeURIComponent($('#search-text').val())}` +
                    `&source=${encodeURIComponent($('#siteSelection').val())}` +
                    `&hideNudity=${encodeURIComponent($('#hide-nudity').is(':checked'))}`
            } else if (selectedType === 'view-from-last-id') {
                url = `${ApiBase}unauthenticated/scan` +
                    `?maxResults=${encodeURIComponent($('#max-results').val())}` +
                    `&lastPageId=${encodeURIComponent($('#search-last-id').val())}` +
                    `&source=${encodeURIComponent($('#siteSelection').val())}` +
                    `&hideNudity=${encodeURIComponent($('#hide-nudity').is(':checked'))}`;
            }
            self.loadSearchResultsFromUrl(url);
        });

        $('.view-more-works-by-featured-artist').click(function () {
            $('#exact-artist').prop('checked', true);
            $('#search-text').val('Sir Lawrence Alma-Tadema');
            $('#max-results').val(0);
            $('#run-search').click();
        });

        $('input[name=search-type]').change();
        if (onLoadSearchText) {
            $('#run-search').click();
        }
    }
}