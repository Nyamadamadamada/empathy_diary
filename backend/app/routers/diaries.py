from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/diaries", tags=["diaries"])


class DiaryEntry(BaseModel):
    id: int
    title: str
    date: str
    content: str
    mood: str
    unread: bool


@router.delete("/delete")
def delete_diaries():
    # 実際にはDBの削除処理などが入る
    return {"message": "すべての日記データを削除しました。"}
