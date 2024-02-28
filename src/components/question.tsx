import { Question } from "@/lib/parser";
import { CodeBlock } from "./codeblock";
import { useQuestion } from "@/store";
import { OptionText } from "./option-text";

export function QuestionData({ question }: { question: Question }) {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto lg:gap-12 items-start">
      <CodeBlock question={question} />
      <div className=" flex flex-col items-start gap-4">
        <QuestionString question={question} />
        <Options question={question} />
      </div>
    </div>
  );
}

export function QuestionString({ question }: { question: Question }) {
  if (!question) return null;
  return (
    <p className=" font-bold w-full text-pretty text-lg bg-popover text-popover-foreground p-4 rounded-md tracking-wide">
      {question.question}
    </p>
  );
}

export function Options({ question }: { question: Question }) {
  if (!question || !question.options.length) return null;
  return (
    <div className=" grid grid-cols-1 gap-4">
      {question.options.map((option) => (
        <Option option={option} key={option.id} />
      ))}
    </div>
  );
}

export function Option({ option }: { option: Question["options"][number] }) {
  return (
    <button className="rounded-md p-4 bg-popover text-popover-foreground flex gap-2 items-center">
      <p className=" font-bold opacity-80">{option.option + "."}</p>
      <OptionText text={option.value} />
    </button>
  );
}
