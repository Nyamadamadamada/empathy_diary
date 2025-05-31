from app.models.emotion import GeminiResponseEmotion
from app.models.diary import GuessDiary, OneLineText, TextInfo
from app.services.classifier_emotion_service import EmotionClassifier
from app.core.dependences import get_create_diary, get_emotion_classifer, get_save_diary
from app.services.create_diary_service import CreateDiary
from app.services.save_diary_service import SaveDiary
from fastapi import APIRouter, Depends
from typing import List
from pydantic import BaseModel
import os

router = APIRouter(prefix="/chats", tags=["chats"])


@router.post("/emotion", response_model=GeminiResponseEmotion)
def judge_emotion(
    text: OneLineText, service: EmotionClassifier = Depends(get_emotion_classifer)
):
    # TODO: 節約でコメントアウト
    return service.classify_emotion(text)
    # return GeminiResponseEmotion(emotion="ANGRY_1")


@router.post("/diary", response_model=GuessDiary)
async def create_diary(
    text_info: TextInfo, service: CreateDiary = Depends(get_create_diary)
):
    text = await service.create_diary(text_info)
    title = await service.create_diary_title(text_info)
    return GuessDiary(title=title, text=text)


@router.post("/diary-finish", response_model=OneLineText)
def save_diary(text_info: TextInfo, service: SaveDiary = Depends(get_save_diary)):
    # TODO: 節約でコメントアウト
    return service.save_diary(text_info)
    return OneLineText(
        text="今日は本当にいい天気だなぁ。こんな日は、近所の公園で家族とピクニックでもしたいと思った。どこからか子供たちの楽しそうな声が聞こえてきて、心が温かくなるのを感じた。明日も晴れるといいな。"
    )
