import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS, parseBlock } from "./EditorTools";
import { htmlToBlocks } from "../../utils";

const editor = new EditorJS({
  holder: "editorjs",
  tools: EDITOR_JS_TOOLS,
});

const TextEditor = ({ initialContent, handleSubmitCallback }) => {
  const [elements, setElements] = useState(null);
  const [instance, setInstance] = useState(null);
  const [initialUpdate, setInitialUpdate] = useState(false);

  useEffect(() => {
    if (initialContent && initialContent !== null && initialContent !== "") {
      const result = htmlToBlocks(initialContent);
      setElements(result);
    }
  }, []);

  useEffect(() => {
    if (elements !== null) {
      setInitialUpdate(true);
    }
  }, [elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await instance.save();
    let contenido = "";
    data.blocks.forEach((block) => {
      contenido += parseBlock(block);
    });
    handleSubmitCallback(contenido);
  };

  const renderEditor = () => {
    if (initialUpdate) {
      return (
        <EditorJS
          data={{ blocks: elements }}
          instanceRef={(current) => setInstance(current)}
          tools={EDITOR_JS_TOOLS}
        />
      );
    }
  };

  return (
    <div className="container-fluid px-0">
      <form onSubmit={handleSubmit}>
        {renderEditor()}
        <button type="submit" className="btn btn-primary">
          <i className="fa fa-save me-1"></i>Guardar
        </button>
      </form>
    </div>
  );
};

export default TextEditor;
