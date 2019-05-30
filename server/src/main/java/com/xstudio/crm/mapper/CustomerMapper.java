package com.xstudio.crm.mapper;

import com.xstudio.crm.model.Customer;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerMapper extends IMybatisPaginatorDao<Customer, Long> {
}