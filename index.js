const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const quotes = [
  {
    content:
      "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    content:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  // Add more quotes as needed
];

app.get("/", (req, res) => {
  let displayQuotes = quotes; // Default to all quotes

  if (req.query.q) {
    const searchTerm = req.query.q.toLowerCase();
    displayQuotes = quotes.filter((quote) =>
      quote.author.toLowerCase().includes(searchTerm),
    );
  }

  const randomQuote =
    displayQuotes[Math.floor(Math.random() * displayQuotes.length)];

  res.send(`
    <html>
      <head>
        <title>Quote of the Day</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
          }

          .quote-box {
            text-align: center;
            padding: 20px;
            border: 2px solid #3498db;
            border-radius: 10px;
            background-color: #fff;
            max-width: 600px;
            margin-bottom: 20px;
          }

          .quote-box h2 {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
          }

          .quote-box blockquote {
            font-size: 18px;
            min-height: 110px;
            color: #666;
          }

          .quote-box p {
            font-size: 16px;
            margin-top: 10px;
            color: #777;
          }

          form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          label {
            font-size: 18px;
            color: #333;
            margin-bottom: 5px;
          }

          #search {
            padding: 8px;
            font-size: 16px;
            border: 1px solid #3498db;
            border-radius: 5px;
            margin-bottom: 10px;
          }

          input[type="submit"] {
            padding: 10px 15px;
            font-size: 16px;
            background-color: #3498db;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="quote-box">
          <h2>${req.query.q ? "Search Results" : "Quote of the Day"}</h2>
          <blockquote>${randomQuote.content}</blockquote>
          <p>Author: ${randomQuote.author}</p>
        </div>

        <form action="/" method="get">
          <label for="search">Search Author:</label>
          <input type="text" id="search" name="q" placeholder="Type author's name..." value="${
            req.query.q || ""
          }">
          <input type="submit" value="Search">
        </form>
      </body>
    </html>
  `);
});

app.listen(8000, () => {
  console.log("Server has started on port 8000");
});
