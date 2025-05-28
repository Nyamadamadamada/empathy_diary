from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import diaries

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# /api 以下に diaries ルーターをマウント
app.include_router(diaries.router, prefix="/api")
