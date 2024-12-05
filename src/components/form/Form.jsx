import React, { useState, useEffect } from "react";
import "./Form.css";
import ArticleList from "../articleList/ArticleList";

export default function Form() {
  const articleDefault = {
    name: "",
    author: "",
    state: "Draft",
    img: "",
    content: "",
    tags: [false, false, false],
  };

  const [article, setArticle] = useState(articleDefault);
  const [articleList, setArticleList] = useState([]);

  function handleFormData(e) {
    if (e.target.type === "checkbox") {
      const updatedTags = [...article.tags];
      if (e.target.name === "HTML") {
        updatedTags[0] = e.target.checked;
      } else if (e.target.name === "CSS") {
        updatedTags[1] = e.target.checked;
      } else {
        updatedTags[2] = e.target.checked;
      }
      setArticle((article) => ({
        ...article,
        tags: updatedTags,
      }));
    } else {
      setArticle((article) => ({
        ...article,
        [e.target.name]: e.target.value,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newArticleList = [...articleList, article];
    setArticleList(newArticleList);
    setArticle(articleDefault);
  }

  function deleteArticle(index) {
    const newArticleList = [...articleList];
    newArticleList.splice(index, 1);
    setArticleList(newArticleList);
  }

  function editArticle(index) {
    const newName = prompt("Inserisci il nuovo nome");
    const newArticleList = [...articleList];
    newArticleList[index].name = newName;
    setArticleList(newArticleList);
  }

  return (
    <>
      <form className="mb-1 form" onSubmit={(e) => handleSubmit(e)}>
        <label className="form-label">Articoli</label>
        <div className="row">
          <div className="col-4">
            <input
              name="name"
              type="text"
              className="form-control "
              placeholder="Inserisci un nuovo articolo"
              value={article.name}
              onChange={(e) => handleFormData(e)}
              required
            />
          </div>
          <div className="col-4 mb-4">
            <input
              name="author"
              type="text"
              className="form-control "
              placeholder="Autore"
              value={article.author}
              onChange={(e) => handleFormData(e)}
              required
            />
          </div>
          <div className="col-4 mb-4">
            <input
              name="img"
              type="text"
              className="form-control "
              placeholder="Url immagine: https://picsum.photos/200/300"
              value={article.img}
              onChange={(e) => handleFormData(e)}
              required
            />
          </div>
          <div className="col-4 mb-4">
            <textarea
              name="content"
              type="text-box"
              className="form-control "
              placeholder="Contenuto"
              value={article.content}
              onChange={(e) => handleFormData(e)}
              required
            />
          </div>
          <div className="col-4 mb-4">
            <select
              name="state"
              className="form-select"
              value={article.state}
              onChange={(e) => handleFormData(e)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published </option>
            </select>
          </div>
          <div className="col-4 d-flex justify-content-around mb-4">
            <div className="me-2">
              <input
                type="checkbox"
                name="HTML"
                checked={article.tags[0]}
                onChange={(e) => handleFormData(e)}
              />
              <label>HTML</label>
            </div>
            <div className="me-2">
              <input
                type="checkbox"
                name="CSS"
                checked={article.tags[1]}
                onChange={(e) => handleFormData(e)}
              />
              <label>CSS</label>
            </div>
            <div className="me-2">
              <input
                type="checkbox"
                name="JS"
                checked={article.tags[2]}
                onChange={(e) => handleFormData(e)}
              />
              <label>JS</label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary col-12 mt-4 mb-4">
              Inserisci
            </button>
          </div>
        </div>
      </form>
      <div className="articleList">
        <ArticleList
          articleList={articleList}
          deleteArticle={deleteArticle}
          editArticle={editArticle}
        ></ArticleList>
      </div>
    </>
  );
}
