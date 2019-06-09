package com.xstudio.config.security;

import com.xstudio.rest.vo.AntdLoginResponse;
import com.xstudio.tool.request.RequestUtil;
import org.apache.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

public class AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {

        // 输出登录提示信息
        response.setStatus(HttpStatus.SC_OK);

        AntdLoginResponse loginResponse = new AntdLoginResponse();
        loginResponse.setStatus("ok");
        loginResponse.setCurrentAuthority("user");
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (GrantedAuthority authority : authorities) {
            if ("admin".equals(authority.getAuthority())) {
                loginResponse.setCurrentAuthority("admin");
            }
        }

        // 返回json 
        RequestUtil.writeJson(response, loginResponse);
    }
}
