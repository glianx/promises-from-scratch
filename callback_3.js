function fetchData(url, callback) {
    console.log("fetchin' data...");
    // simulate network lag
    setTimeout(() => {
        data = {"url": url, "id": 69};
        callback(data);
    }, 2000)
}

fetchData("https://nasa.gov",(d) => {
    console.log("data received: ", d);
})

console.log("welcome...");