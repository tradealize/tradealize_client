import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";

export const EDITOR_JS_TOOLS = {
  paragraph: Paragraph,
  list: List,
  header: Header,
  quote: Quote,
  marker: Marker,
};

const renderListItems = (items) =>
  items.map((item) => `<li>${item}</li>`).join("");

export const parseBlock = (block) => {
  if (block.type === "list") {
    if (block.data.style === "ordered") {
      return `<ol>${renderListItems(block.data.items)}</ol>`;
    } else {
      return `<ul>${renderListItems(block.data.items)}</ul>`;
    }
  }
  if (block.type === "quote") {
    return `<div ${
      block.data.alignment === "center" ? "className='text-center'" : ""
    }><quote>${block.data.text}</quote><p>${block.data.caption}</p></div>`;
  }
  if (block.type === "header") {
    return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
  }
  if (block.type === "paragraph") {
    return `<p>${block.data.text}</p>`;
  }
};
