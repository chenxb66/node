# ES6

## 变量声明```let```和```const```
- 不可重复定义
- 控制修改
- 有块级作用域

## 解构赋值
- 左右两边一样
- 右边得是个东西
```javascript
let json = {a: 1, b: 2, c: 3};
let {a, b, c} = json;
```
```javascript
let arr = [1, 2, 3];
let [a, b, c] = arr;
```

## 函数
### 箭头函数
- 如果有且只有一个参数,()可以省略
- 如果只有1条语句，且语句是return, {}可以省略
```javascript
(参数) => {}
```
- 返回json的省略问题
```javascript
// 返回一个json简写的时候，为了省略{},得用()包裹json，否则语法错误
()=>({a: 1, b: 2})
```
- 修复this
```javascript
```

### 参数展开
- 剩余参数
    - 必须是函数的最后一个参数
```javascript
function show(a, b, ...arr) {
    console.log(a, b, arr);
}

show(1,2,3,4,5,6,7,8,9,10);
```
- 展开数组
```javascript
//案例一，展开成独立参数
let arr = [1,2,3,4,5];
function sum(a, b, c, d, e) {
    return a + b + c + d + e;
}
sum(...arr);

// 展开合并到一个新数组中
let arr2 = [6,7,8,9,10];
let all = [..arr, ...arr2];
```

## 系统对象扩展
### Array
- map 映射
```javascript
// 大于60的返回true
let arr = [100, 98, 37, 28, 19, 96, 56, 67];
arr.map(value => value >= 60);
// 有2个参数,第二个是key,可以省略
```
- forEach 遍历
```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.forEach((value, key) => {
    // 同样key也可以省略
    // 和map不一样的地方就是没有return结果
    // 要修改值用map,不修改值用forEach
    alert(`第${key}个值是${value}`);
});
```
- filter 过滤
```javascript
let arr = [100, 98, 37, 28, 19, 96, 56, 67];
let arr2 = arr
    .filter(value => value % 2)
    .filter(value => value < 60);
// 就是选出满足条件的，保存到数组中，不满足的被删除（删除的过程是filter底部自己处理）
```
- reduce 汇总
```javascript
let arr = [12, 66, 81, 92];

let avg = arr.reduce((tmp, value, key) => {
    // key从1开始，0被放在tmp中
    tmp = tmp + value;
    return key == arr.length - 1 ? tmp / arr.length : tmp;
});
```

### String
- 字符串模版
```javascript
let name = '0xfeat';
let age = 25;

console.log(`${name},${age}`);
```
- startWith()
```javascript
let url = '';
if (url.startWith('http://') || url.startWith('https://')) {
    alert('是网址');
} else {
    alert('不是网址');
}
```
- endWith()
```javascript
// 参考startWith
```

### JSON
- 标准写法
```javascript
{"key": "aaa", "key2": 2};
// js里key可以不带引号，但是不通编程语言中，得写这样才标准，能传递
```
- JSON.stringify()
```javascript
let json = {"a": 12, "b": 5, "c": 7};

console.log(JSON.stringify(json)); // 转成json字符串
```
- JSON.parse()
```javascript
let json = '{"a": 12, "b": 5, "c": 7}';

console.log(JSON.parse(json)); // 字符串转成json对象
```
- es6省略语法
```javascript
let a = 1;
let b = 2;
let c = 3;

// 如果属性和值一样，可以简写
let json = {a, b, c}; //等同于{a: a, b: b, c: c};

// 可以省略函数
const json2 = {
    show() {

    }
    // 上下2个方法是一样的
    show: function() {

    }
}
```

## 异步处理
- 异步操作的弊端，嵌套
```javascript
```
### Promise
- 基本用法案例（基于ajax）
```javascript
let p = new Promise(function(resolve, reject) {
    $.ajax({
        url: 'data/1.json',
        dataType: 'json',
        success(data) {
            resolve(data)
        },
        error(res) {
            reject(res)
        }
    })
});

p.then(function(data) {
    alert('成功');
}, function(res) {
    alert('失败');
}).catch();

// resolve == success
// reject == error
```
- jQuery的ajax其实也是一个Promise
```javascript
// 3个ajax不保证顺序，如果第二个ajax基于第一个ajax的结果，如下代码办不到
Promise.all([
    $.ajax({url: 'data/1.json', dataType: 'json'}), // $.ajax返回一个Promise
    $.ajax({url: 'data/2.json', dataType: 'json'}),
    $.ajax({url: 'data/3.json', dataType: 'json'}),
]).then(([data1, data2, data3]) => {
    // 上述写法相当于直接就赋值解构了
    // 解构赋值可以直接往参数上放
}).catch((err) => {
    alert(1);
});
```

### async/await
- 专门用来配合Promise
```javascript

(async () => {
    try {
        // 代码写法是同步，但是背后运行是异步回调
        let data1 = await $.ajax({url: 'data/1.json', dataType: 'json'});
        let data2 = await $.ajax({url: 'data/2.json', dataType: 'json'});
        let data3 = await $.ajax({url: 'data/3.json', dataType: 'json'});
    } catch(e) {
        // 如果出错 
    }
})()
```

## babel
- 在线
1. 引入babel
2. ```<script>```的type属性设置为text/babel
```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
// 这个type必须是text/babel
// 这边可以写任何的es6代码
</script>
```
- 编译
1. npm安装
```javascript
npm i @babel/core @babel/cli @babel/preset-env -D
```
> ```@```表示最新版本   
> ```core``` 核心库     
> ```cli``` 命令行工具  
> ```preset-env``` 预设的配置。比如IE7兼容的语法，IE8兼容的语法，chrome兼容哪些语法。   

2. 添加.babelrc文件，声明preset
```json
{
    "presets": ["@babel/preset-env"]
}
```
> 如果没有这个，则编译后的结果和源码一模一样

3. 执行转换命令
```shell
babel src -d dest
```

## 面向对象
- class
- constructor
- extends
- super
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    show() {
        alert(this.name);
        alert(this.age);
    }
}

class Worker extends Person {
    constructor(name, age, job) {
        super(name, age); // 调用父类
        this.job = job;
    }

    show() {
        super.show();
        alert(this.job);
    }
}

let w = new Worker('enyccc', 30, 'php');
w.show();
```

## 闭包
- 栈的东西留着别删

## 模块化
- 浏览器和Node不支持ES6的模块化，但是webpack能解决这个问题
- 最简单的方法
```javascript
// mod1.js
export let a = 12;

// index.js
import * as mod1 from 'mod1';
alert(mod1.a);
```
- export
```javascript
export let a = 1;   // 导出一个变量
export const aa = 1; // 导出一个常量

// 批量导出
let c = 1;
let d = 2;
let e = 3;
export {c, d, e};

// 导出函数
export function sum(n1, n2) {
    return n1 + n2;
}

// 导出类
export class Person {

}

// 导出默认成员
export default 'aaa';

// 从另一个模块导出
export * from './xxx2';
export {a,b,c,d} from './xxxx3';
export {default} from './xxx4'; // 把xxx4的default再导出
```
- import
```javascript
// 基本用法，引入所有的
import * as mod from './xxx';

// 只要其中某一些变量
import {a, b, c} from './xxx';

// 只要一个，专门引用export default
// 相当于把export default赋值到xxx
import xxx from './xxx';

// 只需要执行模块,不需要它的内部成员,通常在引入图片和css
import "./xxx";

// 异步引入，路径必须是绝对路径
let promise = import("/node/code/src/xxx");
```


## webpack
- 安装
```shell
npm i webpack -g
```
- 配置
```javascript
const path = require('path');

module.exports = {
    mode: 'production', // 指定模式
    entry: './src/index.js', // 入口文件，所有路径必须有个./
    output: {
        path: path.resolve(__dirname, 'build'), // 必须是绝对路径
        filename: 'bundle.js' 
    }
}
```
## 正则表达式
```javascript
// js风格
let reg = new RegExp('\\d+', 'g'); 
// perl风格,常用
let reg = /\d+/g;
```
### 选项
- g
- i

### 字符串里使用使用正则的方法
- search()
- match()
- replace()
- split()

## 正则的方法
- test()


### 元字符
- [123]
- [0-9]
- [^0-9]
- [a-zA-Z0-9]

### 转义
- \d
- \w
- \s
- .
- \D
- \W
- \S

### 量词
- {n}
- {n, m}
- {n,}
- \+
- ?
- \*

### 修饰符
- ^
- $

### 或
- |

### 优先级
- ()

# ES7
## 幂操作 **
```javascript
console.log(12**5); // 幂操作
```
## 数组对象扩展：Array.includes() 
```javascript
let site = ['runoob', 'google', 'taobao'];
site.includes('runoob'); 
// true 
site.includes('baidu'); 
// false
```

# ES8
## await/async

# ES9
## rest/spread
## 异步迭代
## Promise.finally()
## 增加正则的模式

