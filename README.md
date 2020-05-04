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


