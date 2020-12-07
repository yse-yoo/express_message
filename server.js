//express モジュールの読み込み
const express = require('express');

//サーバ作成
const app = express();

//ルーティング
// Webルートにリクエストされたらレスポンス
app.get('/', (req, res) => {
    res.send('Hello Express!');
});
//app.get(URLパス, 処理);

//無名関数の書き方
// app.get('/', function(req, res) {
    
// });


app.listen(3000);

console.log('Server listen: http://localhost:3000');
