export interface ArticleFromApi {
  article_id?: number;
  title: string;
  topic: string;
  author: string;
  comment_count: number;
  created_at: number;
  votes?: number;
  article_img_url?: string;
}

export interface IndividualArticleFromApi extends ArticleFromApi {
  body: string;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export function isArticleFromApi(apiData: any): apiData is ArticleFromApi {
  if (typeof apiData !== "object" || apiData === null) {
    console.error("Invalid data: apiData should be an object and not null");
    return false;
  }
  if (typeof apiData.article_id !== "number") {
    console.error("Invalid data: apiData.article_id should be a number");
    return false;
  }
  if (typeof apiData.title !== "string") {
    console.error("Invalid data: apiData.title should be a string");
    return false;
  }
  if (typeof apiData.topic !== "string") {
    console.error("Invalid data: apiData.topic should be a string");
    return false;
  }
  if (typeof apiData.author !== "string") {
    console.error("Invalid data: apiData.author should be a string");
    return false;
  }
  if (typeof apiData.comment_count !== "number") {
    console.error("Invalid data: apiData.comment_count should be a number");
    return false;
  }

  if (typeof apiData.created_at !== "string") {
    console.error("Invalid data: apiData.created_at should be a string");
    return false;
  }

  if (typeof apiData.votes !== "number" && apiData.votes !== undefined) {
    console.error(
      "Invalid data: apiData.votes should be a number or undefined"
    );
    return false;
  }

  if (
    typeof apiData.article_img_url !== "string" &&
    apiData.article_img_url !== undefined
  ) {
    console.error(
      "Invalid data: apiData.article_img_url should be a string or undefined"
    );
    return false;
  }
  return true;
}

export function isIndividualArticleFromApi(
  article: any
): article is IndividualArticleFromApi {
  return typeof article.body === "string" && isArticleFromApi(article);
}

export function isArticleFromApiArray(
  apiData: any
): apiData is ArticleFromApi[] {
  return Array.isArray(apiData) && apiData.every(isArticleFromApi);
}
