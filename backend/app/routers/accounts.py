from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/accounts", tags=["accounts"])


class AccountEntry(BaseModel):
    account_id: str
    nickname: str
    icon_url: str
    email: str


@router.get("/{account_id}", response_model=AccountEntry)
def get_account_info(account_id: str):
    return {
        "account_id": "testAccout124",
        "nickname": "にっきー",
        "icon_url": "/img/icons/icon1.png",
        "email": "testkkkkkkkkkkkkk@test.com",
    }


@router.put("/{account_id}/icon")
def update_icon(account_id: str, icon: str):
    # 実際にはDB更新などが入る
    return {"message": "アイコンを保存しました。", "new_icon_url": icon_url}


@router.put("/{account_id}/nickname")
def update_nickname(account_id: str, nickname: str):
    # 実際にはDB更新などが入る
    return {"message": "ニックネームを変更しました。", "new_nickname": nickname}


@router.delete("/{account_id}")
def delete_account():
    # 実際にはDBの削除処理や認証解除処理などが入る
    return {"message": "アカウントを削除しました。"}
