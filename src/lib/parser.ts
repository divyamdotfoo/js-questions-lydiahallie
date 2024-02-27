import { Octokit } from "@octokit/rest";
import { nanoid } from "nanoid";

const octokit = new Octokit({});

const getReadme = async (path: string) => {
  const repo = (await octokit.repos.getContent({
    owner: "lydiahallie",
    path: path,
    repo: "javascript-questions",
  })) as { data: { content: string } };
  const content = Buffer.from(repo.data.content, "base64").toString("utf-8");
  return content;
};

const sanitizeContent = async (content: string) => {
  const regex = /######.*?\n(.*?)\n---/gs;
  const matches = Array.from(content.matchAll(regex));
  const results = matches.map((m) => m[0]);

  const arrageData = (questions: string[]) => {
    return questions.map((q) => {
      const optId: Record<string, string> = {};
      const questionReg = /###### \d+\.\s(.*?)\n\n(```|-\sA:)/gs;
      const codeReg = /```javascript\n([\s\S]*?)\n```/g;
      const optionsReg = /-\s([A-G]):\s(.*?)(?=\n- [A-G]:|\n<|\Z)/gs;
      const explanationReg = /<p>\n\n([\s\S]*?)<\/p>/gs;
      const qMatcher = Array.from(q.matchAll(questionReg))[0];
      const codeMatcher = Array.from(q.matchAll(codeReg))[0];
      const options = Array.from(q.matchAll(optionsReg)).map((val, i, opt) => {
        const id = nanoid(10);
        optId[String.fromCharCode(i + 65)] = id;
        return {
          option: val[1],
          value: val[2],
          id,
        };
      });
      const explanationMatcher = Array.from(q.matchAll(explanationReg));
      const explanationStr =
        Array.isArray(explanationMatcher[0]) && explanationMatcher[0][1]
          ? explanationMatcher[0][1]
          : null;
      const answer = explanationStr
        ? optId[
            explanationStr
              .slice(0, explanationStr.indexOf("\n"))
              .split(":")[1]
              .trim()
          ]
        : null;
      return {
        question: Array.isArray(qMatcher) && qMatcher[1] ? qMatcher[1] : null,
        code: codeMatcher ? codeMatcher[1] : null,
        options,
        explanation: explanationStr
          ? explanationStr.slice(explanationStr.indexOf("\n"))
          : null,
        answer,
      };
    });
  };
  return arrageData(results);
};

export const parser = async (path: string) => {
  const readmeContent = await getReadme(path);
  if (!readmeContent) return null;
  return sanitizeContent(readmeContent);
};

export const allPaths: Record<string, string> = {
  english: "README.md",
  bosanski: "bs-BS/README-bs_BS.md",
  deutsch: "de-DE/README.md",
  arabicSA: "ar-AR/README_AR.md",
  arabicEG: "ar-EG/README_ar-EG.md",
  espanol: "es-ES/README-ES.md",
  francais: "fr-FR/README_fr-FR.md",
  indonesia: "id-ID/README.md",
  italiano: "it-IT/README.md",
  japanese: "ja-JA/README-ja_JA.md",
  korean: "ko-KR/README-ko_KR.md",
  nederlands: "nl-NL/README.md",
  polski: "pl-PL/README.md",
  portugueseBR: "pt-BR/README_pt_BR.md",
  romana: "ro-RO/README.ro.md",
  russian: "ru-RU/README.md",
  shqip: "sq-KS/README_sq_KS.md",
  thai: "th-TH/README-th_TH.md",
  turkce: "tr-TR/README-tr_TR.md",
  ukrainian: "uk-UA/README.md",
  vietnamese: "vi-VI/README-vi.md",
  simplifiedChinese: "zh-CN/README-zh_CN.md",
  traditionalChinese: "zh-TW/README_zh-TW.md",
};
// not working
// bosanski arabicSA portugeseBR thai chinese

export const getPath = (lang: string) => allPaths[lang] ?? null;
