from typing import List, Optional
from app.models.entity import EntityNamesByType
from pydantic import BaseModel, Field


class GeminiResponseEmotion(BaseModel):
    id: str = Field(..., example="happy")


class User(BaseModel):
    name: str = Field(..., example="ニッキー")
    age: int = Field(..., example=30)  # ageは数値なのでint型に修正
    gender: str = Field(..., example="男性")


class TextInfo(BaseModel):
    text: str = Field(..., example="今日はとても良い一日でした。")
    emotion: str = Field(..., example="joy")
    user_name: Optional[str] = Field(..., example="ニッキー")


class OneLineText(BaseModel):
    text: str = Field(..., example="こんにちは！")


class Title(BaseModel):
    title: str = Field(..., example="私の日記")


class GuessDiary(BaseModel):
    text: str = Field(
        ...,
        example="今日は本当に良い一日だった。午前中は、近所のカフェでゆっくりと読書を楽しんだ。窓から差し込む暖かい日差しを浴びながら、美味しいコーヒーを味わい、至福の時間を過ごした。午後は、友人と久しぶりに再会し、思い出話に花を咲かせた。昔と変わらない彼の笑顔を見て、心が温かくなった。夕食は、妻と一緒に手料理に挑戦した。少し焦げ付いてしまったけど、二人で協力して作った料理は格別だった。今日という日に感謝するとともに、明日もまた頑張ろうと思った。",
    )
    title: str = Field(..., example="新しい家族")


class Reply(BaseModel):
    """
    モフの返事とエンティティ
    """

    reply: str = Field(..., example="新しい家族")
    entities: EntityNamesByType | None
