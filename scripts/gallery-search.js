const ApiBase = 'https://api.gonzalez-art-foundation.org/';

function loadSearchResults(results) {
    let html = '';
    html += '<div id="search-results-summary">Works of art found: ' + results.length + '</div>';
    html += '<div id="slideshow-start"><img src="/images/Glyphicons/glyphicons-9-film.png"> Start Slideshow </div>';
    for (let result of results) {
        let imageUrl = `/image-viewer.html?source=${encodeURIComponent(result.source)}&pageId=${encodeURIComponent(result.pageId)}`;
        html += '<div><a target="_blank" href="' + imageUrl + '" title="' + result.source + ' - ' + result.pageId + '"' + '>' +
            result.name +
            ' (' + result.date + ') by ' +
            result.originalArtist + '</a></div>';
    }

    $('#search-results').html(html);

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
    $('#likeSearch').click(function () {
        let url = `${ApiBase}unauthenticated/search-like-artist?artist=${encodeURIComponent($('#likeSearchText').val())}&source=${encodeURIComponent($('#siteSelection').val())}`;
        loadSearchResultsFromUrl(url);
    });
    $('#exactSearch').click(function () {
        let url = `${ApiBase}unauthenticated/search-exact-artist?artist=${encodeURIComponent($('#exactSearchText').val())}&source=${encodeURIComponent($('#siteSelection').val())}`;
        loadSearchResultsFromUrl(url);
    });
    $('#idSearch').click(function () {
        let url = `${ApiBase}unauthenticated/scan?lastPageId=${encodeURIComponent($('#idSearchText').val())}&source=${encodeURIComponent($('#siteSelection').val())}`;
        loadSearchResultsFromUrl(url);
    });
    /*
    $('#tagSearch').click(function () {
        let url = `/api/Gallery/searchLabel?label=${encodeURIComponent($('#tagSearchText').val())}&source=${encodeURIComponent($('#siteSelection').val())}`;
        loadSearchResultsFromUrl(url);
    });
     */
});