package com.xstudio.crm.service;

import com.xstudio.crm.model.User;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorService;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * service for table user
 * 
 * @author mybatis generator
 * @version Sun Jun 02 15:06:23 CST 2019
 */
public interface IUserService extends IMybatisPaginatorService<User, Long>, UserDetailsService {
}
