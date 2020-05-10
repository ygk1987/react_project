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
1.点击左侧导航,实现跳转(注意文字变为主题颜色的处理,使用Link同时让图标作为菜单文字的一部分,颜色是antd的Menu组件控制,所以不用Navlink)
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
## day08-做了什么?
```shell
1.完成新增分类
    (1)如何在不触发表单的提交且获得表单的数据(借助表单实例的API),
      getFieldsValue	获取一组字段名对应的值，会按照对应结构返回
    (2)如何重置来一个antd里的表单
      setFieldsValue	设置表单的值,第一次靠initialValues
    (3)如果脱离了表单的提交回调去获取数据，获取数据之后要再次校验
2.完成修改分类
    (1)如何在点击修改分类按钮时，获取当前分类的信息(_id,name)?
      dataIndex和render的配合,dataIndex会作为render回调函数参数,但render回调不传参默认获取所有参数
    (2)表单的数据回显(繁琐)
      (2.1)不要直接给Form表单中的Input组件直接设置默认值。
      (2.2)借助Form组件的initialValues去设置Form中输入项的默认值。只有初始化以及重置时生效(注意是表单组件的属性)
      (2.3)initialValues两个时候生效：(1).表单初始化，即：第一弹窗 (2).表单重置的时候。
      (2.4)最终借助表单实例的setFieldsValue实现设置表单默认值。
    (3)并不一定所有的东西都要维护进状态，有时可以挂到this上(组件的实例身上)。
    (4)复用展示弹窗和确认回调(定义一个标识isUpdate来区分)
3.完成商品管理
    (1)rowKey="_id" //指定唯一值对应项
    (2)Select组件的onChange事件的回调参数就是值`{value => this.setState({searchType:value})}`,但Input组件的onChange事件的回调参数还是event`{event => this.setState({keyWord:event.target.value})}`
    (3)Tabel组件中分页器的属性
        current,当前是第几页
        onChange,页码改变的回调函数只能有一个
    (4)所以必须要求复用回调函数完成请求商品和搜索商品的业务逻辑
        isSearch,标识当前动作为搜索,用于区分请求商品和搜索商品的动作
    (5)搜索请求商品参数二选一的设计
        给二选一参数设置一个公有的变量,将这公有的变量作为搜索属性,keyWord的作为公有变量属性值即可`[searchType]:keyWord`,对比对象的多层解构理解
```
## day09-做了什么?
```shell
1.商品上架、下架处理
    1.根据商品的id和当前的状态发送更新商品是否上架、下架请求
    2.成功响应后重新请求商品列表的数据
2.loading的效果
    自身状态中维护一个isLoading:false 是否处于加载中的标识
3.搭建product的子路和路由携带参数
    1.params参数：/admin/product/detail/43w5e6r789
    2.location.search参数/admin/product/detail?43w5e6r789
    3.Link和NavLink中 to的取值：1.字符串(用的多)  2.配置对象
    注意：字符串的to，会经过react-router-dom的加工，变成一个配置对象
4.实现新增、修改、详情组件的路由跳转(处理刷新页面选中和标题丢失的问题)
    1.在左侧导航组件中判断路径是否包含`product`标题名称
      `if(pathname.indexOf('product')) currentKey = 'product'`
    2.在左侧导航组件中判断路径是否包含`['product']`要选中的菜单
      `if(openedKey.indexOf('product') !== -1) checkedKey = ['product']`
5.商品详情静态组件及动态交互
    1.注意在react中innerHtml的替代方案是：dangerouslySetInnerHTML={{__html:detail}}
    2.根据路由组件携带match.params中获取传递过来的id
    3.发送请求查询id所对应商品
    4.尝试从redux中获取categoryList，若有则用，若无则请求
6.添加商品静态组件
    1.Form组件的initialValues去设置Form中输入项的默认值。只有初始化以及重置时生效(注意是表单组件的属性)
    2.Button组件提交的属性是`htmlType="submit"`
    3.Item组件的label属性是控制Input输入框前的文字
7.文件上传的两种模式
    第一种模型:
      1.客户端请求,表单的基本数据 + 图片
      2.服务器：
          1.储存基本数据到数据库
          2.给图片重命名
          3.储存图片
          4.将基本数据和图片做关联
      3.服务器响应：操作结果
    第二种模型:
      1.客户端选择完图片，立即触发上传
      2.服务器：
          1.给图片重命名，随后保存图片
          2.服务返回：
            (1).图片重命名后的名字
            (2).一个查看该图片的地址
      3.客户端请求,表单基本数据 +图片在服务器中的名字 
      4.服务器响应：操作结果
8.上传文件
  1.坑:Antd中Upload组件,监视图片状态发生改变的回调函数的两参数:file和fileList
    file表示当前上传的文件,只能读
    fileList表示所有上传的图片数组列表,既能读取也能写
  2.Upload组件的重要属性：
    action="/api/manage/img/upload" //上传服务的地址
    name="image" //文件参数名
    fileList={fileList}  //上传文件列表
    onChange={this.handleChange} //图片状态改变的回调
  3.注意图片真正上传完成的两个状态
    file.status === 'done',表示Antd组件上传加载完成
    response中status === 0,才表示图片上传服务完成
```