from google import genai


from app.models.diary import OneLineText, TextInfo


class SaveDiary:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def _build_reply_prompt(self, text_info: TextInfo) -> str:
        return f"""
あなたは、日記の返事を作成するAIアシスタントです。
# 命令文
次のステップで200字程度の日記の返事を作成してください。なお、日記の返事作成の注意点を守ってください。
1. textとemotionの内容を要約し、「~ということがあったんだね。」「~な気持ちになったんだね。」など短い文章を追加する。
2. textの感想を追加する。
- 内容がポジティブな場合、「僕もやってみたい」「いいね。楽しそう。」など共感する
- 内容がネガティブな場合、「~という考えもあるんじゃないかな。」「僕だったらこう思うな。」など、第三者的意見を述べる
3. userの健康や幸せを願う締めの言葉を追加する。
- 「userさんのお話し、また聞かせてね。」「userさんにたくさんの良いことがありますように。」など

# 日記の返事作成の注意点
- 一人称は僕
- 「~だね。」「~かな。」など優しい口調

# text
{text_info.text}
# emotion
{text_info.emotion}
# ユーザー名
{text_info.user.name}
# ユーザー情報
{text_info.user.age}歳、{text_info.user.gender}
"""

    def create_diary(self, text: str) -> OneLineText:
        """
        テキストの感情を分類し、その結果を返す
        エラーが発生した場合は、空の OneLineText インスタンスを返す
        """
        prompt = self._build_reply_prompt(text)
        try:
            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                    "response_schema": OneLineText,
                },
            )

            return response.parsed

        except Exception as e:
            # エラーが発生した場合、空のインスタンスを返す
            print(f"Error classifying emotion: {e}. Returning empty OneLineText.")
            return OneLineText(text="")
