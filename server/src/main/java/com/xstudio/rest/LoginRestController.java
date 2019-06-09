package com.xstudio.rest;

import com.xstudio.config.security.SecurityContextUtil;
import com.xstudio.rest.vo.AntdUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xiaobiao
 * @version 2019/6/6
 */
@RequestMapping("api")
@RestController
public class LoginRestController {
    @GetMapping("currentUser")
    public AntdUser currentUser() {
        AntdUser user = new AntdUser();
        user.setName(SecurityContextUtil.username());
        return user;
    }
}