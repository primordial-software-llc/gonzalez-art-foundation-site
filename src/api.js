const ApiBase = 'https://api.gonzalez-art-foundation.org/';
const ImageBase = 'https://images.gonzalez-art-foundation.org/';

export default class Api {

    static getImageBase() {
        return ImageBase;
    }

    static getApiBase() {
        return ApiBase;
    }

    static getSearchUrl(maxResults, searchText, source, searchAfter, artistExactMatch) {
        return `${ApiBase}unauthenticated/search` +
            `?maxResults=${encodeURIComponent(maxResults)}` +
            `&searchText=${encodeURIComponent(searchText)}` +
            `&source=${encodeURIComponent(source)}` +
            `&searchAfter=${ searchAfter ? encodeURIComponent(searchAfter) : ''}` +
            `&artistExactMatch=${!!artistExactMatch}`;
    }

    static assertSuccess(response, json) {
        if (!response || response.status < 200 || response.status > 299) {
            console.log('Request failed:');
            console.log(response);
            console.log(json);
            alert('Failed to get data: ' + JSON.stringify(json, 0, 4));
            throw 'Failed to get data: ' + JSON.stringify(json, 0, 4);
        }
    }

    static async get(url) {
        $('.loader-group').removeClass('hide');
        let json;
        try {
            let response = await fetch(url, { credentials: "same-origin" });
            json = await response.json();
            this.assertSuccess(response, json)
            return json;
        } finally {
            $('.loader-group').addClass('hide');
        }
    }

}