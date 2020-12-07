//express モジュールの読み込み
const express = require('express');

//サーバ作成
const app = express();
//JSON対応
app.use(express.json());
// URLエンコードされたデータを解析する
app.use(express.urlencoded({ extended: true }));

//クロスドメインの許可  XSS
app.use((req, res, next) => {
    console.log(`middleware: all. url: ${req.url}`);

    //CROS設定: 全てのドメインに対して許可 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //次の処理
    next();
});

//静的コンテンツ
app.use(express.static(__dirname + '/public'));


//message.html から Ajax で POST リクエストされる
app.post('/', (req, res) => {
    let result = {
        message: req.body.message,
        datetime: new Date(),
    };
    //レスポンス
    res.send(result);
});

app.post('/purchase', (req, res) => {
    const tax_rate = 0.1;
    const price = req.body.price;
    const amount = req.body.amount;

    const tax = price * amount * tax_rate;
    const excluding_price = price * amount;
    const total_price = excluding_price + tax;

    let result = {
        excluding_price: excluding_price,
        total_price: total_price,
        tax: tax,
    };
    //レスポンス
    res.send(result);
});

//ルーティング
// Webルートにリクエストされたらレスポンス
app.get('/', (req, res) => {
    res.send('Hello Express!');
});
//app.get(URLパス, 処理);

app.listen(3000);

console.log('Server listen: http://localhost:3000');
