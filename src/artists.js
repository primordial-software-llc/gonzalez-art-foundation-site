const ApiBase = 'https://api.gonzalez-art-foundation.org/';
export default class Artists {

    assertSuccess(response, json) {
        if (!response || response.status < 200 || response.status > 299) {
            console.log(response);
            console.log(json);
            alert('Failed to get data: ' + JSON.stringify(json, 0, 4));
            return false;
        }
        return true;
    }

    loadArtists(artists) {
        let artistList = $('<ul class="artist-list"></ul>');
        for (let artist of artists) {
            artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&artistExactMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
        }
        $('.artists-container')
            .empty()
            .append(artistList);
    }

    init() {
        let self = this;
        fetch('/static-data/artists.json')
            .then(function (response) {
                response
                    .json()
                    .then((json) => {
                        if (self.assertSuccess(response, json)) {
                            self.loadArtists(json);
                        }
                    })
                    .catch(function (error) {
                        console.log('Failed to get data:');
                        console.log(error);
                    });
            });
    }
}