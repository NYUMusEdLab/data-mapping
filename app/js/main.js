var DataMapping        = require('./DataMapping');
var Util               = require('./Util');


window.onload = function () {
    var browserSupport = checkSupportedBrowser();

    if (!browserSupport.isSupported) {
        return;
    }

    var env = '/* @echo NODE_ENV */';
    var sourceSlug = (env == 'dev') ? 'dev' : (env == 'test') ? 'uat' : 'pub';

    var urlOptions = {
        sourceSlug   : { name: 'source', inUI: false, value: sourceSlug, type: 'string' }
    };
    
    var options = Util.initOptions(urlOptions);

    // NOTE: urlOptions are passed to app object only so app can update browser URL when necessary
    // Actual use of options should be controlled by passing them explicitly in init() below.
    DM = new DataMapping(urlOptions);

    // NOTE: these options are based upon urlOptions, but not necessarily a one-to-one mapping. Additional options
    // may not be URL-configurable (e.g. assetBase) or may benefit from slightly different form (e.g. multiLock)
    DM.init({
         sourceSlug : options.sourceSlug
     });

    console.log('ready');
};

function checkSupportedBrowser() {
    var isChrome = !!navigator.userAgent.match(/chrome/i);
    var isSafari = !!navigator.userAgent.match(/safari/i) && !isChrome;
    var isEdge = !!navigator.userAgent.match(/edge/i);
    var isAndroid = !!navigator.userAgent.match(/android/i);
    var hasMinimumSize = window.innerWidth >= 768 && window.innerHeight >= 768; // use window size to trigger player-only
    // TODO: confirm the above is preferable to screen.width/height check
    //var hasMinimumSize = screen.width >= 768 && screen.height >= 768;
    var isiPhoneOriPod = !!navigator.platform.match(/i(Phone|Pod)/i);
    var isSupportedBrowser = ((isChrome && !isAndroid) || (isAndroid && hasMinimumSize) || isSafari) && !isEdge;

    if (!isSupportedBrowser) {
        document.body.innerHTML = '<div class="gradient" style="height:100%"><p style="padding:30px; color:#eee; font-size:18px; position: relative;  top: 20%; ">' +
            'Please access Data Mapping using the ' +
            '<span style="color:#fff; font-weight:bold;">Chrome</span>' +
            ' (Windows PC, Mac OS X, and full-size Android tablet) or ' +
            '<span style="color:#fff; font-weight:bold;">Safari</span>' +
            ' (Mac OS X and iPad) web browsers.</p>' +
        '</div>';
    }

    var browserSupport = {
        isSupported : isSupportedBrowser,
        playerOnly  : isiPhoneOriPod || !hasMinimumSize
    };

    return browserSupport;
}
