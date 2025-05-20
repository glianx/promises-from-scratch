function add(x, y, callback) {
    z = x + y;
    callback(z);
}

function square(z) {
    s = z * z;
    console.log(s);
}

add(3,4, function(z) {
    console.log(z);
});

add(3,4, (z) => console.log(z));

add(3,4, square);
add(3,4, (z) => square(z));
add(3,4, ( ) => square("10"));