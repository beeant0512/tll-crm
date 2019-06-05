package com.xstudio.rest;

import com.xstudio.crm.model.User;
import com.xstudio.crm.service.IUserService;
import com.xstudio.spring.mybatis.rest.AbstractMybatisPaginatorRestController;
import com.xstudio.tool.service.IAbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/member")
public class UserRestController extends AbstractMybatisPaginatorRestController<User, Long> {
    @Autowired
    private IUserService userService;

    @Override
    public IAbstractService getService() {
        return userService;
    }
}
