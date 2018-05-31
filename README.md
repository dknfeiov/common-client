# 前言

Angular 适用于企业中后台项目开发，提供了一整套前端解决方案，但初始项目结构、最佳风格配置比较繁琐，所以基于Angular5 + ng-zorro0.7 搭建了一个基础项目，实现了一个项目所需要的基础功能，便于以后可以快速启动一个项目，功能列表见最下。


## 技术栈

> `angular@5.0` +  
> `ng-zorro-antd@0.7.0`



## 项目运行

#### 注意：由于Angular版本较新，nodejs 版本至少是 9.0 以上

```
git clone git@github.com:dknfeiov/common-client.git

cd common-client （进入当前的项目）

npm install  (安装依赖包)

npm start (运行本地开发环境)

npm run build (打包，编译后文件存放在 /dist 目录下)

```

####前后端交互接口格式
```
{
  code: number; // 状态码
  data: {       // 数据
      list?: Array<any>;
  } | any;
  msg: string;  // 提示信息
}


## 说明

>  开发环境 win7  Chrome 63（64 位） nodejs 9.8.0
>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍



## 功能一览
- [√] 项目按路由模块加载
- [√] 页面权限控制（可控制到按钮级别）
- [√] 登录，退出功能
- [√] 路由守卫
- [√] http请求拦截设置,无Token跳转到登录页
- [√] 左侧菜单，正常菜单切换
- [√] 欢迎主页
- [√] 右上角个人中心
- [√] 基础增删改查功能（标签、文档）
- [√] 文件上传下载
- [√] echarts图表（雷达图）


## TODO
- 更丰富的echarts图表引入
- 线上运行实例
- 列表分页
- 上传下载保持原文件名
- 文档编辑
