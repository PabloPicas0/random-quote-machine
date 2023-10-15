import "./App.css";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faFreeCodeCamp, faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const App = () => {
  const [quotes, setQuotes] = useState(null);
  const [color, setColor] = useState("#4048a9");
  const [isLoading, setIsLoading] = useState(false);

  //fetch data from api and display it
  const fetchQuote = async (signal) => {
    try {
      setIsLoading(true);

      const data = await fetch("https://api.quotable.io/random", { signal: signal });
      const results = await data.json();

      setQuotes(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

      setQuotes({
        _id: Math.random(),
        content: "Connection error. Please try again.",
        author: "Admin",
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchQuote(signal);

    return () => controller.abort();
  }, []);

  //set random backgrund color
  const randomHex = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    setColor(randomColor);
  };

  return (
    <div className="container-fluid p-0 m-0">
      <main
        className="d-flex justify-content-center align-items-center App-header"
        style={{ backgroundColor: `${color}`, gap: quotes ? "0px" : "10px" }}>
        {!quotes ? (
          <>
            <div className="spinner-grow spinner-grow-sm" role="status"></div>
            <div className="spinner-grow spinner-grow-sm" role="status"></div>
            <div className="spinner-grow spinner-grow-sm" role="status"></div>
          </>
        ) : (
          <>
            <div id="quote-box" className="shadow text-dark p-4 rounded bg-white">
              <div id="text" className="text-center mb-3 mx-4 quote-text">
                <FontAwesomeIcon icon={faQuoteLeft} />
                <span key={quotes._id}>{quotes.content}</span>
              </div>

              <div id="author" className="text-end my-3 blockquote-footer">
                <span>{quotes.author}</span>
              </div>

              <div id="buttons" className="d-flex justify-content-between mt-5 mb-3">
                <div className="d-flex justify-content-between align-items-center text-center me-4">
                  <a
                    style={{ backgroundColor: `${color}` }}
                    className="media me-2 text-white rounded"
                    title="Check my FreeCodeCamp profile!"
                    id="freecodecamp-quote"
                    href="https://www.freecodecamp.org/PabloPicaso">
                    <FontAwesomeIcon icon={faFreeCodeCamp} />
                  </a>

                  <a
                    style={{ backgroundColor: `${color}` }}
                    className="media me-2 text-white rounded"
                    title="Add this quote to github!"
                    id="github-quote"
                    href="https://github.com/PabloPicas0">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>

                  <a
                    style={{ backgroundColor: `${color}` }}
                    className="media me-2 text-white rounded"
                    title="Add this qoute in your X profile!"
                    id="tweet-quote"
                    href="twitter.com/intent/tweet">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                </div>

                <button
                  style={{ backgroundColor: `${color}` }}
                  id="new-quote"
                  className="next-button px-3"
                  onClick={() => {
                    fetchQuote();
                    randomHex();
                  }}
                  type="button"
                  disabled={isLoading}>
                  New Quote
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
