## 概要

GitHub API を利用した WebApp
OSS を検索し、スターをつけたり消したりする

## 機能

- 認可 OAuth
  - Github アカウントを利用した 0AUth2 を使用する
- 検索 Search
  - Github API を利用して OSS の検索を可能にする
- 一覧 Stars
  - Github API をいいねをつけた OSS の一覧を表示する

## 機能詳細

### 認可

- 認可されていなければサービスを利用できない
- 認可されていなければ認可画面へリダイレクトする

### 検索

- 検索テキストボックスが存在する
- 検索ボタンが存在する
  - 検索テキストボックスが空の時非活性
  - 押下時、検索を実行する
- 検索結果欄が存在する
  - 検索結果の一覧を出す
  - スターをつけられる
  - スターを消せる

## 一覧

- スターをつけた OSS の一覧を表示する
- スターをつけられる
- スターを消せる
- OSS の概要を表示する

## キーワード

- GraphQL (client)
- NgRx
- OAuth(Git Hub API)
  - Authorization Code Grant
  - PKCE はない模様(?)
    - コンフィデンシャルクライアントを想定
      - firebase auth を利用する

## 目的

- OAuth に触れる
- GraphQL (client) の勉強

## link

- https://github.com/firebase/firebaseui-web
- https://docs.github.com/ja/free-pro-team@latest/graphql/overview/explorer
