from pydantic import BaseModel


class GeminiResponseEmotion(BaseModel):
    emotion: str
