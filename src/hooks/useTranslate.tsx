import { useEffect, useState } from "react";
import { OpenAI } from "openai";

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  dangerouslyAllowBrowser: true,
});

const models = await openai.models.list();
console.log(models);

const useTranslate = (sourceText: string, selectedLanguage: string): string => {
  const [targetText, setTargetText] = useState<string>("");

  useEffect(() => {
    const handleTranslate = async (text: string): Promise<void> => {
      try {
        const response = await openai.chat.completions.create({
          model: "GPT-3.5",
          messages: [
            {
              role: "user",
              content: `You will be provided with a sentence. This sentence: 
              ${text}. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${selectedLanguage}
              Do not return anything other than the translated sentence.`,
            },
          ],
        });

        const data = response.choices?.[0]?.message?.content;
        if (data) {
          setTargetText(data.trim());
        } else {
          console.error("No content received from the OpenAI response.");
        }
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500); 

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
