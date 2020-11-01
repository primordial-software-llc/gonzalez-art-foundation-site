const ApiBase = 'https://api.gonzalez-art-foundation.org/';

function loadSearchResults(results) {

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

        let image = $(`<img id="slideshow-image" class="image-search-item" />`);
        image.prop('src', `${ApiBase}unauthenticated/cache-everything/image?path=${result.s3ThumbnailPath}`);
        let imageWrapper = $('<div class="image-search-item-image-wrapper"></div>');
        imageWrapper.append(image);

        let imageUrl = `/image-viewer.html?source=${encodeURIComponent(result.source)}&pageId=${encodeURIComponent(result.pageId)}`;

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
        window.location = "/image-viewer.html";
    });
}

function assertSuccess(response, json) {
    if (!response || response.status < 200 || response.status > 299) {
        console.log(response);
        console.log(json);
        alert('Failed to get data: ' + JSON.stringify(json, 0, 4));
        return false;
    }
    return true;
}

function loadSearchResultsFromUrl(url) {
    $('#search-results').empty();
    $('.loader-group').removeClass('hide');
    fetch(url, { credentials: "same-origin" }).then(function (response) {
        response
            .json()
            .then(function (json) {
                $('.loader-group').addClass('hide');
                if (assertSuccess(response, json)) {
                    loadSearchResults(json);
                }
            })
            .catch(function (error) {
                $('.loader-group').addClass('hide');
                console.log('Failed to get data:');
                console.log(error);
            });
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function () {
    let tags = getUrlParameter('tags');
    if (tags) {
        $('#tagSearchText').val(tags);
    }
    $('input[name=search-type]').change(function () {
        let selectedType = $('input[name=search-type]:checked').val();
        let searchText = '';
        if (selectedType === 'like-artist') {
            searchText = 'van gogh'
        } else if (selectedType === 'exact-artist') {
            searchText = 'Vincent van Gogh';
        } else if (selectedType === 'view-from-last-id') {
            searchText = '0';
        }
        $('#search-text').val(searchText);
    });
    $('#run-search').click(function () {
        let selectedType = $('input[name=search-type]:checked').val();
        let url = '';
        if (selectedType === 'like-artist') {
            url = `${ApiBase}unauthenticated/search-like-artist?maxResults=${encodeURIComponent($('#max-results').val())}&artist=${encodeURIComponent($('#search-text').val())}&source=${encodeURIComponent($('#siteSelection').val())}`;
        } else if (selectedType === 'exact-artist') {
            url = `${ApiBase}unauthenticated/search-exact-artist?maxResults=${encodeURIComponent($('#max-results').val())}&artist=${encodeURIComponent($('#search-text').val())}&source=${encodeURIComponent($('#siteSelection').val())}`;
        } else if (selectedType === 'view-from-last-id') {
            url = `${ApiBase}unauthenticated/scan?maxResults=${encodeURIComponent($('#max-results').val())}&lastPageId=${encodeURIComponent($('#search-text').val())}&source=${encodeURIComponent($('#siteSelection').val())}`;
        }
        loadSearchResultsFromUrl(url);
    });
    $('input[name=search-type]').change();
    /*
    $('#tagSearch').click(function () {
        let url = `/api/Gallery/searchLabel?label=${encodeURIComponent($('#tagSearchText').val())}&source=${encodeURIComponent($('#siteSelection').val())}`;
        loadSearchResultsFromUrl(url);
    });
     */
});