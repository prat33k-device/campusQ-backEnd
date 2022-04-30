
exports.date = function() {
    return new Date().toLocaleDateString("en-IN", {
        year: 'numeric',
        month: 'long',
        day: "numeric"
    });
}

exports.time = function() {
    return new Date().toLocaleTimeString('en-US', {
        hour12: false, 
        hour: "numeric", 
        minute: "numeric"
    });
}

