import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import diaries
from .routers import chats
from dotenv import load_dotenv

# .envファイルの内容を読み込見込む
load_dotenv()

app = FastAPI(root_path="/api")

APP_ENV = os.getenv("APP_ENV", "development")

if APP_ENV == "production":
    origins = [
        "https://frontend-8279078048.asia-northeast1.run.app",
    ]
else:  # development またはその他の環境
    origins = [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:8080",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可 (GET, POST, PUT, DELETEなど)
    allow_headers=["*"],  # すべてのヘッダーを許可
)


app.include_router(diaries.router)
app.include_router(chats.router)
