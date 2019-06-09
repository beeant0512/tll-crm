package com.xstudio.crm.service.impl;

import com.xstudio.crm.mapper.CustomerMapper;
import com.xstudio.crm.model.Customer;
import com.xstudio.crm.service.ICustomerService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.xstudio.config.security.SecurityContextUtil;
import com.xstudio.crm.model.CustomerContacts;
import com.xstudio.crm.service.ICustomerContactsService;
import com.xstudio.crm.service.ICustomerUserLogService;
import com.xstudio.rest.vo.CustomerVo;
import com.xstudio.tool.enums.EnError;
import com.xstudio.tool.utils.DateUtil;
import com.xstudio.tool.utils.Msg;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * service implements for table customer
 * 
 * @author mybatis generator
 * @version Sun Jun 09 17:17:00 CST 2019
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
        // todo
        if (record.getCustomerId() == null) {
            record.setCustomerId(IdWorker.getId());
        }
    }

    @Autowired
    private ICustomerUserLogService customerUserLogService;

    @Autowired
    private ICustomerContactsService customerContactsService;

    @Override
    public Msg<Customer> insertSelective(Customer record) {
        record.setPrincipalId(Long.valueOf(getActorId(record)));
        record.setOwnedAt(new  Date());
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
        // 领用日志
        customerUserLogService.newLingQu(customerMsg.getData().getCustomerId(), customerMsg.getData().getPrincipalId());
        return customerMsg;
    }

    @Override
    public String getActorId(Customer record) {
        return String.valueOf(SecurityContextUtil.userId());
    }

    @Override
    public Msg<PageList<Customer>> thisWeekNeedFollowup(Long userId, PageBounds pageBounds) {
        Msg<PageList<Customer>> msg = new  Msg();
        Date weekAgo = DateUtil.addDay(new  Date(), -7);
        PageList<Customer> list = customerMapper.thisWeekNeedFollowup(userId, DateUtil.getThisWeekFirstDay(), weekAgo, pageBounds);
        if (list.isEmpty()) {
            msg.setResult(EnError.NO_MATCH);
            return msg;
        }
        msg.setData(list);
        return msg;
    }

    @Override
    public Msg<PageList<Customer>> longTimeNoFollowupByMonth(Long userId, Integer month, PageBounds pageBounds) {
        Msg<PageList<Customer>> msg = new  Msg();
        Date monthsBegin = DateUtil.addMonths(new  Date(), -month);
        Date monthsEnd = DateUtil.addMonths(new  Date(), -(month + 1));
        PageList<Customer> list = customerMapper.longTimeNoFollowupByMonth(userId, monthsBegin, monthsEnd, pageBounds);
        if (list.isEmpty()) {
            msg.setResult(EnError.NO_MATCH);
            return msg;
        }
        msg.setData(list);
        return msg;
    }

    @Override
    public Msg<String> lingqu(Long customerId, Long userId) {
        Msg<String> msg = new  Msg();
        Msg<Customer> customerMsg = selectByPrimaryKey(customerId);
        if (!customerMsg.getSuccess()) {
            msg.setErrorResult(customerMsg);
            return msg;
        }
        Customer dbCustomer = customerMsg.getData();
        if (0 != dbCustomer.getPrincipalId()) {
            msg.setResult(EnError.NO_MATCH);
            msg.setMsg("已经被其他人领走了");
            return msg;
        }
        Customer update = new  Customer();
        update.setCustomerId(dbCustomer.getCustomerId());
        update.setPrincipalId(userId);
        update.setOwnedAt(new  Date());
        updateByPrimaryKeySelective(update);
        // 领用日志
        customerUserLogService.newLingQu(customerMsg.getData().getCustomerId(), userId);
        return msg;
    }
}
