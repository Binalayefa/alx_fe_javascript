let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Function to fetch quotes from the mock server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'); // Simulating server response
        const serverQuotes = await response.json();
        
        // Convert to expected format
        const newQuotes = serverQuotes.map(post => ({
            text: post.title,
            category: "General" 
        }));

        resolveConflicts(newQuotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Function to resolve conflicts
function resolveConflicts(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    
    // Merge server quotes, prioritizing new ones
    serverQuotes.forEach(serverQuote => {
        const existsLocally = localQuotes.some(q => q.text === serverQuote.text);
        if (!existsLocally) {
            localQuotes.push(serverQuote);
        }
    });

    // Save updated quotes to localStorage
    localStorage.setItem('quotes', JSON.stringify(localQuotes));
    quotes = localQuotes;
    displayQuotes(quotes);
}

// Function to sync local quotes with the server
async function syncWithServer() {
    console.log('Syncing data...');
    await fetchQuotesFromServer();
}

// Periodic Syncing every 30 seconds
setInterval(syncWithServer, 30000);

// Function to display quotes
function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `${randomQuote.text} - <em>${randomQuote.category}</em>`;
    } else {
        quoteDisplay.innerHTML = 'No quotes available.';
    }
}

// Load stored quotes on page load
document.addEventListener('DOMContentLoaded', function() {
    displayQuotes(quotes);
    fetchQuotesFromServer();
});

