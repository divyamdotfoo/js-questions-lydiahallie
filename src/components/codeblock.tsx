"use client";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-dark.css";
import { Question } from "@/lib/parser";
import { useEffect, useState } from "react";
import {
  OutputTypeError,
  OutputTypeLog,
  executeWorker,
} from "@/lib/executeWorker";
import { Play } from "lucide-react";

export function CodeBlock({ question }: { question: Question }) {
  if (!question.code) return null;
  const [val, setVal] = useState(question.code);
  const [output, setOuput] = useState<(OutputTypeLog | OutputTypeError)[]>([]);

  const typeCode = (index: number) => {
    if (!question.code) return;
    if (index >= question.code.length) return;
    setVal((v) => v + question.code?.charAt(index));
    const timeoutId = setTimeout(() => typeCode(index + 1), 20);
    return () => clearTimeout(timeoutId);
  };
  // useEffect(() => {
  //   const cleanUp = typeCode(0);
  //   return cleanUp;
  // }, [question]);
  return (
    <div className=" max-w-lg rounded-md shadow-sm flex flex-col gap-2 relative">
      <Editor
        className=" bg-card text-card-foreground  rounded-md border-primary border h-60"
        highlight={(val) => highlight(val, languages.js, "js")}
        value={val}
        onValueChange={(val) => {
          setVal(val);
        }}
        padding={20}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
        }}
      />
      <button
        className=" bg-primary p-2 rounded-md  absolute top-4 right-4"
        onClick={() => executeWorker(val, setOuput)}
      >
        <Play className=" text-white font-extrabold" />
      </button>
      <div className=" bg-card rounded-md px-4 py-2 text-white">
        {JSON.stringify(output)}
      </div>
    </div>
  );
}
