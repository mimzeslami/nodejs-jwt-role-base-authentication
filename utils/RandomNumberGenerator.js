exports.RandomNumberGenerator = () => {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
