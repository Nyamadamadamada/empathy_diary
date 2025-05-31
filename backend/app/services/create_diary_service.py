from google import genai


from app.models.diary import TextInfo, OneLineText, Title


class CreateDiary:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def _build_prompt(self, text_info: TextInfo) -> str:
        return f"""
あなたは、日記を添削するAIアシスタントです。
# 命令文
次のステップで200字程度の日記を作成してください。
1. textの内容をそのままに、正しい日本語にする。
2. emotionを「~と思った。」「~と感じた。」など短い文章で追加する。
3. textから予想されるW5H1の文章を追加する。
4. 文章をユーザー情報に即した口調にする。
5. 生成した文章を出力する。

# text
{text_info.text}
# emotion
{text_info.emotion}
# ユーザー情報
{text_info.user.age}歳、{text_info.user.gender}
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
        テキストの感情を分類し、その結果を返す
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
        テキストの感情を分類し、その結果を返す
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
