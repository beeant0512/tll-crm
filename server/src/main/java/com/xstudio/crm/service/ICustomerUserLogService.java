package com.xstudio.crm.service;

import com.xstudio.crm.model.CustomerUserLog;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorService;

/**
 * service for table customer_user_log
 * 
 * @author mybatis generator
 * @version Sun Jun 09 08:01:21 CST 2019
 */
public interface ICustomerUserLogService extends IMybatisPaginatorService<CustomerUserLog, Long> {

    /**
     * 领取日志
     * @param customerId
     * @param principalId
     */
    void newLingQu(Long customerId, Long principalId);
}
