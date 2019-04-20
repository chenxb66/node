const Router = require('koa-router');
const path = require('path');
const {promisify} = require('util');
const fs = require('fs');

const unlike = promisify(fs.unlink);

const router = new Router();

// 横幅列表
router.get('/banner/list', async ctx => {

    let bannerList = await ctx.db.query('SELECT * FROM banner');

    await ctx.render('admin/banner/index', {bannerList});
});

// 添加横幅
router.post('/banner/add', async ctx => {
    let {title, image, url, number} = ctx.request.fields;

    await ctx.db.query('INSERT INTO banner(title, image, url, number) VALUES (?, ?, ?, ?)', [
        title, path.basename(image[0].path), url, number
    ]);

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = '添加成功, <a href="/admin/banner/list">点此返回列表</a>';
});

// 删除横幅
router.get('/banner/delete/:id', async ctx => {
    const {id} = ctx.params;

    const result = await ctx.db.query('SELECT * FROM banner WHERE id = ? LIMIT 1', [id]);

    ctx.assert(result, 404, '找不到相关信息');

    await ctx.db.query('DELETE FROM banner WHERE id = ? LIMIT 1', [id]);

    await unlike(path.resolve(ctx.config.app.uploadDir, result[0].image));

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = '删除成功, <a href="/admin/banner/list">点此返回列表</a>';
});

// 修改横幅
router.post('/banner/edit/:id', async ctx => {
    const {id} = ctx.params;
    const {title, image, url, number} = ctx.request.fields;

    let result = await ctx.db.query('SELECT * FROM banner WHERE id = ? LIMIT 1', [id]);
    ctx.assert(result, 404, '找不到相关信息');

    let sets = [];
    sets.push(`title='${title}'`);
    sets.push(`url='${url}'`);
    sets.push(`number=${number}`);
    image[0].size && (sets.push(`image='${path.basename(image[0].path)}'`));
    sets = sets.join(',');

    await ctx.db.query(`UPDATE banner SET ${sets} WHERE id = ? LIMIT 1`, [id]);

    image[0].size && (await unlike(path.resolve(ctx.config.app.uploadDir, result[0].image)));

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = '修改成功, <a href="/admin/banner/list">点此返回列表</a>';
});

// 导出
module.exports = router.routes();