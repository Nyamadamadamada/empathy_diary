FROM python:3.13.3-slim-bookworm AS base

# ビルドステージの開始
FROM base AS builder

WORKDIR /usr/src/app

COPY ./requirements.txt .

# 仮想環境を使用し、グローバルインストールを避ける
# pip のアップグレードはインストール直前に行うことで、キャッシュの無効化を最小限にする
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir --upgrade pip && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# 本番環境用の最終イメージ
FROM base AS final

WORKDIR /usr/src/app

# ビルドステージで作成した仮想環境をコピー
COPY --from=builder /opt/venv /opt/venv

# 仮想環境をPATHに追加
ENV PATH="/opt/venv/bin:$PATH"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .

EXPOSE 8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
