function readFile(file, callback) {
    data = file.toUpperCase();
    callback(data);
}

function textFile(file) {
    return new Promise(resolve => {
        readFile(file, text => resolve(text));
    })
}

function randomFile(listFile) {
    // textFile(file) returns a promise
    // run .then chain on the promise
    // returns result of final .then promise
    return textFile(listFile)
        .then(contents => contents.trim().split("\n"))          // returns a value,   synchronous
        .then(ls => ls[Math.floor(Math.random() * ls.length)])  // returns a value,   synchronous
        .then(file => textFile(file))                           // returns a promise, asynchronous
        .then(console.log);
}

// better than this
function randomFileWorse(listFile) {
    return textFile(listFile).then(content => {
      const lines = content.trim().split("\n");
      const randomFile = lines[Math.floor(Math.random() * lines.length)];
      return textFile(randomFile);
    });
  }

function randomFileVerbose(listFile) {
    return textFile(listFile)
        .then(contents => {
            lines = contents.trim().split("\n");
            console.log(lines);
            return lines;
        })
        .then(ls => {
            index = Math.floor(Math.random() * ls.length);
            rfile = ls[index];
            console.log(index);
            console.log(rfile);
            return rfile;
        })
        .then(file => {
            tfile = textFile(file);
            console.log(tfile);
            return tfile;
        })
        .then(console.log);
}

textFile("file.txt").then(console.log);

new Promise(resolve => {
    readFile("data.csv", text => resolve(text))
}).then(console.log);

Promise.resolve(69).then(console.log);
new Promise(() => console.log("hello"));

fileList = 
"file 1\nfile 2\nfile 3\n";

randomFile(fileList);
randomFileWorse(fileList).then(console.log);
randomFileVerbose(fileList);