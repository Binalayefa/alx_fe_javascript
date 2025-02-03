// Define the array of quotes with text and category
let quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Inspiration" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    // Generate a random index based on the length of the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    // Select the random quote
    const quote = quotes[randomIndex];
  
    // Update the DOM by using innerHTML to insert the quote into the page
    document.getElementById("quoteDisplay").innerHTML = `
      <p><strong>Category:</strong> ${quote.category}</p>
      <p><em>"${quote.text}"</em></p>
    `;
  }
  
  // Event listener for button to show a new quote when clicked
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Call showRandomQuote function initially to display a quote on page load
  showRandomQuote();
  