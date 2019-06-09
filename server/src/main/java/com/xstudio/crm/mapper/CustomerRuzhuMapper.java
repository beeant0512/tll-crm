package com.xstudio.crm.mapper;

import com.xstudio.crm.model.CustomerRuzhu;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerRuzhuMapper extends IMybatisPaginatorDao<CustomerRuzhu, Long> {
}