package com.xstudio.crm.service.impl;

import com.xstudio.config.security.SecurityContextUtil;
import com.xstudio.crm.mapper.CustomerRuzhuMapper;
import com.xstudio.crm.model.Customer;
import com.xstudio.crm.model.CustomerRuzhu;
import com.xstudio.crm.service.ICustomerRuzhuService;
import com.xstudio.crm.service.ICustomerService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import com.xstudio.tool.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * service implements for table customer_ruzhu
 *
 * @author mybatis generator
 * @version Sun Jun 09 18:27:32 CST 2019
 */
@Service
public class CustomerRuzhuServiceImpl extends MybatisPaginatorServiceImpl<CustomerRuzhu, Long> implements ICustomerRuzhuService {
    @Autowired
    private CustomerRuzhuMapper customerRuzhuMapper;

    @Autowired
    private ICustomerService customerService;

    @Override
    public IMybatisPaginatorDao<CustomerRuzhu, Long> getRepositoryDao() {
        return this.customerRuzhuMapper;
    }

    @Override
    public void setDefaults(CustomerRuzhu record) {
        if (record.getRuzhuId() == null) {
            record.setRuzhuId(IdWorker.getId());
        }
    }

    @Override
    public Msg<CustomerRuzhu> insertSelective(CustomerRuzhu record) {
        Msg<CustomerRuzhu> msg = super.insertSelective(record);

        if (msg.getSuccess()) {
            Customer update = new Customer();
            update.setCustomerId(record.getCustomerId());
            update.setRuzhuDay(new Date());
            customerService.updateByPrimaryKeySelective(update);
        }
        return msg;
    }

    @Override
    public String getActorId(CustomerRuzhu record) {
        return String.valueOf(SecurityContextUtil.userId());
    }
}