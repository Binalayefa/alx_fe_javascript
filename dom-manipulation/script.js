document.addEventListener("DOMContentLoaded", () => {
    // Quotes array
    let quotes = [
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
        { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
        { text: "Believe you can and you're halfway there.", category: "Confidence" }
    ];

    // Select DOM elements
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
    const newQuoteText = document.getElementById("newQuoteText");
    const newQuoteCategory = document.getElementById("newQuoteCategory");
    const addQuoteBtn = document.getElementById("addQuote");

    // Function to show a random quote
    function showRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplay.textContent = "No quotes available!";
            return;
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.textContent = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
    }

    // Function to add a new quote
    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        quotes.push({ text: quoteText, category: quoteCategory });

        newQuoteText.value = "";
        newQuoteCategory.value = "";

        alert("New quote added successfully!");
    }

    // Attach event listeners
    newQuoteButton.addEventListener("click", showRandomQuote);
    addQuoteBtn.addEventListener("click", addQuote);
});
