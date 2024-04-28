function parseCookies(request) {
    let cookie = request.headers.cookie;
    let cookies = {};
    if (cookie) {
        cookie.split(';').forEach(function(cookie) {
            let parts = cookie.split('=');
            cookies[parts[0].trim()] = decodeURIComponent((parts[1] || '').trim());
        });
    }
    return cookies;
}