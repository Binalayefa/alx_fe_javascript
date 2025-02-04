let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Purpose" },
    // Add more quotes as needed
];

// Populate categories dynamically using .map()
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');

    // Extract unique categories using map() and Set()
    const categories = [...new Set(quotes.map(quote => quote.category))];

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Populate the dropdown with unique categories
    categories.map(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Load the saved filter from localStorage
    const savedFilter = localStorage.getItem('selectedCategory');
    if (savedFilter) {
        categoryFilter.value = savedFilter;
        filterQuotes();  // Apply the filter based on saved selection
    }
}

// Filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    let filteredQuotes;

    if (selectedCategory === 'all') {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }

    localStorage.setItem('selectedCategory', selectedCategory);
    displayQuotes(filteredQuotes);
}

// Display quotes
function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `${randomQuote.text} - <em>${randomQuote.category}</em>`;
    } else {
        quoteDisplay.innerHTML = 'No quotes available for this category.';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    populateCategories(); // Populate categories when the page loads
});
