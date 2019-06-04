package com.xstudio.crm.service;

import com.xstudio.crm.model.Customer;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorService;

public interface ICustomerService extends IMybatisPaginatorService<Customer, Long> {
}
