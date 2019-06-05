package com.xstudio.rest;

import com.xstudio.crm.model.Groups;
import com.xstudio.crm.service.IGroupsService;
import com.xstudio.spring.mybatis.rest.AbstractMybatisPaginatorRestController;
import com.xstudio.tool.service.IAbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/groups")
public class GroupsRestController extends AbstractMybatisPaginatorRestController<Groups, Long> {
    @Autowired
    private IGroupsService groupsService;

    @Override
    public IAbstractService getService() {
        return groupsService;
    }
}
