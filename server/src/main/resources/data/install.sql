/*
 Navicat Premium Data Transfer

 Source Server         : LOCAL
 Source Server Type    : MariaDB
 Source Server Version : 100134
 Source Host           : localhost:3306
 Source Schema         : crm

 Target Server Type    : MariaDB
 Target Server Version : 100134
 File Encoding         : 65001

 Date: 04/06/2019 22:41:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `customer_id` bigint(20) UNSIGNED NOT NULL COMMENT '客户ID',
  `customer_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '客户名称',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系地址',
  `industry` bigint(20) UNSIGNED NOT NULL COMMENT '所属行业',
  `source` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '客户来源',
  `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
  `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '录入人ID',
  `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
  PRIMARY KEY (`customer_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for customer_contacts
-- ----------------------------
DROP TABLE IF EXISTS `customer_contacts`;
CREATE TABLE `customer_contacts`  (
  `contacts_id` bigint(20) NOT NULL COMMENT '联系人ID',
  `customer_id` bigint(20) UNSIGNED NOT NULL COMMENT '客户ID',
  `contact_duties` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系人职务',
  `contact_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系人',
  `contact_mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系人方式',
  `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
  `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '录入人ID',
  `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
  PRIMARY KEY (`contacts_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户联系人表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for customer_follow_up
-- ----------------------------
DROP TABLE IF EXISTS `customer_follow_up`;
CREATE TABLE `customer_follow_up`  (
  `id` bigint(20) UNSIGNED NOT NULL COMMENT 'ID',
  `customer_id` bigint(20) UNSIGNED NOT NULL COMMENT '客户ID',
  `contact_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系人',
  `contact_mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系人方式',
  `follow_up_date` date NOT NULL COMMENT '跟进时间',
  `follow_up_type` bigint(20) NOT NULL COMMENT '跟进方式',
  `follow_up_result` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '跟进结果',
  `next_time` date NOT NULL DEFAULT '0000-00-00' COMMENT '下次跟进时间',
  `level` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '客户等级',
  `setting_time` date NOT NULL DEFAULT '0000-00-00' COMMENT '预计入驻时间',
  `attachment` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '附件ID # 分割',
  `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
  `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '录入人ID',
  `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户跟进历史' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group`  (
  `group_id` bigint(20) UNSIGNED NOT NULL COMMENT '分组ID',
  `pid` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '分组父ID',
  `group_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '分组名称',
  `comment` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '注释',
  `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
  `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '录入人ID',
  `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
  PRIMARY KEY (`group_id`) USING BTREE,
  INDEX `pid`(`pid`) USING BTREE COMMENT '父ID'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '分组字典表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups`  (
  `item_id` bigint(20) NOT NULL COMMENT '主键',
  `item_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分组名称',
  `item_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分组编码',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分组类型',
  `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '创建人ID',
  `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` bigint(20) UNSIGNED NOT NULL COMMENT '员工ID',
  `user_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '员工名称',
  `pwd` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系邮箱',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系地址',
  `hiredate` date NOT NULL DEFAULT '0000-00-00' COMMENT '入职时间',
  `is_admin` tinyint(2) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否管理员 0 否 1 是',
  `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
  `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '录入人ID',
  `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
