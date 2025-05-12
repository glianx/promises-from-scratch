function compHash(a, b, callback) {
    getHash(a, ra => {
        getHash(b, rb => {
            callback(ra, rb);
        });
    });
}

function getHash(x, callback) {
    setTimeout(() => {
        r = x % 10;
        callback(r);
    }, 1000);
}

function sameHash(x, y) {
    console.log(x == y);
}

compHash(17,27,sameHash);