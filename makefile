.PHONY: backend-deploy frontend-build frontend-local-server frontend-deploy

# frontend
# フロントエンドの開発サーバーを起動
frontend-dev:
	cd frontend/app && \
	npm run dev

backend-setup:
	cd backend && \
	cp .env.local.dist .env && \
	docker compose build

# Reactをビルド
# distが生成される
build:
	cd frontend/app && \
	npm run build

# フロントエンドをローカルで起動して動作確認
# http://localhost:8080で動く 
local-server: 
	cd frontend && \
	npm run server


# フロントエンドをGoogle Cloud Runにデプロイ
frontend-deploy:
	cd frontend && \
	gcloud run deploy frontend \
	 --source=. \
	 --region=asia-northeast1 \
	 --platform=managed \
	 --allow-unauthenticated \
	 --quiet

# backend
# バックエンドの開発サーバーを起動
backend-dev:
	cd backend && \
	docker compose up -d

# バックエンドをGoogle Cloud Runにデプロイ
backend-deploy:
	@echo "--- バックエンドをデプロイ中 ---"
	cd backend && \
	gcloud run deploy backend \
	 --source=. \
	 --region=asia-northeast1 \
	 --platform=managed \
	 --allow-unauthenticated \
	 --quiet
	@echo "--- バックエンドのデプロイが完了しました ---"