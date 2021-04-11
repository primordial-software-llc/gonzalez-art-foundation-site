export default class Url {
    static getUrlParameter(name) {
        let sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === name) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
}
