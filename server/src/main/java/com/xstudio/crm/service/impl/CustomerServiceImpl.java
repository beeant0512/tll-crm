package com.xstudio.crm.service.impl;

import com.xstudio.crm.mapper.CustomerMapper;
import com.xstudio.crm.model.Customer;
import com.xstudio.crm.model.CustomerContacts;
import com.xstudio.crm.service.ICustomerContactsService;
import com.xstudio.crm.service.ICustomerService;
import com.xstudio.rest.vo.CustomerVo;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import com.xstudio.tool.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xstudio.config.security.SecurityContextUtil;

import java.util.Iterator;
import java.util.List;

@Service
public class CustomerServiceImpl extends MybatisPaginatorServiceImpl<Customer, Long> implements ICustomerService {

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private ICustomerContactsService customerContactsService;

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
    public Msg<Customer> insertSelective(Customer record) {
        Msg<Customer> customerMsg = super.insertSelective(record);
        if (customerMsg.getSuccess() && record instanceof CustomerVo) {
            List<CustomerContacts> contacts = ((CustomerVo) record).getContacts();
            Long customerId = customerMsg.getData().getCustomerId();
            Iterator<CustomerContacts> iterator = contacts.iterator();
            while (iterator.hasNext()) {
                CustomerContacts next = iterator.next();
                if (null != next) {
                    next.setCustomerId(customerId);
                } else {
                    iterator.remove();
                }
            }

            customerContactsService.batchInsertSelective(contacts);
        }
        return customerMsg;
    }

    @Override
    public String getActorId(Customer record) {
        return String.valueOf(SecurityContextUtil.userId());
    }
}
