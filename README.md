# express-admin-server

## 需求背景

本项目为 react-admin 后台管理 server 。

## 初始化

1. 本项目使用 `express generator` 生成；
2. 使用 `eslint prettier` 规范代码；
   > 编辑器使用 vscode， 并且添加 ESLint 插件

## 数据表创建

### 创建 user 表

```sql
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `userid` varchar(30) unique NOT NULL COMMENT '用户id',
  `username` varchar(30) NOT NULL COMMENT '用户名称',
  `email` varchar(30) unique NOT NULL COMMENT '用户邮箱',
  `password` varchar(30) NOT NULL COMMENT '密码',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`, `email`),
  foreign key(userid) references user(userid)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;
```
