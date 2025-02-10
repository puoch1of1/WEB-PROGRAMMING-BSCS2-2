const fs = require('fs'); // since fetch doesnt work on console, i used fs module to run the file locally in the console.

// To load json file using call backs
function loadJSONCallback(file, callback) {
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) return callback(err, null);
        try {
            const parsedData = JSON.parse(data);
            callback(null, parsedData);
        } catch (parseError) {
            callback(parseError, null);
        }
    });
}

// to load the json file with promises
function loadJSONPromise(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) reject(err);
            try {
                resolve(JSON.parse(data));
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
}

// to load the json file Async/Await
async function loadJSONAsync(file) {
    try {
        const data = await fs.promises.readFile(file, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
}

// Example Usage
const filePath = "./sample3.json"; 

loadJSONCallback(filePath, (err, data) => {
    if (err) console.error("Callback Error:", err.message);
    else console.log("Callback Data:", data);
});

loadJSONPromise(filePath)
    .then(data => console.log("Promise Data:", data))
    .catch(err => console.error("Promise Error:", err.message));

loadJSONAsync(filePath)
    .then(data => console.log("Async/Await Data:", data))
    .catch(err => console.error("Async/Await Error:", err.message));
