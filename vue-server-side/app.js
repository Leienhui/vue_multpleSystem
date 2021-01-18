const express = require('express');
const app = express();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const url = require('url');
const gm = require('gm');

app.use(express.static('uploads'));


// 裁图
app.get('/cutpic', (req, res) => {
    // 得到参数
    const x = url.parse(req.url, true).query.x;
    const y = url.parse(req.url, true).query.y;
    const w = url.parse(req.url, true).query.w;
    const h = url.parse(req.url, true).query.h;
    // 原图和新图的比
    const rate = url.parse(req.url, true).query.rate;
    // 裁切哪张？？
    const filename = url.parse(req.url, true).query.filename;

    gm('./uploads/' + filename)
    .crop(w * rate, h * rate, x * rate, y * rate)
    .write('./uploads/' + filename, function (err) {
      if (!err) console.log('done');
      res.send('ok');
    });
});

// 检查数字是否大于5000
app.get('/checknum', (req, res) => {
    const a = url.parse(req.url, true).query.a;

    if (a > 5000) {
        res.send('ok');
    } else {
        res.send('nook');
    }
});

// 给tree用的接口
app.get('/tree', (req, res) => {
    const n = url.parse(req.url, true).query.n;

    if (n == '北京总部') {
        res.json({'info': ['总裁办', '人事部', '销售部']})
    } else if (n == '上海分公司') {
        res.json({'info': ['人事部', '销售部', '运维部']})
    } else if (n == '北京总部人事部') {
        res.json({'info': ['应天翔', '李芳', '考拉', '张三']})
    } else if (n == '上海分公司人事部') {
        res.json({'info': ['姜润丰', '张立春']})
    }
});


// 得到指定文件夹中的图片
app.get('/get-pic-from-the-directory', (req, res) => {
    const directory = url.parse(req.url, true).query.directory;

    // 读取db.txt，然后提供为接口
    fs.readFile('./db.txt', (err, content) => {
        const arr = JSON.parse(content.toString());
        res.json(arr.filter(item => item.directory == directory || directory == '未分类图片' && (item.directory == undefined || item.directory == '')));
    });
});

// 得到所有文件夹的名字
app.get('/get-all-directory-name', (req, res) => {
    // 读取db.txt，然后提供为接口
    fs.readFile('./db2.txt', (err, content) => {
        res.json(JSON.parse(content.toString()));
    });
});

app.post('/up', (req, res) => {
    // 创建一个formidable表单，这是API文档上面的语句
    const form = formidable({
        multiples: true,
        uploadDir: __dirname + '/uploads',
        keepExtensions: true
    });

    // 处理上传的请求
    form.parse(req, (err, fields, files) => {
        const name = path.parse(files.pic.path).base;
        // 返回结果
        res.json({
            name
        });
    });
});

// 存储db图片资源数据库。点击前端的图片上传组件的step2的确定按钮的时候，进行写数据库的操作。
app.post('/add-to-db', (req, res) => {
    // 存入小小数据库中db.txt
    // 创建一个formidable表单，这是API文档上面的语句
    const form = formidable({});

    form.parse(req, (err, fields, files) => {
        // 得到POST传来的两个参数，第一个数文件名的数组，第二个是文件夹名字
        const filenamearr = fields.filenamearr;
        const directory = fields.directory;

        // 思路：先打开db.txt，然后改，最后写。
        // 为什么这么麻烦，因为我们没有用MySQL数据库。如果用了MySQL就一句话
        // 注意，因为可能同时有很多文件正在写，所以这里必须是Sync后缀，表示同步。
        // 同步就是排队；不会说一个文件和另一个文件交叉。
        const content = fs.readFileSync('./db.txt');
        var arr = JSON.parse(content.toString());
        arr = [...arr, ...filenamearr.map(item => ({
            directory,
            'filename': item,
            'title': '未命名图片'
        }))];
        // 写
        fs.writeFileSync('./db.txt', JSON.stringify(arr));
        res.send('ok');
    });
});


// 重命名图片
app.post('/cmmtupian', (req, res) => {
    // 存入小小数据库中db.txt
    // 创建一个formidable表单，这是API文档上面的语句
    const form = formidable({});

    form.parse(req, (err, fields, files) => {
        // 得到POST传来的两个参数，第一个数文件名的数组，第二个是文件夹名字
        const filename = fields.filename;
        const title = fields.title;

        // 思路：先打开db.txt，然后改，最后写。
        // 为什么这么麻烦，因为我们没有用MySQL数据库。如果用了MySQL就一句话
        // 注意，因为可能同时有很多文件正在写，所以这里必须是Sync后缀，表示同步。
        // 同步就是排队；不会说一个文件和另一个文件交叉。
        const content = fs.readFileSync('./db.txt');
        var arr = JSON.parse(content.toString());
        // 改
        arr = arr.map(item => item.filename == filename ? {
            ...item,
            title
        } : item);
        // 写
        fs.writeFileSync('./db.txt', JSON.stringify(arr));
        res.send('ok');
    });
});


// 8080是前端代码，3000是后端代码。
app.listen(3000);