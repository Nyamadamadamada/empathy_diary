import os
from app.services.classifier_emotion_service import EmotionClassifier
from app.services.create_diary_service import CreateDiary
from app.services.create_reply_service import CreateReply

"""
依存注入に使う関数
"""


def get_emotion_classifer() -> EmotionClassifier:
    GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]
    return EmotionClassifier(GEMINI_API_KEY)


def get_create_diary() -> CreateDiary:
    GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]
    return CreateDiary(GEMINI_API_KEY)


def get_create_reply() -> CreateReply:
    GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]
    return CreateReply(GEMINI_API_KEY)


def get_entity() -> CreateReply:
    return CreateReply()
