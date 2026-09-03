# Golf Growth

3人で共有できる、スマホ向けゴルフ成長スコアブックです。

## 主な機能
- 9ホールの共有スコアカード（3〜10）
- ティー・アプローチ・パットの4段階評価
- コースマスタとPar構成
- 練習カルテ、改善ノート
- Firebase Firestoreのリアルタイム同期
- PWAインストール
- GitHub Pages自動公開

## ローカル起動
1. Node.js 22をインストール
2. `.env.example` を `.env.local` にコピー
3. Firebase設定値を入力
4. `npm install`
5. `npm run dev`

Firebaseを未設定でも、LocalStorageの画面体験版として動作します。

## Firebase設定
1. Firebase Consoleでプロジェクトを作成
2. Webアプリを追加
3. Authenticationで「匿名」を有効化
4. Firestore Databaseを作成
5. Firebase CLIを使う場合は `firebase deploy --only firestore:rules`
6. `.env.local` にWebアプリ設定を入力

## GitHub Pages公開
1. GitHubで空のリポジトリを作成
2. このフォルダ内のファイルをすべてアップロード
3. Repository Settings > Secrets and variables > Actions に `.env.example` と同名の6つの値を登録
4. Repository Settings > Pages > Source で `GitHub Actions` を選択
5. `main` ブランチへpushすると自動でbuild/deploy

## 注意
現在のFirestoreルールは、匿名認証済みユーザーにラウンドの読み書きを許可するMVP用です。参加コードを知るユーザーだけが操作する小規模検証を想定しています。本格公開前には、参加者IDまたは招待トークンによるアクセス制御へ強化してください。
