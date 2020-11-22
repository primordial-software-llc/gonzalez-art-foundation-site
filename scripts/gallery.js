function Gallery() {
    let slideshowTimer;
    let hasMovedMouseOnImageViewerPage = false;
    const ApiBase = 'https://api.gonzalez-art-foundation.org/';

    function getUrlParameter(sParam) {
        let sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    function assertSuccess(response, json) {
        if (!response || response.status < 200 || response.status > 299) {
            if (json && json.ExceptionMessage === 'Not authenticated') {
                alert('Please Login');
            } else {
                console.log(response);
                console.log(json);
                alert('Failed to get data: ' + JSON.stringify(json, 0, 4));
            }
            return false;
        }
        return true;
    }

    function showCurrentImage() {
        let slideshowItems = JSON.parse(localStorage.getItem('slideshowData'));
        let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex"));
        if (isNaN(slideshowIndex)) {
            alert('No images selected. Use the search on the home page to queue images for viewing.');
            location.href = 'https://www.gonzalez-art-foundation.org';
            return;
        }
        let currentImage = slideshowItems[slideshowIndex];
        $('#slideshow-index').html(slideshowIndex + 1);
        $('#slideshow-count').html(slideshowItems.length);
        showImage(currentImage);
    }

    function showImage(currentImage) {
        $('#slideshow-image').prop('src', `${ApiBase}unauthenticated/cache-everything/image?path=${currentImage.s3Path}`);

        let link;
        let linkText;

        if (currentImage.source === 'http://images.nga.gov') {
            linkText = 'Courtesy National Gallery of Art, Washington';
            link = currentImage.sourceLink.replace('http://', 'https://');
        } else if (currentImage.source == 'http://www.musee-orsay.fr') {
            linkText = 'Courtesy Musée d\'Orsay in Paris, France';
            link = currentImage.sourceLink;
        } else if (currentImage.source == 'https://www.pop.culture.gouv.fr/notice/museo/M5031') {
            linkText = 'Courtesy Musée du Louvre in Paris, France';
            link = currentImage.sourceLink;
        } else {
            linkText = "Courtesy The Athenaeum";
            link = 'https://www.the-athenaeum.org/art/detail.php?ID=' + currentImage.pageId;
        }

        $('#slideshow-image-info').append(
            $('<span>').text(`${currentImage.name} (${currentImage.date}) by ${currentImage.originalArtist} - `));
        let linkElement = $(`<a target="_blank">`);
        linkElement.attr('href', link);
        linkElement.text(linkText);
        $('#slideshow-image-info').append(linkElement);
        $('#slideshow-image-info').append($('<span>').text(` - Image id ${currentImage.pageId}`));


        return;
        var url = `/api/Gallery/${currentImage.pageId}/label`;
        fetch(url, { credentials: "same-origin" }).then(function (response) {
            response
                .json()
                .then(function (json) {
                    if (assertSuccess(response, json)) {
                        $('#slideshow-similar').prop('title', 'This work features ' + json.labels);
                        $('#slideshow-similar').prop('href', '/Home?tags=' + json.labels.join(','));
                    }
                })
                .catch(function (error) {
                    console.log('Failed to get data:');
                    console.log(error);
                });
        });
    }

    function previouseImage() {
        let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex", 0));
        localStorage.setItem("slideshowIndex", slideshowIndex - 1);
        showCurrentImage();
    }

    function nextImage() {
        let slideshowIndex = parseInt(localStorage.getItem("slideshowIndex", 0));
        localStorage.setItem("slideshowIndex", slideshowIndex + 1);
        showCurrentImage();
    }

    function pauseSlideshow() {
        clearInterval(slideshowTimer);
        $('#slideshow-pause').hide();
        $('#slideshow-play').show();
    }

    function showPlayer() {
        hasMovedMouseOnImageViewerPage = true;
        $(".slideshow-player").slideDown("slow", function () {
            $(".slideshow-player").show();
            $('#slideshow-image-container').removeClass('hide-controls');
        });
        $('body').css('cursor', '');
    }

    function hidePlayer() {
        $('body').css('cursor', 'none');
        $(".slideshow-player").slideUp("slow", function () {
            $(".slideshow-player").hide();
            $('#slideshow-image-container').addClass('hide-controls');
        });
    }

    /**
     * Chrome requires full-screen mode to be user engaged.
     */
    function showFullscreen() {
        hidePlayer();
        var element = document.getElementsByTagName('html')[0];
        if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    function tryHidePlayer() {
        if (!hasMovedMouseOnImageViewerPage) {
            hidePlayer();
        }
        hasMovedMouseOnImageViewerPage = false;
    }
    
    function isFullScreen() {
        return window.fullScreen ||
            (window.innerWidth === screen.width && window.innerHeight === screen.height);
    }

    function enableNestIntegration() {
        setInterval(updateHomeAwayStatus, 1 * 60 * 1000);
        $('#home-away-status').addClass('home-away-enabled');
    }

    function updateHomeAwayStatus() {
        var url = '/api/Gallery/homeStatus';
        fetch(url, { credentials: "same-origin" }).then(function (response) {
            response
                .json()
                .then(function (json) {
                    if (assertSuccess(response, json)) {
                        if (json.away.toLowerCase() === 'away') {
                            $('#home-away-status').addClass('away');
                            pauseSlideshow();
                        }

                        if (json.away.toLowerCase() === 'home' &&
                            $('#home-away-status.away').length > 0) {
                            $('#home-away-status').removeClass('away');
                            $('#home-away-status').addClass('home-away-enabled');
                            $('#slideshow-play').click();
                        }
                    }
                })
                .catch(function (error) {
                    console.log('Failed to get home/away status:');
                    console.log(error);
                });
        });
    }

    this.init = function() {
        $(document).ready(function () {
            let source = getUrlParameter('source');
            let pageId = getUrlParameter('pageId');
            if (source && pageId) {
                $('#slideshow-controls').addClass('hide');
                $('#slideshow-image-container').addClass('single-image-mode');
                fetch(
                    `${ApiBase}unauthenticated/cache-everything/image-classification?source=${encodeURIComponent(source)}&pageId=${encodeURIComponent(pageId)}`,
                    { mode: 'cors' }).then(function (response) {
                    response
                        .json()
                        .then(function (json) {
                            if (assertSuccess(response, json)) {
                                showImage(json);
                            }
                        })
                        .catch(function (error) {
                            console.log('Failed to get data:');
                            console.log(error);
                        });
                });
            } else {
                showCurrentImage();
            }

            $('#slideshow-return-home').click(function () {
                window.location = "/";
            });
            $('#slideshow-fullscreen').click(function () {
                showFullscreen();
            });
            $(this).mousemove(function () {
                if (!isFullScreen()) {
                    showPlayer();
                }
            });
            $(this).keypress(function () {
                if (!isFullScreen()) {
                    showPlayer();
                }
            });
            setInterval(function () {
                tryHidePlayer();
            }, 15000);
            $('#slideshow-previous').click(function () {
                previouseImage();
                pauseSlideshow();
            });
            $('#slideshow-next').click(function () {
                nextImage();
                pauseSlideshow();
            });
            var defaultInterval = 6;
            $('#slideshow-interval').val(defaultInterval);
            $('#slideshow-pause').hide();
            $('#slideshow-play').click(function () {
                function slideshowTimerAction() {
                    nextImage();
                }
                var intervalInMs = parseFloat($('#slideshow-interval').val()) * 1000;
                slideshowTimer = setInterval(slideshowTimerAction, intervalInMs);
                $('#slideshow-pause').show();
                $('#slideshow-play').hide();
            });
            $('#slideshow-pause').click(function () {
                pauseSlideshow();
            });
            //enableNestIntegration();
            $('#home-away-status').click(function() {
                if ($('#home-away-status.home-away-enabled').length > 0) {
                    $('#home-away-status').removeClass('away');
                    $('#home-away-status').removeClass('home-away-enabled');
                    clearInterval(updateHomeAwayStatus);
                } else {
                    enableNestIntegration();
                }
            });
        });
    };
    
}

var gallery = new Gallery();
gallery.init();