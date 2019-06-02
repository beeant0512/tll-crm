package com.xstudio.rest;

import com.xstudio.crm.model.Customer;
import com.xstudio.crm.service.ICustomerService;
import com.xstudio.spring.mybatis.rest.AbstractMybatisPaginatorRestController;
import com.xstudio.tool.service.IAbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("customer")
public class CustomerRestController extends AbstractMybatisPaginatorRestController<Customer, Long> {
    @Autowired
    private ICustomerService customerService;

    @Override
    public IAbstractService getService() {
        return customerService;
    }
}

