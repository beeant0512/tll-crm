package com.xstudio.crm.service.impl;

import com.xstudio.config.security.SecurityContextUtil;
import com.xstudio.crm.mapper.GroupsMapper;
import com.xstudio.crm.model.Groups;
import com.xstudio.crm.service.IGroupsService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * service implements for table groups
 * 
 * @author mybatis generator
 * @version Fri May 31 16:34:07 CST 2019
 */
@Service
public class GroupsServiceImpl extends MybatisPaginatorServiceImpl<Groups, Long> implements IGroupsService {

    @Autowired
    private GroupsMapper groupsMapper;

    @Override
    public IMybatisPaginatorDao<Groups, Long> getRepositoryDao() {
        return this.groupsMapper;
    }

    @Override
    public void setDefaults(Groups record) {
        if (record.getItemId() == null) {
            record.setItemId(IdWorker.getId());
        }
    }

    @Override
    public String getActorId(Groups record) {
        return String.valueOf(SecurityContextUtil.userId());
    }
}
