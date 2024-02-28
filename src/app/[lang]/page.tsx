import { QuestionData } from "@/components/question";
import { getPath, parser, allPaths } from "@/lib/parser";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { lang: string } }) {
  try {
    const lang = params.lang;
    const path = getPath(lang);
    if (!path) notFound();
    const data = await parser(path);
    if (!data?.length) return null;
    return <QuestionData question={data[0]} />;
  } catch (e) {
    console.log(e);
    notFound();
  }
}

export async function generateStaticParams() {
  return Object.keys(allPaths).map((k) => ({ lang: k }));
}
