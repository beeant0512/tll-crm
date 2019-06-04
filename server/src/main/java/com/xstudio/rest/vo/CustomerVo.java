package com.xstudio.rest.vo;

import com.xstudio.crm.model.Customer;
import com.xstudio.crm.model.CustomerContacts;
import lombok.Data;

import java.util.List;

/**
 * @author xiaobiao
 * @version 2019/6/4
 */
@Data
public class CustomerVo extends Customer {

    /**
     * 联系人
     */
    private List<CustomerContacts> contacts;
}
