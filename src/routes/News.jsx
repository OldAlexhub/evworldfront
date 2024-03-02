import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/News.css";

const News = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keywords =
          "evs OR electric vehicles OR ev OR tesla OR rivian OR Lucid OR FISKER OR ev battery";
        const api_key = process.env.REACT_APP_NEWS_API;
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${keywords}&apiKey=${api_key}`
        );

        if (response.status === 200) {
          // Sort articles from newest to oldest
          const sortedArticles = response.data.articles.sort((a, b) => {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });

          setData(sortedArticles);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  }

  return (
    <div className="news-container">
      {data.map(
        (article, index) =>
          article.urlToImage && (
            <div key={index} className="news-card">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="news-image"
              />
              <div className="news-content">
                <h2
                  className="news-title"
                  style={{ textShadow: "2px 2px 4px #000000" }}
                >
                  {truncateText(article.title, 7)}
                </h2>
                <p
                  className="news-author"
                  style={{ textShadow: "2px 2px 4px #000000" }}
                >
                  <strong>Author:</strong> {article.author || "Unknown"}
                </p>
                <p
                  className="news-published"
                  style={{ textShadow: "2px 2px 4px #000000" }}
                >
                  <strong>Published:</strong>{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}-{" "}
                  {new Date(article.publishedAt).toLocaleTimeString()}
                </p>
                <p
                  className="news-description"
                  style={{ textShadow: "2px 2px 4px #000000" }}
                >
                  {truncateText(article.description, 15)}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link"
                  style={{ textShadow: "2px 2px 4px #000000" }}
                >
                  Read Article
                </a>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default News;
