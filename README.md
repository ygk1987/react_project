
# 晏国坤 React项目    仓库名字是：wagool_react_project

## day01-做了什么？
  1. 使用React脚手架 `create-react-app` 创建项目
  2. 配置UI组件库->antd
    antd中less-loader版本从6降至5:
      1. 移出`yarn remove less-loader`
      2. 下载指定版本`yarn add less-loader@5`
      
## day02-做了什么？
    1.搭建一级路由(login路由、admin路由)
    2.Login组件
        1.静态组件编写
        2.引入antd的Form组件
        3.声明式校验用户名
        4.自定义校验密码
          注意：校验器的返回值是Promise，第一个参数我们不用。
        5.收集表单数据
          表单验证成功后，才会触发onFinish
    3.配置代理解决跨域
    4.axios发送异步ajax请求
        1.请求拦截器统一处理参数json编码问题
        2.响应拦截器统一处理：1.数据为data。2.错误。
        3.抽离:api/index.js统一管理项目的ajax请求。
