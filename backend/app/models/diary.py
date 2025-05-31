from pydantic import BaseModel, Field


class GeminiResponseEmotion(BaseModel):
    emotion: str = Field(..., example="happy")


class User(BaseModel):
    name: str = Field(..., example="山田太郎")
    age: int = Field(..., example=30)  # ageは数値なのでint型に修正
    gender: str = Field(..., example="男性")


class TextInfo(BaseModel):
    text: str = Field(..., example="今日はとても良い一日でした。")
    emotion: str = Field(..., example="joy")
    user: User = Field(..., example={"name": "山田太郎", "age": 30, "gender": "男性"})


class OneLineText(BaseModel):
    text: str = Field(..., example="こんにちは！")


class Title(BaseModel):
    title: str = Field(..., example="私の日記")


class GuessDiary(BaseModel):
    text: str = Field(..., example="今日、猫を拾いました。とても可愛いです。")
    title: str = Field(..., example="新しい家族")
