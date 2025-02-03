let quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      category: "Inspiration"
    },
    {
      text: "Life is what happens when you're busy making other plans.",
      category: "Life"
    }
  ];
  
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.category}`;
  }
  
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
    
    quotes.push({
      text: newQuoteText,
      category: newQuoteCategory
    });
    
    displayRandomQuote();  // Show the newly added quote
  }
  
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  
