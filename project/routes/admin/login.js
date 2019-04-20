const Router = require('koa-router');
const crypto = require('crypto');

const router = new Router();

// 登录页面
router.get('/login', async ctx => {
    await ctx.render('admin/login/index', {error: ''});
});

// 进行登录
router.post('/login', async ctx => {
    let {account, password} = ctx.request.fields;

    // 判断帐号和密码是否有传递
    if (!account || !password) {
        await ctx.render('admin/login/index', {error: '帐号和密码必须为空'});
        return;
    }

    // 读取一下用户信息
    let data = await ctx.db.query("SELECT * FROM user_admin WHERE account = ? LIMIT 1", [account]);

    // 是否有数据&密码是否正确
    const md5 = crypto.createHash('md5');
    password = md5.update(password);
    password = md5.digest('hex');

    // 密码判断
    if (data.length == 0 || data[0].password != password) {
        await ctx.render('admin/login/index', {error: '帐号或密码不正确'});
        return;
    }

    // 保存登录信息
    ctx.session['admin'] = data[0];

    // 跳转到后台首页
    ctx.redirect('/admin/banner/list');
});

// 导出
module.exports = router.routes();