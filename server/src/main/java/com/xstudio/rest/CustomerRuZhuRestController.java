package com.xstudio.rest;

import com.xstudio.crm.model.CustomerRuzhu;
import com.xstudio.crm.service.ICustomerRuzhuService;
import com.xstudio.rest.vo.CustomerVo;
import com.xstudio.spring.mybatis.rest.AbstractMybatisPaginatorRestController;
import com.xstudio.tool.service.IAbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/customerRuzhu")
public class CustomerRuZhuRestController extends AbstractMybatisPaginatorRestController<CustomerRuzhu, Long> {
    @Autowired
    private ICustomerRuzhuService service;

    @Override
    public IAbstractService getService() {
        return service;
    }
}

