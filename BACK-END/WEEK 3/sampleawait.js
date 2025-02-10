async function loadBio() {
    try {
        // Simulating fetching data from a server
        let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        let user = await response.json();

        // Updating the page dynamically
        document.getElementById("bio").textContent = 
            `Hi, I'm ${user.name}. I'm a software developer based in ${user.address.city}. 
            Contact: ${user.email}`;
    } catch (error) {
        document.getElementById("bio").textContent = "Failed to load bio. Try again.";
        console.error("Error fetching bio:", error);
    }
}
