# 晏国坤 React项目    仓库名字是：wagool_react_project

## day01-做了什么？
### 1.使用React脚手架 `create-react-app` 创建项目
### 2.配置UI组件库->antd
    antd中less-loader版本从6降至5:
      1. 移出`yarn remove less-loader`
      2. 下载指定版本`yarn add less-loader@5`
      
## day02-做了什么？
    1.搭建一级路由(login路由、admin路由)
### 2.Login组件
    1.静态组件编写
    2.引入antd的Form组件,包含Item项
    3.声明式校验用户名(参照antd文档写)
    4.自定义校验密码(批量返回错误提示信息)
      注意：校验器的返回值是Promise,第一个参数我们不用(_下划线忽略)。
    5.收集表单数据
      表单验证成功后，才会触发onFinish
### 3.配置代理解决跨域
### 4.axios发送异步ajax请求
    1.请求拦截器统一处理参数json编码问题
    2.响应拦截器统一处理：
        1.数据为data。
        2.错误(根据不同的错误类型,返回不同提示错误提示)。
    3.抽离:api/index.js统一管理项目的ajax请求.(高内聚提高效率)

## day03和day04-做了什么?(总结见redux分支)
### redux和react-redux的学习

## day05-做了什么?
```shell
1.登录结果的提示+进度条
2.若登录成功，跳转到：/admin
3.搭建项目的redux环境（参考redux分支学习的最后一个版本）
4.登录成功后，保存用户信息到redux
5.Admin组件读取用户名展示
6.处理刷新页面redux信息丢失的问题
  解决:将登录成功,同时保存在redux和localStorage中
7.给Login组件和Admin组件增加权限的校验
  解决:增加isLogin标识用户是否已经登录同时校验用户名和token是否合法
    1.定义一个初始化状态
    2.初始化状态的数据,可能有两种情况：
        1.空 
        2.如果localStorage里有，就以local中的为准
          1.尝试从localStorage中读取user和token
            注意,将json字符串再转换成对象,如果转换失败赋值为null,暗示是一个对象
          2.如果为空,`_user || {}`赋值为空对象
    备注:localStorage是按照域名区分的
8.Header组件-静态
    查阅antd的UI组件库
9.Header组件-全屏，使用screenfull，js库
    坑：页签的全屏:程序员可以用代码操作
        浏览器的全屏:只能接祖F11(或其他浏览器提供的快捷键)
10.Header组件-退出登录
    1.删除redux和local之前保存的用户数据
    2.跳转逻辑:
        (1)如果没有登录,直接跳转到登录login组件
        (2)如果登录成功,直接跳转到admin组件
```
## day06-做了什么?
```shell
1.Header组件展示用户名
2.装饰器语法(解决:IDE报错、编译报错)-(讲解在App.js中)
    第一步：yarn add @babel/plugin-proposal-decorators 用于解析装饰器语法。
    第二步：在config-overrides.js，追加一个loader,addDecoratorsLegacy。
    第三步：在jsconfig.json中，追加一个配置："experimentalDecorators":true。如果没有`jsconfig.json`可以在设置中配置
3.将项目中的connect用装饰器语法去写。
4.高阶函数 & 高阶组件
5.自定义一个高阶组件，校验组件权限(对比vue中的路由守卫)
6.LeftNav静态
  坑:更新antd版本4.2.0解决菜单图片不显示问题
7.LeftNav--Menu组件的分析
8.自动生成菜单(递归子菜单)
9.搭建Admin的二级路由
10.天气异步请求
    1.jsonp跨域请求
    2.Promise处理异步任务
    3.定义函数或者使用IIFE 避免在生命周期钩子函数前使用async关键字
```
## day07-做了什么?
```shell
1.点击左侧导航,实现跳转(注意文字变为主题颜色的处理,使用Link同时让图标作为菜单文字的一部分,颜色是antd的Menu控制,所以不用Navlink)
2.刷新页面自动选择菜单、自动展开菜单
    1.使用withRouter高阶组件,可以将普通的组件转成路由组件
    2.根据Antd菜单的属性,配合使用数组split/slice/forEach/find方法完成
    3.处理后的路径数组中元素较少,所有可以不用再次掐头去尾的精确匹配,antd底层自动匹配
3.登录后不自动选中首页的问题
    第一个解决办法：登录成功之后，不跳转/admin，直接跳转:/admin/home
    第二个解决办法：用selectedKeys 去代替 defaultSelectedKeys (推荐),因为defaultSelectedKeys默认只能选中一次
4.LeftNav组件、Header组件与redux的交互---实现头部标题的动态展示
  注:设计的路径结构要能够反映出菜单的层级,且最后一个关键字对应的就是当前的组件
5.处理刷新页面头部title丢失的问题---使用路径去计算title
    1.从路径中获取菜单的key
    2.拿着key去menu-config中查找其所对应的菜单名字
    3.直接保存到redux中
    4.点击回调携带参数的处理,`{()=>{this.saveTitle(menuObj.title)}}`
6.处理登录后头部"首页"丢失的问题---加上了判断，若路径是admin，直接改为home
  `if(currentKey === 'admin') currentKey = 'home'`
7.商品分类组件--静态，用到antd的Card组件、Table组件
    注意点:  1.表格最重要的就是列头和数据
            2.配置唯一标识`rowKey="_id"`,必须是key不能更改
            3.使用render用于高级渲染，返回值展示到页面
            `render:() => <Button type="link">修改分类</Button>`
8.商品分类组件--初始化数据展示
  1.非redux版(状态维护在组件自身内部,异步任务也在该组件内部处理)
  2.同步action版(状态维护到redux中共享,但异步任务在该组件内部处理)
  3.异步action版(状态维护到redux中共享,异步任务在对应的action中处理)
9.商品分类组件--新增弹窗
  用到antd的Form/Input组件和声明式校验
```