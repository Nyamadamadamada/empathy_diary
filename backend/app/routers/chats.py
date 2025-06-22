from app.models.diary import (
    EmotionScore,
    GeminiResponseEmotion,
    GuessDiary,
    OneLineText,
    Reply,
    TextInfo,
)
from app.services.classifier_emotion_service import EmotionClassifier
from app.core.dependences import (
    get_create_diary,
    get_create_reply,
    get_emotion_classifer,
)
from app.services.create_diary_service import CreateDiary
from app.services.create_reply_service import CreateReply
from fastapi import APIRouter, Depends
import asyncio

router = APIRouter(prefix="/chats", tags=["chats"])


@router.post("/emotion", response_model=GeminiResponseEmotion)
def judge_emotion(
    text: OneLineText, service: EmotionClassifier = Depends(get_emotion_classifer)
):
    # TODO: 節約
    return GeminiResponseEmotion(id="HAPPY")
    return service.classify_emotion(text)


@router.post("/fix-diary", response_model=GuessDiary)
async def create_diary(
    text_info: TextInfo, service: CreateDiary = Depends(get_create_diary)
):
    # TODO: 節約
    return GuessDiary(
        title="最高の一日",
        text="こんにちは。今日は良い天気ですね",
    )

    try:
        async with asyncio.TaskGroup() as tg:
            task_create_diary = tg.create_task(service.create_diary(text_info))
            task_create_title = tg.create_task(service.create_diary_title(text_info))
            text = await task_create_diary
            title = await task_create_title
    except* Exception as err:
        print(f"create_diaryエラー:${err}")
        title = ""
        text = ""

    return GuessDiary(title=title, text=text)


@router.post("/reply", response_model=Reply)
async def create_reply(
    text_info: TextInfo, service: CreateReply = Depends(get_create_reply)
):
    # TODO: 節約
    return Reply(
        reply="こんにちは。今日は良い天気ですね。こんにちは。今日は良い天気ですね。こんにちは。今日は良い天気ですね。",
        entities={
            "PERSON": ["両親", "家族", "母", "父", "虜"],
            "ORGANIZATION": ["イオン"],
            "CONSUMER_GOOD": ["かき氷", "氷", "ふわふわかき氷", "箱", "機械"],
            "EVENT": ["攻防戦", "買い物"],
        },
        emotion_score=EmotionScore(score=-0.2, magnitude=3.6),
    )

    reply = ""
    entities = None
    score = EmotionScore(score=0, magnitude=0)
    try:
        async with asyncio.TaskGroup() as tg:
            task_create_reply = tg.create_task(service.create_reply(text_info))
            task_create_entity = tg.create_task(
                service.sanalyze_entities(text_content=text_info.text)
            )
            task_create_score = tg.create_task(
                service.analyze_sanalyze(text_content=text_info.text)
            )
            reply = await task_create_reply
            entities = await task_create_entity
            score = await task_create_score

    except* Exception as err:
        print(f"create_replyエラー:${err}")

    return Reply(reply=reply, entities=entities, emotion_score=score)
