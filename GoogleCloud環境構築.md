## IAM について

API へのアクセスの有効化
https://cloud.google.com/iam/docs/service-accounts-create?hl=ja

ロール

- Cloud Run デベロッパー
- BigQuery 管理者

## Frontend

https://www.youtube.com/watch?v=NMnKGHgw8aM&t=600s

ルート直下
npm init --yes
npm install express

index.js ファイルを作成する
動作確認
npm run start

### デプロイ

前準備
glouc コマンドをインストールする
https://cloud.google.com/sdk/docs/install?hl=ja

```
# The next line updates PATH for the Google Cloud SDK.
source '[path-to-my-home]/google-cloud-sdk/path.bash.inc'
# The next line enables bash completion for gcloud.
source '[path-to-my-home]/google-cloud-sdk/completion.bash.inc'
```

https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service?hl=ja

gcloud auth login

gcloud config set project {ProjectID}

Cloud Run Admin API と Cloud Build API を有効にします。
gcloud services enable run.googleapis.com \
 cloudbuild.googleapis.com

リージョンを指定する
gcloud config set run/region asia-northeast1

デプロイ（初期設定あり）
gcloud run deploy frontend

質問

- Deploying from source requires an Artifact Registry Docker repository to store built
  containers. A repository named [cloud-run-source-deploy] in region [asia-northeast1] will be
  created.
  (Artifcat Registry つかってもいい？)

Do you want to continue (Y/n)? Y
（いいよ）

- Allow unauthenticated invocations to [pirate-service] (y/N)? y
  （認証なしで公開するけどいい？）
  （いいよ）

### Dockerfile

ざっくり
https://zenn.dev/igz0/articles/e3e859b88bdd56

セキュリティについて
https://snyk.io/jp/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

アーキテクチャの図参考
https://qiita.com/MokonaSato/items/fa22c7f64593ddc1c111

app.use('/\*', (req, res) => {
res.sendFile(path.join(\_\_dirname, '/public', 'index.html'));
});

index.js で SPA 対応（直リンクしても動かせるように）
https://teno-hira.com/media/?p=1615

gcloud run deploy frontend \
 --source=. \
 --region=asia-northeast1 \
 --platform=managed \
 --allow-unauthenticated \
 --quiet

# backend

gcloud run deploy backend \
 --source=. \
 --region=asia-northeast1 \
 --platform=managed \
 --allow-unauthenticated \
 --quiet
