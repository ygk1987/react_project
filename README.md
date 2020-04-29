
###  晏国坤 React项目    仓库名字是：wagool_react_project
### 1-redux学习
1. redux_mini版
```shell
	1. 明确reducer何时调用: 1+n 初始化调用1次,每次更新时调用
	2. yarn add redux
	3. 移除组件自身的：状态、操作状态的方法
	4. 建立redux文件夹，建立store.js，引入redux，创建一个store核心对象
	5. 创建一个reducer（关键）
	6. store.js中引入reducer
	7. 组件中引入store，调用API完成对状态的读、写
```
2.redux_完整版:
```shell
	1.在redux文件夹中，创建一个count_action_creator.js
		内容：写两个可以返回action对象的函数，随后暴露
	2.在组件里引入上述的两个函数，用于创建action
	3.通过文件路径决定文件的作用，通过文件名决定文件为谁服务
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
2.容器组件：
```shell
  (1).容器组件是UI组件的父组件
  (2).容器组件中可以随意使用redux的api
  (3).容器组件会直接跟redux“打交道”，随后传递状态、操作状态的方法给UI组件。
```
### 3-react-redux
```shell
  1.yarn add react-redux
  2.建立containers文件夹，里面建立Count.jsx（容器组件）
  3.容器组件里引入connect，connect的具体用法和返回值，参考代码。
  4.App中渲染的不再是UI的Count了，而是容器的Count
  5.index.js中，要引入Provider，给Provider传递store
  6.UI组件中用this.props.xxxx 得到状态、操作状态方法
```