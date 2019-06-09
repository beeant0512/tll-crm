package com.xstudio.rest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xiaobiao
 * @version 2019/6/6
 */
@RequestMapping("api/login")
@RestController
public class LoginRestController {
    @PostMapping("account")
    public AntdLoginResponse login(){
        AntdLoginResponse antdLoginResponse = new AntdLoginResponse();
        antdLoginResponse.setCurrentAuthority("admin");
        antdLoginResponse.setStatus("ok");
        return antdLoginResponse;
    }
}