package com.xstudio.crm.mapper;

import com.xstudio.crm.model.CustomerContacts;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerContactsMapper extends IMybatisPaginatorDao<CustomerContacts, Long> {
}