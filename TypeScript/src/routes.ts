// File: routes.ts
// Author: 藤本シゲオ（fujimoto.shigeo@donuts.ne.jp）
// Description: ルーターの書き方のサンプル置き場
// 「他のHTTPメソッドの書き方も欲しいです！」ってなったら、
// Slack or Google Chatでメンションしまくってください by 藤本

// ルーターを依存まとめファイルから引っ張る
import { Router, base64 } from "./deps.ts";

// 初期化する
const router = new Router();

// GETのハローワールド
// 何も設定をいじらず、Dockerで起動したら、
// http://localhost:8000/api/v1/hello
// でアクセスできるはず。
router.get("/api/v1/hello", (context) => {
    //ただハロワ返すだけ
    context.response.body = {
        success: true,
        msg: "Hello World",
    };

    console.log("hello get");
});

// URLパラメーター付きのハローワールド
// 何も設定をいじらず、Dockerで起動したら、
// http://localhost:8000/api/v1/hello/<名前>
// でアクセスできるはず。
router.get("/api/v1/hello/:name", (context) => {

    // よくある、ハロー〇〇を返す
    context.response.body = {
        success: true,
        // context.paramsでURLパラメーターを取ってくる
        // ルートで「:」をつけたものがそのまま取れます
        msg: `Hello ${context.params.name}`,
    };

    console.log("hello name get");
});

// URLパラメーター付きのハローワールド
// →パラメーター/固定パス/パラメーターを挟んだバージョン
// 何も設定をいじらず、Dockerで起動したら、
// http://localhost:8000/api/v1/hello/<名前>/weekDay/<曜日>
// でアクセスできるはず。
router.get("/api/v1/hello/:name/weekDay/:weekDay", (context) => {

    // よくある、ハロー〇〇を返す
    context.response.body = {
        success: true,
        // context.paramsでURLパラメーターを取ってくる
        // ルートで「:」をつけたものがそのまま取れます
        msg: `Hello ${context.params.name}! Have a nice ${context.params.weekDay}!`,
    };

    console.log("hello name weekday get");
});

// GETのハローワールド
// 何も設定をいじらず、Dockerで起動したら、
// http://localhost:8000/api/v1/helloBase64
// でアクセスできるはず。
// Base64のメッセージを返す
router.get("/api/v1/helloBase64", (context) => {
    //ただハロワ返すだけ
    context.response.body = base64.encode(JSON.stringify({
        success: true,
        msg: "Hello World",
    }));

    console.log("hello Base64 get");
});

// POSTの中身をそのまま返すだけ
// 何も設定をいじらず、Dockerで起動したら、
// http://localhost:8000/api/v1/post
// でアクセスできるはず。
// POSTなので、Postman/Hoppscotch等でBody作って飛ばしましょう。
// （curlでやりたい猛者は止めません！curlでもどうぞ！）
router.post("/api/v1/post", async (context) => {
    // リクエストの中からJson取ってきて、パースする
    const requestBody = context.request.body({ type: "json" });
    const parsedBody = await requestBody.value;

    // そのまま返す
    context.response.body = {
        success: true,
        parsedValues: parsedBody,
    };

    console.log("post");
});

// POSTの中身をそのまま返すだけ（+URLパラメーターも返す）
// 何も設定をいじらず、Dockerで起動したら、
// http://localhost:8000/api/v1/post/<適当なパラメーター>
// でアクセスできるはず。
// POSTなので、Postman/Hoppscotch等でBody作って飛ばしましょう。
// （curlでやりたい猛者は止めません！curlでもどうぞ！）
router.post("/api/v1/post/:param", async (context) => {
    // リクエストの中からJson取ってきて、パースする
    const requestBody = context.request.body({ type: "json" });
    const parsedBody = await requestBody.value;

    // そのまま返す
    context.response.body = {
        success: true,
        parsedValues: parsedBody,
        param: context.params.param,
    };

    console.log("param post");
});

// exportして、他のファイルで使えるようにする
// export defaultにすることで、中括弧なしでimportできる
// なお、なぜそうなるかについてはTSの仕様読みましょう。
export default router;