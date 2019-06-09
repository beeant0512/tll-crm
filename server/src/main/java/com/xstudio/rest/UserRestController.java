package com.xstudio.rest;

import com.xstudio.crm.model.User;
import com.xstudio.crm.service.IUserService;
import com.xstudio.spring.mybatis.rest.AbstractMybatisPaginatorRestController;
import com.xstudio.tool.service.IAbstractService;
import com.xstudio.tool.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/member")
public class UserRestController extends AbstractMybatisPaginatorRestController<User, Long> {
    @Autowired
    private IUserService userService;

    private static BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public IAbstractService getService() {
        return userService;
    }

    @PutMapping("lizhi")
    @PreAuthorize("hasRole('admin')")
    public Msg<String> lizhi(@RequestBody User user) {
        Msg<String> msg = new Msg<>();
        User update = new User();
        update.setUserId(user.getUserId());
        update.setLeaving(user.getLeaving());
        Msg<User> userMsg = userService.updateByPrimaryKeySelective(update);
        msg.setErrorResult(userMsg);
        return msg;
    }

    @PutMapping("changePwd")
    @PreAuthorize("hasRole('admin')")
    public Msg<String> changePwd(@RequestBody User user) {
        Msg<String> msg = new Msg<>();
        User update = new User();
        update.setUserId(user.getUserId());
        update.setPwd(bCryptPasswordEncoder.encode(user.getPwd()));
        Msg<User> userMsg = userService.updateByPrimaryKeySelective(update);
        msg.setErrorResult(userMsg);
        return msg;
    }
}
