package com.xstudio.crm.service.impl;

import com.xstudio.crm.mapper.UserMapper;
import com.xstudio.crm.model.User;
import com.xstudio.crm.service.IUserService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * service implements for table user
 * 
 * @author mybatis generator
 * @version Fri May 31 06:49:12 CST 2019
 */
@Service
public class UserServiceImpl extends MybatisPaginatorServiceImpl<User, Long> implements IUserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public IMybatisPaginatorDao<User, Long> getRepositoryDao() {
        return this.userMapper;
    }

    @Override
    public void setDefaults(User record) {
        // todo
        if(record.getUserId() == null ) {
            record.setUserId(IdWorker.getId());
        }
    }

    @Override
    public String getActorId(User record) {
        // todo
        return "";
    }
}