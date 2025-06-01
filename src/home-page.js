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
        this.autoplayTimer = null;
        this.hasMovedMouse = false;
        this.hideControlsTimer = null;
    }

    showSlides(n) {
        if (this.slideShowData.length === 0) return;
        
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
        
        // Update the main slideshow image
        $('#featured-slideshow-image').attr('alt', workName);
        $('#featured-slideshow-image').prop('src', `${Api.getImageBase()}${item.s3Path}`);
        
        // Update counter with clean format like gallery
        $('#featured-slideshow-counter').text(`${this.slideIndex + 1} / ${this.slideShowData.length}`);

        // Update slider position
        if (this.slideShowData.length > 1) {
            const sliderValue = (this.slideIndex / (this.slideShowData.length - 1)) * 100;
            $('#featured-slideshow-slider').val(sliderValue);
        }

        // Update caption info
        let link = (item.sourceLink || '').replace('http://', 'https://');
        let linkText;
        if (item.source === 'http://images.nga.gov') {
            linkText = 'National Gallery of Art, Washington DC';
        } else if (item.source === 'http://www.the-athenaeum.org') {
            linkText = "The Athenaeum";
            link = 'https://www.the-athenaeum.org/art/detail.php?ID=' + item.pageId;
        } else if (item.source === 'https://www.rijksmuseum.nl') {
            linkText = 'Rijksmuseum in Amsterdam, Netherlands';
        }
        
        $('#featured-slideshow-title').text(workName);
        $('#featured-slideshow-source').text(linkText);
        $('#featured-slideshow-view').attr('href', `/gallery.html?source=${encodeURIComponent(item.source)}&pageId=${encodeURIComponent(item.pageId)}`);
    }

    nextSlide() {
        this.showSlides(this.slideIndex + 1);
    }

    prevSlide() {
        this.showSlides(this.slideIndex - 1);
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, 6000); // 6 second intervals like gallery
        $('#featured-slideshow-pause').show();
        $('#featured-slideshow-play').hide();
    }

    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
        $('#featured-slideshow-pause').hide();
        $('#featured-slideshow-play').show();
    }

    showControls() {
        this.hasMovedMouse = true;
        $('.featured-slideshow-controls').show(); // No fade
        $('body').css('cursor', '');
        this.hideOverlay(); // Remove overlay when showing controls
    }

    hideControls() {
        $('.featured-slideshow-controls').hide(); // No fade
        $('body').css('cursor', 'none');
    }

    tryHideControls() {
        // Don't auto-hide if artist exact match is true (slideshow is hidden)
        const artistExactMatch = Url.getUrlParameter('artistExactMatch') === 'true';
        
        // Don't auto-hide if the slideshow container is hidden
        const slideshowHidden = $('.featured-artist-container').is(':hidden');
        
        if (!artistExactMatch && !slideshowHidden && !this.hasMovedMouse) {
            this.hideControls();
            this.showOverlay();
        }
        this.hasMovedMouse = false;
    }

    showOverlay() {
        $('.featured-slideshow-container').addClass('overlay-mode');
        $('.main-content > .container > *:not(.featured-artist-container)').hide();
        $('.featured-artist-header').hide();
    }

    hideOverlay() {
        $('.featured-slideshow-container').removeClass('overlay-mode');
        $('.main-content > .container > *:not(.featured-artist-container)').show();
        $('.featured-artist-header').show();
    }

    /**
     * Chrome requires full-screen mode to be user engaged.
     */
    showFullscreen() {
        this.showOverlay();
        let element = document.getElementsByTagName('html')[0];
        if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            console.log('No fullscreen API available');
        }
    }

    isFullScreen() {
        return !!(document.fullscreenElement || 
                 document.webkitFullscreenElement || 
                 document.mozFullScreenElement || 
                 document.msFullscreenElement ||
                 window.fullScreen ||
                 (window.innerWidth === screen.width && window.innerHeight === screen.height));
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

        // Update download button state
        this.updateDownloadButton();
    }

    updateDownloadButton() {
        if (this.results.length > 0) {
            $('.download-results').show();
            $('.download-results').text(`Download Results (${this.results.length} items)`);
        } else {
            $('.download-results').hide();
        }
    }

    downloadAllResults() {
        if (this.results.length === 0) {
            alert('No search results to download');
            return;
        }

        // Extract _source data from all results
        const sourceData = this.results.map(item => item._source);
        
        // Create downloadable JSON
        const dataStr = JSON.stringify(sourceData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        // Create download link
        const url = window.URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        
        // Generate filename based on search text and timestamp
        const searchText = $('#search-text').val() || 'search';
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.download = `${searchText.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_results_${timestamp}.json`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        console.log(`Downloaded ${this.results.length} search results`);
    }

    async downloadAllAvailableResults() {
        if (this.results.length === 0) {
            alert('No search results to download');
            return;
        }

        // Show loading state
        const originalText = $('.download-all-results').text();
        $('.download-all-results').text('Loading all results...');
        $('.download-all-results').prop('disabled', true);

        try {
            // Keep loading more results until we have them all
            const totalMatches = parseInt($('.total-matches').text());
            
            while (this.results.length < totalMatches) {
                let lastResult = this.results[this.results.length - 1];
                let moreUrl = Api.getSearchUrl(
                    $('#max-results').val(),
                    $('#search-text').val(),
                    $('#siteSelection').val(),
                    JSON.stringify(lastResult.sort)
                );
                let moreJson = await Api.get(moreUrl);
                
                if (moreJson.items.length === 0) {
                    break; // No more results
                }
                
                // Add new results to our collection
                for (let item of moreJson.items) {
                    this.results.push(item);
                }
                
                // Update display
                $('.current-matches').text(this.results.length);
                $('.download-all-results').text(`Loading... (${this.results.length}/${totalMatches})`);
            }

            // Now download all results
            this.downloadAllResults();
            
        } catch (error) {
            console.error('Error loading all results:', error);
            alert('Error loading all results. Please try again.');
        } finally {
            // Reset button state
            $('.download-all-results').text(originalText);
            $('.download-all-results').prop('disabled', false);
            this.updateDownloadButton();
        }
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

        // Slideshow controls
        $('#featured-slideshow-prev').click((e) => {
            e.preventDefault();
            self.stopAutoplay(); // Pause autoplay when user manually navigates
            self.showSlides(self.slideIndex - 1);
        });
        
        $('#featured-slideshow-next').click((e) => {
            e.preventDefault();
            self.stopAutoplay(); // Pause autoplay when user manually navigates
            self.showSlides(self.slideIndex + 1);
        });
        
        $('#featured-slideshow-play').click((e) => {
            e.preventDefault();
            self.startAutoplay();
        });
        
        $('#featured-slideshow-pause').click((e) => {
            e.preventDefault();
            self.stopAutoplay();
        });

        // Fullscreen button
        $('#featured-slideshow-fullscreen').click((e) => {
            e.preventDefault();
            self.showFullscreen();
            setTimeout(() => {
                self.hideControls();
                self.showOverlay();
            }, 1000); // Requesting full screen likely requires user engagement and triggers the overlay breakout.
        });

        // Overlay button
        $('#featured-slideshow-overlay').click((e) => {
            e.preventDefault();
            self.hideControls();
            self.showOverlay();
    });

        // ADD SLIDER FUNCTIONALITY HERE
        $('#featured-slideshow-slider').on('input', function() {
            self.stopAutoplay(); // Pause autoplay when user manually uses slider
            const sliderValue = parseFloat($(this).val());
            const imageIndex = Math.round((sliderValue / 100) * (self.slideShowData.length - 1));
            self.showSlides(imageIndex);
        });

        // Mouse movement controls (like gallery)
        $('.featured-slideshow-container').mousemove(() => {
            self.showControls();
        });

        // Document-level mouse and keyboard events (like gallery)
        $(document).mousemove(() => {
            if (!self.isFullScreen()) {
                self.showControls();
            }
        });
        
        $(document).keypress(() => {
            if (!self.isFullScreen()) {
                self.showControls();
            }
        });

        // Auto-hide controls every 60 seconds
        setInterval(() => {
            console.log('tryHideControls');
            self.tryHideControls();
        }, 60000);

        // Load slideshow data only if slideshow will be visible
        const artistExactMatch = Url.getUrlParameter('artistExactMatch') === 'true';
        const currentSearchText = $('#search-text').val().toLowerCase();
        
        // Update featured artist header based on current search
        if (artistExactMatch) {
            if (currentSearchText === 'jean-leon gerome' || currentSearchText === 'sir lawrence alma-tadema') {
                self.updateFeaturedArtistHeader(currentSearchText);
            }
        } else {
            // Default to Sir Lawrence Alma-Tadema for non-exact matches
            self.updateFeaturedArtistHeader('sir lawrence alma-tadema');
        }
        
        // Determine which slideshow to load based on search text
        let slideshowFile = null;
        if (!artistExactMatch) {
            // Default slideshow when not an exact match
            slideshowFile = '/static-data/slideshows/sir-lawrence-alma-tadema.json';
        } else if (artistExactMatch && currentSearchText === 'jean-leon gerome') {
            // Jean-Léon Gérôme slideshow for exact match
            slideshowFile = '/static-data/slideshows/jean-leon-gerome.json';
        } else if (artistExactMatch && currentSearchText === 'sir lawrence alma-tadema') {
            // Sir Lawrence Alma-Tadema slideshow for exact match
            slideshowFile = '/static-data/slideshows/sir-lawrence-alma-tadema.json';
        }
        
        if (slideshowFile) {
            fetch(slideshowFile)
                .then(function (response) {
                    response
                        .json()
                        .then((json) => {
                            self.slideShowData = json;
                            // Set slider max after data loads
                            $('#featured-slideshow-slider').attr('max', 100);
                            self.showSlides(0);
                            // Start autoplay after a brief delay
                            setTimeout(() => {
                                self.startAutoplay();
                            }, 2000);
                        })
                        .catch(function (error) {
                            console.log('Failed to get slideshow data:');
                            console.log(error);
                        });
                });
        }

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
            // Get the current featured artist name from the header
            const currentArtistName = $('.featured-artist-header h2').text().toLowerCase();
            let searchParam = 'sir lawrence alma-tadema'; // default fallback
            
            if (currentArtistName.includes('jean-léon gérôme')) {
                searchParam = 'jean-leon gerome';
            } else if (currentArtistName.includes('sir lawrence alma-tadema')) {
                searchParam = 'sir lawrence alma-tadema';
            }
            
            window.location.href = `/index.html?search=${encodeURIComponent(searchParam)}&artistExactMatch=true`;
        });

        // Download buttons
        $('.download-results').click(function () {
            self.downloadAllResults();
        });

        $('.download-all-results').click(function () {
            self.downloadAllAvailableResults();
        });

        if (onLoadSearchText) {
            const artistExactMatch = Url.getUrlParameter('artistExactMatch') === 'true';
            if (artistExactMatch) {
                self.setCanonicalUrl(window.location.href);
                
                // Only hide the slideshow for exact matches that aren't our target artists
                const searchTextLower = onLoadSearchText.toLowerCase();
                const isTargetArtist = searchTextLower === 'jean-leon gerome' || searchTextLower === 'sir lawrence alma-tadema';
                
                if (!isTargetArtist) {
                    $('.featured-artist-container').hide();
                }
            }
            this.runSearch(artistExactMatch);
        }
    }

    async runSearch(artistExactMatch) {
        $('#search-result-items').empty();
        this.results = [];
        this.updateDownloadButton(); // Hide download buttons when starting new search
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

    updateFeaturedArtistHeader(artistName) {
        const artistData = {
            'sir lawrence alma-tadema': {
                name: 'Sir Lawrence Alma-Tadema',
                description: 'Dutch painter known for academic works featuring ancient Greek and Roman themes.'
            },
            'jean-leon gerome': {
                name: 'Jean-Léon Gérôme',
                description: 'French painter and sculptor known for his orientalist and historical academic works.'
            }
        };

        const normalizedName = artistName.toLowerCase();
        const artist = artistData[normalizedName];
        
        if (artist) {
            $('.featured-artist-header h2').text(artist.name);
            $('.featured-artist-intro').html(`${artist.description} <span class="view-more-works-by-featured-artist">View more works →</span>`);
        }
    }
}