package com.xstudio.crm.mapper;

import com.xstudio.crm.model.User;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends IMybatisPaginatorDao<User, Long> {
}
