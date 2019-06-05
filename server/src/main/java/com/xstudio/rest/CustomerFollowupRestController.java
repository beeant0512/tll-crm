package com.xstudio.rest;

import com.xstudio.crm.model.CustomerFollowUp;
import com.xstudio.crm.service.ICustomerFollowUpService;
import com.xstudio.crm.service.ICustomerService;
import com.xstudio.rest.vo.CustomerVo;
import com.xstudio.spring.mybatis.rest.AbstractMybatisPaginatorRestController;
import com.xstudio.tool.service.IAbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/customerFollowUp")
public class CustomerFollowupRestController extends AbstractMybatisPaginatorRestController<CustomerFollowUp, Long> {
    @Autowired
    private ICustomerFollowUpService customerFollowUpService;

    @Override
    public IAbstractService getService() {
        return customerFollowUpService;
    }
}

