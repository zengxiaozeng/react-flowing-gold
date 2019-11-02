# React 项目

## 目录
#### 一、[技术栈](#features)
#### 二、[项目安装](#getting-started)
#### 三、[项目架构](#architecture)
#### 四、[测试](#testing)  
#### 五、[部署](#deployment)
#### 六、[首页入口](#app)
#### 七、[导航菜单](#menu)
#### 八、[Redux-saga状态共享](#sagas)
#### 九、[结尾](#ending)
****

## <a name="features">一、技术栈</a>
> 详情可参阅 `package.json`

* Yarn
* React 16.9.0
* Redux-saga
* React Router
* Axios 请求库
* Webpack 4.0+
* ES6 + Babel
* Antd

`项目说明：`

1.路由懒加载

2.错误路由匹配404页面

3.Api请求封装Axios工具类

4.redux-saga处理异步请求

5.nprogress加载条

6.路由鉴权

7.装饰器模式状态共享、表单包裹

8.在redux中加入路由跳转功能

7.接口是java服务端的Api，暂时就不抽出来了，所以项目是无法正常登陆的，项目会提供UI视觉稿，有对应需求的可以借阅参考。最后说一句，redux-saga真香~~~

***

## <a name="getting-started">二、项目安装</a>
本项目用的是yarn管理依赖包，需要安装yarn

```
yarn install //安装依赖

yarn start //运行
```

***

## <a name="architecture">三、项目架构</a>
### <a name="tree">⊙ 目录结构</a>
```
.
├─ config/            # Webpack 配置目录
├─ public/             # 模板文件
├─ dist/             # build 生成的生产环境下的项目
├─ scripts/             # Webpack环境变量配置
├─ src/              # 源码目录（开发都在这里进行）
│   ├─ assets/         # 放置需要经由 Webpack 处理的静态文件
│   ├─ components/     # 组件
│   │   ├─ Layout/       # 全局布局
│   │   ├─ PrivateRoute/ # 路由守卫
│   ├─ store/            # Redux-sagas
│   │   ├─ actions/      # （Actions）
│   │   ├─ reducers/     # （Reducers）
│   │   ├─ sagas/        # （Sagas）
│   │   ├─ index.js      # （Store文件管理）
│   ├── router/          # 路由（ROUTE）
│   ├── service/         # 服务（SERVICE，统一Api管理）
│   ├── utils/           # 工具库
│   ├── pages/           # 视图页（pages）
│   ├── index.js         # 启动文件
│   ├── App.js           # 主入口页
├── .gitignore       # （配置）需被 Git 忽略的文件（夹）
├── package.json      
```

***

## <a name="testing">四、测试</a>
> 暂未加入测试工具

***

## <a name="deployment">五、部署</a>
> yarn build 

***

## <a name="deployment">六、首页入口</a>
入口文件主要定义路由页面，因为是此项目是单页面应用，所以主入口只要配置三大模块路由即可，根路由地址`/`匹配`<IndexLayout />`,`login`匹配`<Login />`,`404`匹配`<ErrorPage />`

为了让路由懒加载，引入路由的时候可以用异步组件包裹一层Component，为了方便加载时查找到对应的文件名，可以设置`/* webpackChunkName: "name" */ `即可，如下
```js
// 该文件为实现类似github页面加载的那个加载条
import LoadableComponent from '@/utils/LoadableComponent'
const Login = LoadableComponent(()=>import(/* webpackChunkName: "login" */ '@/pages/Login'))
```

这里引用的是`HashRouter`路由模式，BrowserRouter模式需要后台配合，否则打包的时候在当前路由地址刷新时会造成空白的错误。

入口文件`App.js`的全部代码贴一下吧
```js
import React, { Component } from 'react'
import IndexLayout from '@/components/Layout/index'
import { connect } from 'react-redux';
import LoadableComponent from '@/utils/LoadableComponent'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const Login = LoadableComponent(()=>import(/* webpackChunkName: "login" */ '@/pages/Login'))
const ErrorPage = LoadableComponent(()=>import(/* webpackChunkName: "errorPage" */ '@/pages/ErrorPage'))

//装饰器模式链接Redux数据，省略很多复杂代码，真香。注意：不要的对象可以传个null
@connect(
    state => ({
        id_token: state.loginReducer.id_token
    })
)
class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    //此处重定向的地址为登录后的首页面地址
                    <Route exact path="/" render={ () => <Redirect to="/apply" push /> } />
                    
                    //此处404页面只是声明路由地址，暂未匹配路由
                    <Route path="/404" component={ ErrorPage } />
                    
                    //路由鉴权，如果没有id_token则跳转到登录页
                    <Route path="/login" render={() => {
                        return this.props.id_token ?  <Redirect to="/" /> : <Login />
                    }} />
                    
                    //登录后的主模板组件
                    <Route render={ () => <IndexLayout /> } />
                </Switch>
            </Router>
        )
    }
}

export default App

```

***
## <a name="menu">六、导航菜单</a>
该项目为左右布局，没有Header,Footer。界面比较创新...
```
import React, { Component } from 'react'
import ContentMain from '@/components/Layout/ContentMain' //主内容组件
import SliderNav from  '@/components/Layout/SliderNav' //菜单栏组件
import { Layout } from 'antd'

const { Content, Sider } = Layout;

class IndexLayout extends Component {

    render() {
        return (
            <Layout>
                <Sider
                    collapsible
                    trigger={null}
                >
                    <SliderNav/>
                </Sider>
                <Layout>
                    <Content style={{background: '#f7f7f7'}}>
                        <ContentMain/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default IndexLayout
```

菜单栏的代码就不一一张贴了，内容有点长，菜单栏的路由栏目有留子菜单的入口配置，只要对应的路由数组按照格式配置好即可。所有的`导航菜单布局`在`Components`组件库中的`Layout`文件夹目录下。这里提供一下导航栏的主路由配置信息。注意，这里的路由配置跟之前的路由配置不是同一个信息，前者是总路由地址，这里的路由是右边`Content`的所有路由信息。
```js
import React, { Component } from 'react'
import { withRouter, Switch, Redirect, Route } from 'react-router-dom'
import LoadableComponent from '@/utils/LoadableComponent'
//路由鉴权组件，包裹所有`Content`的页面，如果token失效，则跳回`Login页面`
import PrivateRoute from '@/components/PrivateRoute'

const Apply = LoadableComponent(()=>import(/* webpackChunkName: "apply" */ '@/pages/Apply'))
const Case = LoadableComponent(()=>import(/* webpackChunkName: "case" */ '@/pages/Case'))

@withRouter
class ContentMain extends Component {
    render () {
        return (
            <div style={{padding: '20px 32px'}}>
                <Switch>
                    <PrivateRoute exact path='/apply' component={ Apply }/>
                    <PrivateRoute exact path='/case' component={ Case }/>
                    
                    //404页面在这里匹配路由，就能正确匹配错误路由了
                    <Route render={ () => <Redirect to="/404" /> } />
                    <Redirect exact from='/' to='/apply'/>
                </Switch>
            </div>
        )
    }
}

export default ContentMain

```
***
## <a name="sagas">八、Redux-saga状态共享</a>
在决定用`Redux-saga`之前，也有考虑引用`Redux-thunk`来做状态共享，毕竟`Redux-thunk`上手要简单很多。但是`Redux-thunk`同步异步代码都要下在同一个文件里面，如果单页面接口过多的话，会造成面条式的代码，也不利于理解和维护。所以毅然绝对引用`Redux-saga`。中间碰到很多的坑，因为在Github上很少能发现`Redux-saga`比较完整系列能借阅的项目，每次卡住都是各种翻阅资料。以下会罗列出在开发过程中容易遇到的问题，让参阅本项目的朋友们能少踩点坑...

### 1.先直接贴store的配置文件吧
```js
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import sagas from './sagas'
import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware();
const createHistory = require('history').createHashHistory;
const history = createHistory();   // 初始化history
const routerWare = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routerWare));
const store = createStore(
	reducer,
	enhancer
)

sagaMiddleware.run(sagas)

export default store
```
这里引入的`sagas`是按页面引用分类的`saga`文件,避免所有异步请求都写在同一个文件中。因为本项目只有三大模块，登录页、申请页、案件页，所以分三大模块就好了。
```js
// saga模块化引入
import { fork, all } from 'redux-saga/effects'

// 异步逻辑
import { loginSagas } from './login'
import { applySagas } from './apply'
import { caseSagas } from './case'

// 单一进入点，一次启动所有Saga
export default function* rootSaga() {
    yield all([
        fork(loginSagas),
        fork(applySagas),
        fork(caseSagas)
    ])
}
```
`redux-saga`的正确使用在这里我就不做过多阐述了，想要引用的同学可以去看看官方文档的介绍。或者借阅本项目的源代码，依葫芦画瓢，多写几遍自然就多会了。不过，在此的前提是，你首先得去了解一遍`Es6的Generator函数`。

具体的`redux-saga`异步引用在项目中很多地方有应用，等时间充裕了我补一遍`redux-saga`的使用教程。

这里说两个引用`redux-saga`容易遇到的坑

- 异步请求结束后跳转路由
- redux-saga异步请求只执行一次，比如分页接口，你怎么切分页都只加载第一次

#### ① 异步请求结束后跳转路由

`react`和`vue`的路由跳转有点不一致，`vue`是封装了所有的路由信息，只要你引用了`vue-router`，你就可随心所欲的引用路由跳转。但是`react`不一样，在`js文件`中如果引用了`react-router`后可以直接引用`<Link></Link>`或者`this.props.history.push('/login')`的方式跳转路由。但是引用了`redux-saga`状态共享后，当异步请求结束之后再跳转路由信息是再正常不过的需求了，但这里`this.props.history.push('/login')`这种方式是不生效的，想要在状态共享中跳转路由，需要额外配置。

1.首先安装`history`和`react-router-redux`
> yarn add history react-router-redux

2.在`store`里面引用
```

import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware();
const createHistory = require('history').createHashHistory;
const history = createHistory(); //初始化history
const routerWare = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
//这里是包裹两个中间件，saga和状态共享路由的中间件，想要在saga中跳转页面，routerWare这个中间件是必不可少的!!!
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routerWare));
```

3.在`saga`中应用
```javascript
import { push } from 'react-router-redux';
function* login() {
  if (...) {// 登录成功，路由跳转
    yield put(push('/login')) //Generator指令跳转
  }
}
```
#### ②redux-saga异步请求只执行一次
其实造成这种原因最主要还是出于对`Generator指令`不熟悉的缘故
如下代码，每个Generator方法内都要加一个`while(true){}`，配合多个`Generator`方法`yield all([])`监听，这样就能做到每次一个`saga`任务请求结束后，下次再进来`（例如分页）`同一个请求时，每次都会重新监听，然后再继续进入`Generator函数`内，这样就不会一个接口就只请求一次。

这个细微的小Bug真的是让我吃了不小的苦头啊...

```js
function * getSearchRequest() {
    while(true){
        const resData = yield take(types.GET_SEARCH_DATA);
        const response = yield call(seachData, resData.payload)
        yield put(getSearchDataSuccess(response))
    }
}

function * getDetailRequest() {
    while(true){
        const resData = yield take(types.GET_DRAFT_DETAIL_REQUEST);
        const response = yield call(searchDetail, resData.payload)
        yield put(getDetailSuccess(response));
    }
}

export function * caseSagas() {
    yield all([
        fork(getSearchRequest),
        fork(getDetailRequest)
    ]);
}

```
***
## <a name="ending">九、结尾</a>
整个项目其实是已经开发完毕的，唯一的遗憾是API请求无法开发，只能提供参考。
以下我会附一个Github的源码，包括设计稿，拿着UI看源码就不那么费劲了。如果遇到同模块能引用的，it`s my pleasure~~~

***
