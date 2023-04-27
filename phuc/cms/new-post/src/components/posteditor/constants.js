
import List from "@editorjs/list";


import Image from "@editorjs/image";

import Header from "@editorjs/header";

import Delimiter from "@editorjs/delimiter";


export const EDITOR_JS_TOOLS = {
  list: List,
  // image: Image,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: 'http://127.0.0.1:8000/blog/image/',
      }
    }
  },
  header: Header,
  delimiter: Delimiter, 
};
