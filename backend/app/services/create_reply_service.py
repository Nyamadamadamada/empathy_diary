from google import genai
from google.cloud import language_v2

from app.models.diary import OneLineText, TextInfo
from app.models.entity import EntityNamesByType


class CreateReply:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def _build_reply_prompt(self, text_info: TextInfo) -> str:
        return f"""
あなたは日記の返事を作成するAIアシスタントです。
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
- 「~だね。」「~かな。」など優しい口調の口語

# text
{text_info.text}
# emotion
{text_info.emotion}
# user
{text_info.user_name}
"""

    async def create_reply(self, text_info: TextInfo) -> str:
        """
        もふの返事を作成する
        """
        prompt = self._build_reply_prompt(text_info)
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
            print(f"Error classifying emotion: {e}. Returning empty OneLineText.")
            return ""

    async def sanalyze_entities(self, text_content: str = "") -> None:
        """
        Analyzes Entities in a string.

        Args:
        text_content: The text content to analyze
        """
        try:
            client = language_v2.LanguageServiceClient()

            # Available types: PLAIN_TEXT, HTML
            document_type_in_plain_text = language_v2.Document.Type.PLAIN_TEXT

            # Optional. If not specified, the language is automatically detected.
            # For list of supported languages:
            # https://cloud.google.com/natural-language/docs/languages
            language_code = "ja"
            document = {
                "content": text_content,
                "type_": document_type_in_plain_text,
                "language_code": language_code,
            }

            # Available values: NONE, UTF8, UTF16, UTF32.
            # See https://cloud.google.com/natural-language/docs/reference/rest/v2/EncodingType.
            encoding_type = language_v2.EncodingType.UTF8

            response = client.analyze_entities(
                request={"document": document, "encoding_type": encoding_type}
            )

            target_types = {
                "PERSON",
                "ORGANIZATION",
                "LOCATION",
                "CONSUMER_GOOD",
                "EVENT",
            }
            result = {etype: set() for etype in target_types}

            for entity in response.entities:
                entity_type = language_v2.Entity.Type(entity.type_).name
                name = entity.name
                if entity_type in target_types:
                    result[entity_type].add(name)
            print(result)
            return EntityNamesByType(**result)
        except Exception as e:
            print(f"エラー: {e}")
            return EntityNamesByType()
