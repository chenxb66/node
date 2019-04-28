## 指令

### {{}}
### v-bind
> :
### v-model
### v-text/v-html
### v-if/v-show
### v-for
### v-pre
### v-cloak
### v-on
> @
#### 事件修饰符
- stop
- once
- prevent
- navite
- keycode|keyname
- self
- capture

## data

## methods

## computed

## watch

## template

## 简单的实现vue

## vue-router

### <router-view>
### <router-link>

### 命名路由

### 路由信息($route)

### js控制路由
- this.$router.push()
- this.$router.replace()
- this.$router.go()

### 多文件开发案例

### 路由嵌套

### 数据通信
- axios
```javascript
import Vue from "vue/dist/vue.esm";
import Axios from "axios";

new Vue({
    el: "#app",
    data: {
        name: '',
        age: 0,
        loaded: false
    },
    async created() {
        // 生命周期函数
        try {
            let res = await Axios.get('/data/user.json');

            let {data} = res;

            this.name = data.name;
            this.age = data.age;

            this.loaded = true;
        } catch (Error e) {
            alert('服务器离家出走了');
        }
       
        // Axios.post();
    },
    template: `
    <div v-show="isLoad">
        <label>姓名</label><label>{{name}}</label><br/>
        <label>姓名</label><label>{{age}}</label><br/>
    </div>
    `
});
```
#### axios使用
- get
```javascript
import Axios from "axios";

async () => {
    // 生命周期函数
    try {
        let res = await Axios({
            url: "/data/user.json",
        });
        let {data} = res;
    } catch (Error e) {
        alert('服务器离家出走了');
    }
}
```

- post
```javascript
import Axios from "axios";
import {stringify} from  'querystring';

const customerAxios = Axios.create({
    transformRequest: [
        function(data) {
            /*
            for(let name in data) {
                arr.push(`${name}=${data[name]}`)
            }

            return arr.join('&');
            */

            return stringify(data)
        }
    ]
})

async () => {
    // 生命周期函数
    try {
        let res = await customerAxios({
            url: '/data/index.php',
            method: 'post',           
            data: {
                a: 1,
                b: 99
            }
        });
        let {data} = res;
    } catch (Error e) {
        alert('服务器离家出走了');
    }
}
```

#### 原生fetch
- get请求
```javascript
let res = await fetch('data/user.json');
let data = res.json();
```
- post请求
```javascript
const formData = new FormData();
formData.append("a", "82");
formData.append("b", "9");

let res = await fetch('/user/', {
    method: 'post',
    body: formData
});
let data = res.json();
```

## vue组件

### 局部组件
- 参考目录4

### 全局组件
- 

### slot
- 默认用法
- 具名插槽
