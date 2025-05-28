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

    updateUrl(letter, search) {
        let params = new URLSearchParams();
        // Only include letter if search is empty or less than 3 characters
        if (!search || search.length < 3) {
            if (letter) params.set('letter', letter);
        }
        // Only include search if present
        if (search) params.set('search', search);
        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.pushState({ letter, search }, '', newUrl);
        
        // Update canonical URL
        let canonicalUrl;
        if (params.has('letter') && (!search || search.length < 3)) {
            canonicalUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?letter=${params.get('letter')}`;
        } else {
            canonicalUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        }
        this.setCanonicalUrl(canonicalUrl);
    }

    createFilterButtons(selectedLetter, search) {
        const btnGroup = $('.artist-filters .btn-group');
        btnGroup.empty();

        // Define letter ranges
        const ranges = [
            { start: 65, end: 74 },  // A-J
            { start: 75, end: 84 },  // K-T
            { start: 85, end: 90 }   // U-Z
        ];

        // Only highlight a letter if search is less than 3 characters
        const highlightLetter = !search || search.length < 3;

        // Create buttons for each range
        ranges.forEach((range, idx) => {
            const rangeGroup = $('<div class="btn-group me-2" role="group"></div>');
            for (let i = range.start; i <= range.end; i++) {
                const letter = String.fromCharCode(i).toLowerCase();
                const isActive = letter === selectedLetter && highlightLetter;
                const link = $(
                    `<a href="${window.location.pathname}?letter=${letter}" class="btn btn-outline-primary${isActive ? ' active' : ''}" data-letter="${letter}"${isActive ? ' aria-current="page"' : ''}>${letter.toUpperCase()}</a>`
                );
                rangeGroup.append(link);
            }
            // If this is the last group (U-Z), append the 'Other' button
            if (idx === ranges.length - 1) {
                const isOtherActive = selectedLetter === 'other' && highlightLetter;
                const otherBtn = $(`<a href="${window.location.pathname}?letter=other" class="btn btn-outline-primary${isOtherActive ? ' active' : ''}" data-letter="other"${isOtherActive ? ' aria-current="page"' : ''}>Other</a>`);
                rangeGroup.append(otherBtn);
            }
            btnGroup.append(rangeGroup);
        });

        // Subdue filter if searching
        if (search && search.length >= 3) {
            $('.artist-filters').addClass('subdued');
        } else {
            $('.artist-filters').removeClass('subdued');
        }

        btnGroup.find('a').click((e) => {
            e.preventDefault();
            const letter = $(e.target).data('letter');
            const query = $('#artist-search-input').val();
            if (query && query.length >= 3) {
                // If search is active, clear search and switch to letter filtering
                $('#artist-search-input').val('');
                this.updateUrl(letter, '');
                this.loadArtists(this.currentArtists, letter);
                this.createFilterButtons(letter, '');
            } else {
                this.updateUrl(letter, query);
                if (query) {
                    this.searchArtists(this.currentArtists, query);
                } else {
                    this.loadArtists(this.currentArtists, letter);
                }
                this.createFilterButtons(letter, query);
            }
        });
    }

    loadArtists(artists, letter) {
        let artistList = $('<ul class="artist-list"></ul>');
        for (let artist of artists) {
            const firstChar = artist.originalArtist.charAt(0).toLowerCase();
            if (letter === 'other') {
                if (!/^[a-z]$/.test(firstChar)) {
                    artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&artistExactMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
                }
            } else if (artist.originalArtist.toLowerCase().startsWith(letter)) {
                artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&artistExactMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
            }
        }
        $('.artists-container')
            .empty()
            .append(artistList);
    }

    searchArtists(artists, query) {
        query = query.trim().toLowerCase();
        let artistList = $('<ul class="artist-list"></ul>');
        
        // If query is less than 3 characters, show all artists
        if (query.length < 3) {
            for (let artist of artists) {
                artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&artistExactMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
            }
        } else {
            // Only filter when we have 3 or more characters
            for (let artist of artists) {
                if (artist.originalArtist.toLowerCase().includes(query)) {
                    artistList.append(`<li><a target="_blank" href='/index.html?search=${encodeURIComponent(artist.artist)}&artistExactMatch=true'>${artist.originalArtist} - ${artist.numberOfWorks} works of art</a></li>`);
                }
            }
        }
        
        $('.artists-container').empty().append(artistList);
    }

    init() {
        let self = this;
        
        // Get params from URL
        const urlParams = new URLSearchParams(window.location.search);
        let letter = urlParams.get('letter') || 'a';
        let search = urlParams.get('search') || '';
        
        // Validate letter is a-z, default to 'a' if not
        if (!/^[a-z]$/.test(letter)) {
            letter = 'a';
            if (urlParams.has('letter')) {
                this.updateUrl(letter, search);
                return;
            }
        }

        // Set canonical URL
        this.updateUrl(letter, search);

        // Set search input value
        $('#artist-search-input').val(search);

        // Create filter buttons
        this.createFilterButtons(letter, search);

        // Load artists data
        fetch('/static-data/artists.json')
            .then(function (response) {
                response
                    .json()
                    .then((json) => {
                        if (self.assertSuccess(response, json)) {
                            self.currentArtists = json;
                            if (search) {
                                self.searchArtists(json, search);
                            } else {
                                self.loadArtists(json, letter);
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log('Failed to get data:');
                        console.log(error);
                    });
            });

        // Listen for search input
        $('#artist-search-input').on('input', () => {
            const query = $('#artist-search-input').val();
            if (query && query.length >= 3) {
                this.updateUrl(null, query);
                this.searchArtists(this.currentArtists, query);
                this.createFilterButtons(null, query);
            } else {
                // Restore letter filtering
                const urlParams = new URLSearchParams(window.location.search);
                let letter = urlParams.get('letter') || 'a';
                // Validate letter is a-z
                if (!/^[a-z]$/.test(letter)) letter = 'a';
                this.updateUrl(letter, query);
                this.loadArtists(this.currentArtists, letter);
                this.createFilterButtons(letter, query);
            }
        });
    }
}