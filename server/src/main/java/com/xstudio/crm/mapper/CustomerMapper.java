package com.xstudio.crm.mapper;

import com.xstudio.crm.model.Customer;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import org.apache.ibatis.annotations.Mapper;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import org.apache.ibatis.annotations.Param;
import java.util.Date;

@Mapper
public interface CustomerMapper extends IMybatisPaginatorDao<Customer, Long> {

    PageList<Customer> thisWeekNeedFollowup(@Param("userId") Long userId, @Param("begin") Date begin, @Param("weekAgo") Date weekAgo, @Param("pageBounds") PageBounds pageBounds);

    PageList<Customer> longTimeNoFollowupByMonth(@Param("userId") Long userId, @Param("dayBegin") Date monthsBegin, @Param("dayEnd") Date monthsEnd, @Param("pageBounds") PageBounds pageBounds);
}
