
###  晏国坤 React项目    仓库名字是：wagool_react_project
### 1-redux学习
1. redux_mini版
```shell
  1.store是createStore创建的
  2.store创建的时候就指定好了reducer
  3.reducer是一个函数
  4.精简的写法其实也可以不用actionCreator,直接写在对应的UI组件中
  5.注意：千万不要忘记暴露、千万不要忘记在index.js中store.subscribe
  6.一些组件里用到api比如：getState()、dispatch()均是store上的。
  7.reducer两个时候调用：1.初始化。2.修改redux中状态的时候。
```
2.redux_完整非标准版
```shell
1.action_types.js文件，用于定义type的常量。
2.count_action_creator.js，用于创建和count相关的action。
```
3.redux_完整标准版
```shell
  1.文件结构、文件名都标准化了，文件的路径标识了文件的作用，文件的名标识了文件为谁服务。
  2.方法名也标准了，例如：createIncrementAction 直接命名为 increment
```

### 2-组件分类
1.站在路由的角度：
```shell
  1.一般组件：<Demo/>
  2.路由组件：<Route path="/demo" component={Demo}/>
```
2.站在react-redux角度：
  1.UI组件：
```shell
  (1).组件中不能出现任何redux相关的东西，比如：store actionCreator ...
  (2).只负责页面的展示，点击事件等等
```
3.容器组件：
```shell
  (1).容器组件是UI组件的父组件
  (2).容器组件中可以随意使用redux的api
  (3).容器组件会直接跟redux“打交道”，随后传递状态、操作状态的方法给UI组件。
```
### 3-react-redux
```shell
  1.yarn add react-redux
  2.组件有了一个新的分类标准：容器组件、UI组件
  3.index.js里的写法变了,不再写store.subscribe，要用Provider(顶级组件)
  4.关键点就在容器组件的编写上，要注意：
    (1).容器组件不是我们靠函数或类去亲自定义的，靠的是connect方法。
    (2).connect这样使用：connect(mapStateToProps，mapDispatchToProps)(UI组件)
    (3).容器组件和UI组件是父子关系，所以容器给UI传递"东西"时，要用props
    (4).容器组件给UI组件传递：1.redux保存的状态 2.操作状态的方法。
    (5).扩展一个"骚气"的简单写法`{increment, decrement}`
        因为connect函数底层有判断,若第二个参数是对象,会加工成一个函数
```
### 4-redux中的异步action(redux的异步编码)
  1.异步action不是一个必须的选择(可用可不用),不用的话可以直接写在UI组件中
  2.特点：有一种函数式的action，这个函数里面会写异步任务。
  3.要下载redux-thunk,用于支持异步action

### 5-redux的模块化编码_非标准
  1.模块化编码，其实就是redux要管理多个组件的状态。
  2.创建store时，指定的是一个汇总的reducer
  3.汇总要用redux提供的combineReducers去组合所有的reducer
  4.redux保管的总状态是一个对象，对象的key由程序员定，对象的valule由对应的reducer生成。

### 6-redux的模块化编码_标准： 容器组件和UI组件合成一个了

### 7-要下载redux-devtools-extension,且要在store中编码。
  1.yarn add redux-devtools-extension
  2.在redux核心对象引入
    `import {composeWithDevTools} from 'redux-devtools-extension'`
  3.暴露出去
    `export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))`

### 8-纯函数和高阶函数
  1.纯函数
    1)一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)
    2)必须遵守以下一些约束  
      a.不得改写参数数据
      b.不会产生任何副作用，例如网络请求，输入和输出设备
      c.不能调用Date.now()或者Math.random()等不纯的方法  
    3)redux的reducer函数必须是一个纯函数
    
  2.高阶函数
    1)理解:一类特别的函数
	a.情况1: 参数是函数
	b.情况2: 返回是函数
	c.备注：情况1和情况2满足一个即可
    2)常见的高阶函数: 
        a.定时器设置函数
        b.数组的forEach()/map()/filter()/reduce()/find()
        c.函数对象的bind()
        d.Promise() / then()
        e.antd中的Form.create()()
        f.react-router-dom中的withRouter
        g.react-redux中的connect()
    3)作用: 
        a.能实现更加动态, 更加可扩展的功能
