let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Purpose" },
    // Add more quotes as needed
  ];
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes)); // Save the quotes array as a JSON string
  }
  
  // Function to load quotes from local storage
  function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes); // Parse the JSON string back into an array
    }
  }
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `${randomQuote.text} - <em>${randomQuote.category}</em>`;
  }
  
  // Function to create the form to add a new quote
  function createAddQuoteForm() {
    const form = document.createElement('form');
    const quoteTextInput = document.createElement('input');
    quoteTextInput.id = 'newQuoteText';
    quoteTextInput.type = 'text';
    quoteTextInput.placeholder = 'Enter a new quote';
    
    const quoteCategoryInput = document.createElement('input');
    quoteCategoryInput.id = 'newQuoteCategory';
    quoteCategoryInput.type = 'text';
    quoteCategoryInput.placeholder = 'Enter quote category';
    
    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = 'Add Quote';
    
    form.appendChild(quoteTextInput);
    form.appendChild(quoteCategoryInput);
    form.appendChild(addButton);
    
    const quoteFormContainer = document.getElementById('quoteForm');
    quoteFormContainer.innerHTML = ''; 
    quoteFormContainer.appendChild(form);
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const newQuoteText = quoteTextInput.value;
      const newQuoteCategory = quoteCategoryInput.value;
      addQuote(newQuoteText, newQuoteCategory);
    });
  }
  
  // Function to add a new quote to the array and update the DOM
  function addQuote(text, category) {
    const newQuote = { text, category };
    quotes.push(newQuote); // Add the new quote to the array
    saveQuotes(); // Save quotes to local storage after adding
    showRandomQuote(); // Display a random quote
  

  