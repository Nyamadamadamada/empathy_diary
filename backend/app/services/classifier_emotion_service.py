from google import genai

import json
import os

from app.models.emotion import GeminiResponseEmotion
from app.prompts.chat import EMOTION_CSV_CONTENT

# os.environを用いて環境変数を表示させます


class EmotionClassifier:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def _build_prompt(self, text: str) -> str:
        return f"""
あなたは、文章の内容から感情を分類するAIアシスタントです。
# 命令文
次のステップで感情を分類してください。
1. 提供された感情のリストの中から、textがどのemotionに該当するかを判別する
2. 該当するemotionのvalueを出力形式に沿って出力する

# 感情のリスト
{EMOTION_CSV_CONTENT}

# text
{text}
"""

    def classify_emotion(self, text: str) -> GeminiResponseEmotion:
        """
        テキストの感情を分類し、その結果を返す
        エラーが発生した場合は、空の GeminiResponseEmotion インスタンスを返す
        """
        prompt = self._build_prompt(text)
        try:
            response = self.client.models.generate_content(
                model="gemini-1.5-flash-8b",
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                    "response_schema": GeminiResponseEmotion,
                },
            )

            return response.parsed

        except Exception as e:
            # エラーが発生した場合、空のインスタンスを返す
            print(
                f"Error classifying emotion: {e}. Returning empty GeminiResponseEmotion."
            )
            return GeminiResponseEmotion(emotion="")
