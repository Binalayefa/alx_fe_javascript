// Load quotes from localStorage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

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
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });

        if (!response.ok) {
            throw new Error('Failed to sync with the server');
        }

        console.log('Quote successfully posted:', await response.json());
    } catch (error) {
        console.error('Error posting quote:', error);
    }
}

// Function to resolve conflicts (avoiding duplicate quotes)
function resolveConflicts(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    
    serverQuotes.forEach(serverQuote => {
        const existsLocally = localQuotes.some(q => q.text === serverQuote.text);
        if (!existsLocally) {
            localQuotes.push(serverQuote);
        }
    });

    // Save updated quotes to localStorage
    localStorage.setItem('quotes', JSON.stringify(localQuotes));
    quotes = localQuotes;
    displayRandomQuote();
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

// Function to display a random quote
function displayRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `${randomQuote.text} - <em>${randomQuote.category}</em>`;
    } else {
        quoteDisplay.innerHTML = 'No quotes available.';
    }
}

// Function to add a new quote and sync it
function addQuote(text, category) {
    if (!text || !category) {
        alert("Please enter both a quote and a category.");
        return;
    }

    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Post new quote to the server
    postQuoteToServer(newQuote);
    displayRandomQuote();
}

// Event listener for "Show New Quote" button
document.getElementById('newQuoteBtn').addEventListener('click', displayRandomQuote);

// Event listener for adding a quote
document.getElementById('addQuoteBtn').addEventListener('click', function () {
    const text = document.getElementById('quoteInput').value;
    const category = document.getElementById('categoryInput').value;

    addQuote(text, category);
});

// Load stored quotes and display a random quote on page load
document.addEventListener('DOMContentLoaded', function () {
    displayRandomQuote();
    fetchQuotesFromServer();
});
