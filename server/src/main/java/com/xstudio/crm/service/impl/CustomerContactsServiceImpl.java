package com.xstudio.crm.service.impl;

import com.xstudio.config.security.SecurityContextUtil;
import com.xstudio.crm.mapper.CustomerContactsMapper;
import com.xstudio.crm.model.CustomerContacts;
import com.xstudio.crm.service.ICustomerContactsService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * service implements for table customer_contacts
 * 
 * @author mybatis generator
 * @version Tue Jun 04 21:53:39 CST 2019
 */
@Service
public class CustomerContactsServiceImpl extends MybatisPaginatorServiceImpl<CustomerContacts, Long> implements ICustomerContactsService {
    @Autowired
    private CustomerContactsMapper customerContactsMapper;

    @Override
    public IMybatisPaginatorDao<CustomerContacts, Long> getRepositoryDao() {
        return this.customerContactsMapper;
    }

    @Override
    public void setDefaults(CustomerContacts record) {
        if(record.getContactsId() == null ) {
            record.setContactsId(IdWorker.getId());
        }
    }

    @Override
    public String getActorId(CustomerContacts record) {
        return String.valueOf(SecurityContextUtil.userId());
    }
}