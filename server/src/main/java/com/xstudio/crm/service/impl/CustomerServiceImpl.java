package com.xstudio.crm.service.impl;

import com.xstudio.crm.mapper.CustomerMapper;
import com.xstudio.crm.model.Customer;
import com.xstudio.crm.service.ICustomerService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * service implements for table customer
 *
 * @author mybatis generator
 * @version Fri May 31 06:49:12 CST 2019
 */
@Service
public class CustomerServiceImpl extends MybatisPaginatorServiceImpl<Customer, Long> implements ICustomerService {
    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public IMybatisPaginatorDao<Customer, Long> getRepositoryDao() {
        return this.customerMapper;
    }

    @Override
    public void setDefaults(Customer record) {
        if (record.getCustomerId() == null) {
            record.setCustomerId(IdWorker.getId());
        }
    }

    @Override
    public String getActorId(Customer record) {
        // todo
        return "";
    }
}