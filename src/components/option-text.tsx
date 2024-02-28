export function OptionText({ text }: { text: string }) {
  const processText = (text: string) => {
    return text
      .trim()
      .split(" ")
      .map((t) => {
        if (t.startsWith("`") && t.endsWith("`")) {
          return (
            <span
              key={t}
              className=" px-2 py-1 mx-2 rounded-md font-semibold bg-primary text-white"
            >
              {t.slice(1, -1)}
            </span>
          );
        }
        return t;
      });
  };

  // Ensure to wrap processText(text) inside {} to correctly render JSX
  return <p>{processText(text)}</p>;
}
