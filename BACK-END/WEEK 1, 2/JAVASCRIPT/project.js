const fs = require('fs');
const readline = require('readline-sync');
const bcrypt = require('bcryptjs');

const usersFile = 'users.json';

// Function to register a new user
function registerUser() {
    const name = readline.question('Enter your name: ');
    const email = readline.question('Enter your email: ');
    const password = readline.question('Enter your password: ', { hideEchoBack: true });

    // Load existing users
    let users = [];
    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile));
    }

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        console.log('User already exists!');
        return;
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Save user
    users.push({ name, email, password: hashedPassword });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    console.log('Registration successful!');
}

// Function to log in a user
function loginUser() {
    const email = readline.question('Enter your email: ');
    const password = readline.question('Enter your password: ', { hideEchoBack: true });

    // Load users
    if (!fs.existsSync(usersFile)) {
        console.log('No users found!');
        return;
    }
    const users = JSON.parse(fs.readFileSync(usersFile));

    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        console.log('User not found!');
        return;
    }

    // Verify password
    if (bcrypt.compareSync(password, user.password)) {
        console.log('Login successful!');
        displayMenu(user);
    } else {
        console.log('Invalid password!');
    }
}

// Function to display the user menu after login
function displayMenu(user) {
    while (true) {
        console.log('\n1. View Profile');
        console.log('2. Logout');
        console.log('3. Exit');
        const choice = readline.question('Choose an option: ');

        switch (choice) {
            case '1':
                console.log(`\nName: ${user.name}\nEmail: ${user.email}`);
                break;
            case '2':
                console.log('Logging out...');
                return;
            case '3':
                console.log('Exiting...');
                process.exit();
            default:
                console.log('Invalid choice!');
        }
    }
}

// Main application flow
function main() {
    while (true) {
        console.log('\n1. Register');
        console.log('2. Login');
        console.log('3. Exit');
        const choice = readline.question('Choose an option: ');

        switch (choice) {
            case '1':
                registerUser();
                break;
            case '2':
                loginUser();
                break;
            case '3':
                console.log('Exiting...');
                process.exit();
            default:
                console.log('Invalid choice!');
        }
    }
}

// Start the application
main();