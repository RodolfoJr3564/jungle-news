const model = require("../model");
const { BadRequest } = require("./ErrorInstance.js");

module.exports = class {
  constructor(accessLevelId) {
    this._Model = new model.Articles();
    this._accessLevelId = accessLevelId;
    this._keysReturn = this._accessLevelId
      ? ["title", "summary", "firstParagraph", "body", "category"]
      : ["title", "summary", "firstParagraph", "category"];
  }

  getAll({ category, author, categoryId, authorId }) {
    const keysReturnByQuery = ["title", "summary", "category"];
    console.log(category, author, categoryId, authorId);
    if (category || author) {
      return this._Model.getFilteredByCategoryOrAuthor(
        category,
        author,
        keysReturnByQuery
      );
    } else if (categoryId || authorId) {
      return this._Model.getFilteredByCategoryIdOrAuthorId(
        categoryId,
        authorId,
        keysReturnByQuery
      );
    }
    return this._Model.getAll(this._keysReturn);
  }

  getById(articleId) {
    return this._Model.getById(articleId, this._keysReturn);
  }

  create(article) {
    const fieldsAreMissing =
      !article.title ||
      !article.summary ||
      !article.firstParagraph ||
      !article.body ||
      !article.categoryId ||
      !article.authorId;

    if (fieldsAreMissing) {
      const errorMessage = `The ${
        (!article.title && "title") ||
        (!article.summary && "summary") ||
        (!article.firstParagraph && "firstParagraph") ||
        (!article.body && "body") ||
        (!article.categoryId && "categoryId") ||
        (!article.authorId && "authorId")
      } key is is mandatory`;
      throw new BadRequest(errorMessage);
    }

    return this._Model.create(article);
  }

  updateById(articleId, data) {
    return this._Model.updateById(articleId, data);
  }

  deleteById(articleId) {
    return this._Model.deleteById(articleId);
  }
};
