package com.xstudio.crm.service.impl;

import com.xstudio.crm.mapper.CustomerUserLogMapper;
import com.xstudio.crm.model.CustomerUserLog;
import com.xstudio.crm.service.ICustomerUserLogService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * service implements for table customer_user_log
 * 
 * @author mybatis generator
 * @version Sun Jun 09 08:01:21 CST 2019
 */
@Service
public class CustomerUserLogServiceImpl extends MybatisPaginatorServiceImpl<CustomerUserLog, Long> implements ICustomerUserLogService {
    @Autowired
    private CustomerUserLogMapper customerUserLogMapper;

    @Override
    public IMybatisPaginatorDao<CustomerUserLog, Long> getRepositoryDao() {
        return this.customerUserLogMapper;
    }

    @Override
    public void setDefaults(CustomerUserLog record) {
        if(record.getContactsId() == null ) {
            record.setContactsId(IdWorker.getId());
        }
    }

    @Override
    public String getActorId(CustomerUserLog record) {
        return null;
    }
}