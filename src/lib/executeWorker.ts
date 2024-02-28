import { Dispatch, SetStateAction } from "react";

export const executeWorker = (
  code: string,
  setOuput: Dispatch<SetStateAction<(OutputTypeLog | OutputTypeError)[]>>
) => {
  const sanitizeCode = (userCode: string) => `
  self.onmessage = () => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      postMessage({type: 'log', data: args});
      originalConsoleLog.apply(console, args);
    };
    try {
      ${userCode.replaceAll("\n", "")}
    } catch (error) {
      postMessage({type: 'error', data: error.toString()});
    }
  };
  `;

  const blob = new Blob([sanitizeCode(code)], {
    type: "application/javascript",
  });

  const worker = new Worker(URL.createObjectURL(blob));
  worker.addEventListener("message", (ev) => {
    console.log(ev.data);
    setOuput((p) => [...p, ev.data]);
  });
  worker.addEventListener("error", (ev) => {
    console.log(ev.message);
    setOuput((p) => [...p, ev.message]);
  });
  worker.addEventListener("messageerror", (ev) => {
    console.log(ev.data);
    setOuput((p) => [...p, ev.data]);
  });

  worker.postMessage({});
};

export type OutputTypeLog = {
  type: "log";
  data: Array<any>;
};
export type OutputTypeError = {
  type: "error";
  data: "string";
};
