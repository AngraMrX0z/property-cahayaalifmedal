window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }

gtag('consent', 'default', {
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  ad_storage: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', 'G-SMJPZQF15Y');

var consentNotice = document.getElementById('consentNotice');
var grantButton = document.getElementById('grantButton');

function loadGoogleTag() {
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-SMJPZQF15Y';
  document.head.appendChild(gtagScript);
}

if (localStorage.getItem('consentGranted') === 'true') {
  gtag('consent', 'update', {
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    ad_storage: 'granted',
    analytics_storage: 'granted'
  });
  if (consentNotice) consentNotice.hidden = true;
}

if (grantButton) {
  grantButton.addEventListener('click', function() {
    localStorage.setItem('consentGranted', 'true');
    gtag('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted'
    });
    if (consentNotice) consentNotice.hidden = true;
  });
}

loadGoogleTag();
