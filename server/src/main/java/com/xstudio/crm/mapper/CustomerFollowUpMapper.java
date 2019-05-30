package com.xstudio.crm.mapper;

import com.xstudio.crm.model.CustomerFollowUp;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerFollowUpMapper extends IMybatisPaginatorDao<CustomerFollowUp, Long> {
}