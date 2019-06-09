CREATE DATABASE IF NOT EXISTS `crm` DEFAULT CHARACTER SET utf8;
use crm;
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

 Date: 09/06/2019 18:30:50
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
                           `principal_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '当前负责ID',
                           `owned_at` date NOT NULL DEFAULT '0000-00-00' COMMENT '领用时间',
                           `next_follow_up_day` date NOT NULL DEFAULT '0000-00-00' COMMENT '下次待跟进时间',
                           `ruzhu_day` date NOT NULL DEFAULT '0000-00-00' COMMENT '入驻时间',
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
-- Table structure for customer_ruzhu
-- ----------------------------
DROP TABLE IF EXISTS `customer_ruzhu`;
CREATE TABLE `customer_ruzhu`  (
                                 `ruzhu_id` bigint(20) NOT NULL COMMENT 'ID',
                                 `customer_id` bigint(20) UNSIGNED NOT NULL COMMENT '客户ID',
                                 `yuanqu` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '入驻园区',
                                 `company_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '入驻企业名称',
                                 `main_company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '母公司',
                                 `zhao_shang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '招商人员',
                                 `fa_ren` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '法人姓名',
                                 `fa_ren_idcard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '法人身份证号码',
                                 `fa_ren_mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '法人电话',
                                 `registered_capital` decimal(10, 4) NOT NULL COMMENT '注册资金（万元）',
                                 `investment` decimal(5, 2) NOT NULL COMMENT '投资比例（如比例不为100%，请完善其他投资者信息）',
                                 `dui_jie_ren` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '对接人姓名',
                                 `dui_jie_ren_mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '对接人电话',
                                 `financial_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '代账或财务姓名',
                                 `financial_mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '代账或财务电话',
                                 `suiwu_account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '网上税务局账号',
                                 `suiwu_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '网上税务局密码',
                                 `app_account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '个人所得税APP账号',
                                 `app_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '个人所得税APP密码',
                                 `kaipiao_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '开票品目（主行业）',
                                 `kai_hu_hang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '开户行',
                                 `bank_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '银行账号',
                                 `agreement` tinyint(1) NULL DEFAULT 0 COMMENT '是否已签订入驻协议',
                                 `mai_pan` tinyint(1) UNSIGNED NULL DEFAULT 0 COMMENT '是否需要买盘',
                                 `tick_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '开具专票还是普票',
                                 `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '目前进度',
                                 `attachment` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '附件',
                                 `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
                                 `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '录入人ID',
                                 `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
                                 `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
                                 PRIMARY KEY (`ruzhu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '入驻客户信息表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for customer_user_log
-- ----------------------------
DROP TABLE IF EXISTS `customer_user_log`;
CREATE TABLE `customer_user_log`  (
                                    `log_id` bigint(20) NOT NULL COMMENT '日志ID',
                                    `customer_id` bigint(20) UNSIGNED NOT NULL COMMENT '客户ID',
                                    `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '领用时间',
                                    `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '领用人ID',
                                    `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
                                    `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
                                    PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户联领用记录表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
                       `file_id` bigint(20) UNSIGNED NOT NULL COMMENT '文件ID',
                       `file_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文件名',
                       `file_size` bigint(20) NOT NULL DEFAULT 0 COMMENT '文件大小Byte',
                       `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
                       `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '录入人ID',
                       `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
                       `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
                       PRIMARY KEY (`file_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Compact;

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
                       `account` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '员工号',
                       `user_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '员工名称',
                       `pwd` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
                       `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系邮箱',
                       `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系地址',
                       `hiredate` date NOT NULL DEFAULT '0000-00-00' COMMENT '入职时间',
                       `is_admin` tinyint(2) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否管理员 0 否 1 是',
                       `leaving` date NOT NULL DEFAULT '0000-00-00' COMMENT '离职时间',
                       `create_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '录入时间',
                       `create_by` bigint(20) UNSIGNED NOT NULL COMMENT '录入人ID',
                       `update_at` datetime(0) NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
                       `update_by` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新人ID',
                       PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Compact;

INSERT INTO `user`(`user_id`, `account`, `user_name`, `pwd`, `email`, `address`, `hiredate`, `is_admin`, `leaving`, `create_at`, `create_by`, `update_at`, `update_by`) VALUES (1, '', 'admin', '$2a$10$pZHTRNUYHy6pKBvTnLXIo.9Rtv2bJ1ZD.4PEbZZlMD7Hra5z4qMhe', '', '', '0000-00-00', 1, '0000-00-00', '2019-06-09 10:37:18', 0, '2019-06-09 08:05:18', 1);

SET FOREIGN_KEY_CHECKS = 1;

