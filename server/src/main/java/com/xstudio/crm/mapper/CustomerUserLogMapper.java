package com.xstudio.crm.mapper;

import com.xstudio.crm.model.CustomerUserLog;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerUserLogMapper extends IMybatisPaginatorDao<CustomerUserLog, Long> {
}
