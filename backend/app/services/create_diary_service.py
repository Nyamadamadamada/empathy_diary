from google import genai


from app.models.diary import TextInfo, OneLineText, Title


class CreateDiary:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def _build_prompt(self, text_info: TextInfo) -> str:
        return f"""
あなたは、日記を添削するAIアシスタントです。

## 命令文
与えられた情報をもとに、自然な日記風の文章を200字程度で作成してください。

**重要な指示：**
- 箇条書きや構造化した形式は使わず、自然な文章で記述してください
- 感情は文章の中に自然に織り込んでください（「〜と思った」「〜と感じた」など）
- 状況説明も文章の一部として自然に含めてください
- 一つの段落で完結した日記として仕上げてください

## 入力データ
* text: {text_info.text}
* emotion: {text_info.emotion}
"""

    def _build_title_prompt(self, text_info: TextInfo) -> str:
        return f"""
あなたは、日記のタイトルを作成するAIアシスタントです。
# 命令文
textから50字程度の日記のタイトルを作成してください。なお、タイトル作成の注意点を守ってください。
# タイトル作成の注意点
- 難しい言葉を使わない
- テーマや内容がわかるワードを入れる
- 結論のみ

# text
{text_info.text}
"""

    async def create_diary(self, text_info: TextInfo) -> str:
        """
        日記を添削する
        エラーが発生した場合は、空の文字列を返す
        """
        prompt = self._build_prompt(text_info)
        try:
            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                    "response_schema": OneLineText,
                },
            )
            data: OneLineText = response.parsed

            return data.text

        except Exception as e:
            # エラーが発生した場合、空のインスタンスを返す
            print(f"Error classifying emotion: {e}. Returning empty OneLineText.")
            return ""

    async def create_diary_title(self, text_info: TextInfo) -> str:
        """
        日記にタイトルを作成する
        エラーが発生した場合は、空の 文字列を返す
        """
        prompt = self._build_title_prompt(text_info)
        try:
            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                    "response_schema": Title,
                },
            )

            data: Title = response.parsed
            return data.title

        except Exception as e:
            # エラーが発生した場合、空のインスタンスを返す
            print(f"Error classifying emotion: {e}. Returning empty OneLineText.")
            return ""
