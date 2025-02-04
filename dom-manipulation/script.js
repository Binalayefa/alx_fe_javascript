let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Function to fetch quotes from the mock server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'); // Simulated server
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

// Function to post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',  // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify JSON format
            },
            body: JSON.stringify(quote) // Convert data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to sync with the server');
        }

        console.log('Quote successfully posted:', await response.json());
    } catch (error) {
        console.error('Error posting quote:', error);
    }
}

// Function to resolve conflicts
function resolveConflicts(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    
    // Merge server quotes, avoiding duplicates
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

// Function to sync quotes with the server (both fetching and posting)
async function syncQuotes() {
    console.log('Syncing local data with the server...');

    // Fetch latest quotes from the server
    await fetchQuotesFromServer();

    // Post new or updated quotes to the server
    for (const quote of quotes) {
        await postQuoteToServer(quote);
    }

    // Notify the user when syncing is complete
    alert("Quotes synced with server!");
}

// Periodic Syncing every 30 seconds
setInterval(syncQuotes, 30000);

// Function to add a new quote and sync it
function addQuote(text, category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Post new quote to the server
    postQuoteToServer(newQuote);
    displayQuotes(quotes);
}

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
