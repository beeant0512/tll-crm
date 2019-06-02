/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : crm

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 02/06/2019 22:00:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `customer_id` bigint(20) unsigned NOT NULL COMMENT '客户ID',
  `customer_name` varchar(100) NOT NULL DEFAULT '' COMMENT '客户名称',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '联系地址',
  `industry` bigint(20) unsigned NOT NULL COMMENT '所属行业',
  `contact_duties` varchar(20) NOT NULL DEFAULT '' COMMENT '联系人职务',
  `contact_name` varchar(50) NOT NULL DEFAULT '' COMMENT '联系人',
  `contact_mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '联系人方式',
  `source` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '客户来源',
  `create_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
  `create_by` bigint(20) unsigned NOT NULL COMMENT '录入人ID',
  `update_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '更新人ID',
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户表';

-- ----------------------------
-- Table structure for customer_follow_up
-- ----------------------------
DROP TABLE IF EXISTS `customer_follow_up`;
CREATE TABLE `customer_follow_up` (
  `id` bigint(20) unsigned NOT NULL COMMENT 'ID',
  `customer_id` bigint(20) unsigned NOT NULL COMMENT '客户ID',
  `contact_name` varchar(50) NOT NULL DEFAULT '' COMMENT '联系人',
  `contact_mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '联系人方式',
  `follow_up_date` date NOT NULL COMMENT '跟进时间',
  `follow_up_type` bigint(20) NOT NULL COMMENT '跟进方式',
  `follow_up_result` varchar(1000) NOT NULL DEFAULT '' COMMENT '跟进结果',
  `next_time` date NOT NULL DEFAULT '0000-00-00' COMMENT '下次跟进时间',
  `level` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '客户等级',
  `setting_time` date NOT NULL DEFAULT '0000-00-00' COMMENT '预计入驻时间',
  `attachment` varchar(200) NOT NULL DEFAULT '' COMMENT '附件ID # 分割',
  `create_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
  `create_by` bigint(20) unsigned NOT NULL COMMENT '录入人ID',
  `update_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '更新人ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户跟进历史';

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `item_id` bigint(20) NOT NULL COMMENT '主键',
  `item_name` varchar(100) NOT NULL COMMENT '分组名称',
  `item_code` varchar(50) NOT NULL COMMENT '分组编码',
  `type` varchar(20) NOT NULL COMMENT '分组类型',
  `create_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `create_by` bigint(20) unsigned NOT NULL COMMENT '创建人ID',
  `update_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '更新人ID',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` bigint(20) unsigned NOT NULL COMMENT '员工ID',
  `user_name` varchar(100) NOT NULL DEFAULT '' COMMENT '员工名称',
  `pwd` varchar(100) NOT NULL COMMENT '密码',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT '联系邮箱',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '联系地址',
  `hiredate` date NOT NULL DEFAULT '0000-00-00' COMMENT '入职时间',
  `is_admin` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '是否管理员 0 否 1 是',
  `create_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
  `create_by` bigint(20) unsigned NOT NULL COMMENT '录入人ID',
  `update_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '更新人ID',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `user`(`user_id`, `user_name`, `pwd`, `email`, `address`, `hiredate`, `is_admin`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES (1, 'admin', '$2a$10$De8VvSQmY7M0YkwBXgSFneoN6H6nIQUR5MGthaG.YNnG.2UMEaj.W', '', '', '0000-00-00', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0);
