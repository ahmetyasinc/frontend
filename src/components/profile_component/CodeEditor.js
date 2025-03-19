"use client";

import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // **Python Dil Desteği Ekle**
    monaco.languages.register({ id: "python" });

    monaco.languages.setMonarchTokensProvider("python", {
      tokenizer: {
        root: [
          // **Yorum Satırları**
          [/#.*/, "comment"],
    
          // **Anahtar Kelimeler (Keywords)**
          [
            /\b(def|class|if|else|elif|return|import|from|as|with|try|except|finally|while|for|in|break|continue|pass|lambda|not|or|and|is|assert|async|await|del|global|nonlocal|raise|yield)\b/,
            "keyword",
          ],
    
          // **Yerleşik (Built-in) Sabitler**
          [/\b(True|False|None)\b/, "constant"],
    
          // **Veri Türleri (Data Types)**
          [
            /\b(int|float|str|bool|list|tuple|set|dict|bytes|complex|range|frozenset|memoryview|bytearray|object|type)\b/,
            "type",
          ],
    
          // **Matematiksel ve Mantıksal Operatörler**
          [/[+\-*/%=<>!&|^~]+/, "operator"],
    
          // **Parantezler ve Köşeli Parantezler**
          [/[{}()\[\]]/, "delimiter"],
    
          // **Sayılar (Numbers)**
          [/\b\d+(\.\d+)?\b/, "number"],
    
          // **String'ler (Tek ve Çift Tırnaklı)**
          [/"""/, "string", "@triple_double_quote"],
          [/'''/, "string", "@triple_single_quote"],
          [/".*?"/, "string"],
          [/'.*?'/, "string"],
    
          // **Yerleşik (Built-in) Fonksiyonlar**
          [
            /\b(print|len|type|range|open|abs|round|sorted|map|filter|zip|sum|min|max|pow|chr|ord|bin|hex|oct|id|repr|hash|dir|vars|locals|globals|help|isinstance|issubclass|callable|eval|exec|compile|input|super|memoryview|staticmethod|classmethod|property|delattr|getattr|setattr|hasattr|all|any|enumerate|format|iter|next|reversed|slice)\b/,
            "function",
          ],
    
          // **Modüller (Import Edilen Kütüphaneler)**
          [/\b(os|sys|math|random|time|datetime|re|json|csv|argparse|collections|functools|itertools|threading|multiprocessing|socket|subprocess|asyncio|base64|pickle|gzip|shutil|tempfile|xml|http|urllib|sqlite3)\b/, "module"],
        ],
    
        // **Üçlü Tırnaklı Stringler için State Tanımları**
        triple_double_quote: [
          [/"""/, "string", "@popall"],
          [/./, "string"],
        ],
    
        triple_single_quote: [
          [/'''/, "string", "@popall"],
          [/./, "string"],
        ],
      },
    });
    
  };

  return (
    <Editor
      height="400px"
      language="python"
      theme="vs-dark"
      value={code}
      onChange={setCode}
      onMount={handleEditorDidMount}
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        wordWrap: "on",
      }}
    />
  );
};

export default CodeEditor;
