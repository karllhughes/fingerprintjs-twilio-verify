$(document).ready(() => {
    FingerprintJS.load({token: 'V2GzqkiuEtAije5ORCUy'})
        .then((fp) => fp.get())
        .then((result) => {
            console.log(result.visitorId);
            $('input#visitorIdInput').val(result.visitorId);
        });
});
