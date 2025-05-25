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
    tags: List[str]
    unread: bool


dummy_diaries = [
    DiaryEntry(
        id=1,
        unread=False,
        title="初めての投稿",
        date="2025-05-01",
        content="今日はとても良い日でした。公園でゆっくり読書をしました。",
        mood="happy",
        tags=["うれしかった", "リラックス", "読書"],
    ),
    DiaryEntry(
        id=2,
        unread=False,
        title="疲れた一日",
        date="2025-05-02",
        content="仕事が忙しくてクタクタ…。でも頑張った自分を褒めたい。",
        mood="meh",
        tags=["疲れた", "仕事", "がんばった"],
    ),
    DiaryEntry(
        id=3,
        unread=True,
        title="卵かけご飯が最高だった日",
        date="2025-05-03",
        content="朝ごはんに卵かけご飯を食べた。シンプルだけど美味しすぎた！",
        mood="happy",
        tags=["美味", "卵かけご飯", "朝ごはん"],
    ),
]


@router.get("/", response_model=List[DiaryEntry])
def get_diary_list():
    return dummy_diaries


@router.get("/{diary_id}", response_model=DiaryEntry)
def get_diary_detail(diary_id: int):
    for diary in dummy_diaries:
        if diary.id == diary_id:
            return diary
    raise HTTPException(status_code=404, detail="Diary not found")


@router.delete("/delete")
def delete_diaries():
    # 実際にはDBの削除処理などが入る
    return {"message": "すべての日記データを削除しました。"}
