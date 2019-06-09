package com.xstudio.crm.service.impl;

import com.xstudio.config.security.SecurityContextUtil;
import com.xstudio.crm.mapper.CustomerFollowUpMapper;
import com.xstudio.crm.model.Customer;
import com.xstudio.crm.model.CustomerFollowUp;
import com.xstudio.crm.service.ICustomerFollowUpService;
import com.xstudio.crm.service.ICustomerService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import com.xstudio.tool.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * service implements for table customer_follow_up
 * 
 * @author mybatis generator
 * @version Fri May 31 06:49:12 CST 2019
 */
@Service
public class CustomerFollowUpServiceImpl extends MybatisPaginatorServiceImpl<CustomerFollowUp, Long> implements ICustomerFollowUpService {
    @Autowired
    private CustomerFollowUpMapper customerFollowUpMapper;

    @Autowired
    private ICustomerService customerService;

    @Override
    public IMybatisPaginatorDao<CustomerFollowUp, Long> getRepositoryDao() {
        return this.customerFollowUpMapper;
    }

    @Override
    public void setDefaults(CustomerFollowUp record) {
        if(record.getId() == null ) {
            record.setId(IdWorker.getId());
        }
    }

    @Override
    public String getActorId(CustomerFollowUp record) {
        return String.valueOf(SecurityContextUtil.userId());
    }

    @Override
    public Msg<CustomerFollowUp> insertSelective(CustomerFollowUp record) {
        Msg<CustomerFollowUp> msg = super.insertSelective(record);
        Customer update = new Customer();
        update.setCustomerId(record.getCustomerId());
        update.setNextFollowUpDay(record.getNextTime());
        customerService.updateByPrimaryKeySelective(update);
        return msg;
    }
}