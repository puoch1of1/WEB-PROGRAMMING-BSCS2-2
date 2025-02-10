const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');

// to read user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filePath = 'userdata.json';

// to hash passwords using SHA-256
function makeHash(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('hex');
}

// To read user data from JSON file
function getUsers() {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath));
}

// to save user data to JSON file
function saveUsers(uglyData) {
    fs.writeFileSync(filePath, JSON.stringify(uglyData, null, 2));
}

// to register a new user
function signUp() {
    rl.question('New username? ', (usr) => {
        let allUsers = getUsers();
        if (allUsers[usr]) {
            console.log('Bruh, that username is taken.');
            return start();
        }
        rl.question('Password? ', (pwd) => {
            allUsers[usr] = { pass: makeHash(pwd) };
            saveUsers(allUsers);
            console.log('Nice! You are registered.');
            start();
        });
    });
}

// to log in an existing user
function signIn() {
    rl.question('Username? ', (usr) => {
        let usersData = getUsers();
        if (!usersData[usr]) {
            console.log("Who dis? You ain't registered.");
            return start();
        }
        rl.question('Password? ', (pwd) => {
            if (usersData[usr].pass === makeHash(pwd)) {
                console.log('Ayy, you in!');
                userDash(usr);
            } else {
                console.log('Nah, wrong password.');
                start();
            }
        });
    });
}

// function to display user menu after login
function userDash(name) {
    console.log(`\nSup ${name}, what now?`);
    console.log('1. See profile');
    console.log('2. Logout');
    console.log('3. Exit');

    rl.question('Pick 1-3: ', (opt) => {
        if (opt === '1') {
            console.log(`\nYour profile:\nUsername: ${name}`);
            userDash(name);
        } else if (opt === '2') {
            console.log('Logging out... Later.');
            start();
        } else if (opt === '3') {
            console.log('GoodBye');
            rl.close();
        } else {
            console.log("Bruh, type 1, 2, or 3.");
            userDash(name);
        }
    });
}


// to start the main menu in the console.
function start() {
    console.log('\n1. Create account');
    console.log('2. Login');
    console.log('3. Quit');

    rl.question('Yo, what you wanna do? ', (pick) => {
        if (pick === '1') signUp();
        else if (pick === '2') signIn();
        else if (pick === '3') {
            console.log('Peace out!');
            rl.close();
        } else {
            console.log('Try again, but better.');
            start();
        }
    });
}

start();
