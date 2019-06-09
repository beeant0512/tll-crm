package com.xstudio.crm.service;

import com.xstudio.crm.model.Customer;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorService;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.xstudio.tool.utils.Msg;

/**
 * service for table customer
 * 
 * @author mybatis generator
 * @version Sun Jun 09 17:17:00 CST 2019
 */
public interface ICustomerService extends IMybatisPaginatorService<Customer, Long> {

    /**
     * 领取
     *
     * @param customerId
     * @param userId
     * @return
     */
    Msg<String> lingqu(Long customerId, Long userId);

    Msg<PageList<Customer>> thisWeekNeedFollowup(Long userId, PageBounds pageBounds);

    Msg<PageList<Customer>> longTimeNoFollowupByMonth(Long userId, Integer month, PageBounds pageBounds);
}
