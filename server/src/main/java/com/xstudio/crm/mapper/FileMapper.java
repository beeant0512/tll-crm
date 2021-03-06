package com.xstudio.crm.mapper;

import com.xstudio.crm.model.File;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper extends IMybatisPaginatorDao<File, Long> {
}