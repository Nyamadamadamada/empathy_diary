TODO:これをもとに画像とか使ったみやすいやつをスライドで作成する。
@startuml
skinparam backgroundColor #FFFFFF
skinparam rectangle {
  BackgroundColor<<frontend>> #D0E6FF
  BackgroundColor<<backend>> #FFF4D0
  BackgroundColor<<gcp>> #E2FFD0
  BorderColor black
  RoundCorner 15
}
skinparam actorStyle awesome

actor User

' 前面グループ（左上）
rectangle "Frontend" <<frontend>> {
  [React UI] as React
  [Firebase Hosting] as Hosting
}

' バックエンドグループ（中央）
rectangle "Backend" <<backend>> {
  [FastAPI] as FastAPI
  [Cloud Run] as CloudRun
}

' GCPサービス（右側）
rectangle "GCP Services" <<gcp>> {
  database "Firestore\n(DB)" as Firestore
  folder "BigQuery\n(Analytics)" as BigQuery
  cloud "Vertex AI\n(ML)" as VertexAI
}

' 位置調整のために方向を指定
User --> React : access
React --> Hosting : serves app
Hosting -right-> CloudRun : API request
FastAPI --> CloudRun : deployed to

CloudRun -right-> Firestore : Data Access
CloudRun -right-> BigQuery : Query / Analysis
CloudRun -right-> VertexAI : ML Prediction

@enduml
