import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/News.css";

const News = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(process.env.REACT_APP_NEWS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.articles)
        ) {
          // Ensure the articles array is present and is an array
          const sortedArticles = response.data.articles.sort((a, b) => {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });

          setData(sortedArticles);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Fetching data failed:", error);
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
                  {new Date(article.publishedAt).toLocaleDateString()} -
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

