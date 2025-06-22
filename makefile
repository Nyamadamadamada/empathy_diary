.PHONY: backend-deploy frontend-build frontend-local-server frontend-deploy

frontend-dev:
	@echo "--- フロントエンドの開発サーバーを起動中 ---"
	cd frontend/app && \
	npm run dev


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
