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

### 创建 role 表

```sql
CREATE TABLE `role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `roleid` varchar(30) unique NOT NULL COMMENT '角色id',
  `roleName` varchar(30) NOT NULL COMMENT '角色名称',
  `roleDesc` varchar(30) NOT NULL COMMENT '角色描述',
  `roleSort` int(10) NOT NULL COMMENT '角色排序',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`, `roleid`),
  foreign key(roleid) references role(roleid)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;
```

### 创建 user_role 表

```sql
CREATE TABLE `user_role` (
  `id` int(10) unsigned unique NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `userid` varchar(30) NOT NULL COMMENT '用户id',
  `roleid` varchar(30) NOT NULL COMMENT '角色id',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  foreign key(userid) references user_role(userid)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;
```

### 创建 auth 表

```sql
CREATE TABLE `auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `authid` varchar(30) unique NOT NULL COMMENT '权限id',
  `pid` varchar(30) DEFAULT 1 COMMENT '该权限的父id',
  `type` enum('menu','button') DEFAULT 'button' COMMENT '权限类型',
  `authName` varchar(30) NOT NULL COMMENT '权限名称',
  `authDesc` varchar(30) NOT NULL COMMENT '权限描述',
  `authSort` int(10) NOT NULL COMMENT '权限排序',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`, `authid`),
  foreign key(authid) references authority(authid)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;
```

### 创建 role_auth 表

```sql
CREATE TABLE `role_auth` (
  `id` int(10) unsigned unique NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `roleid` varchar(30) NOT NULL COMMENT '角色id',
  `authid` varchar(30) NOT NULL COMMENT '权限id',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  foreign key(roleid) references user_role(roleid)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;
```
