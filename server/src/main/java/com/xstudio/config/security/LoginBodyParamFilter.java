package com.xstudio.config.security;

import com.alibaba.fastjson.JSON;
import com.xstudio.tool.request.RequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 自定义登录参数获取， 默认是 GET方式 请求 \/**\/token\/checkToken 接口
 *
 * @author xiaobiao
 */
public class LoginBodyParamFilter extends AbstractAuthenticationProcessingFilter {
    private static Logger log = LoggerFactory.getLogger(LoginBodyParamFilter.class);

    /**
     * token请求配置
     *
     * @param authenticationManager {@link AntPathRequestMatcher}
     */
    public LoginBodyParamFilter(AuthenticationManager authenticationManager) {
        super(new AntPathRequestMatcher("/login", "POST"));
        this.setAuthenticationSuccessHandler(new AuthenticationSuccessHandler());
        this.setAuthenticationManager(authenticationManager);
    }

    /**
     * token请求配置
     *
     * @param authenticationManager {@link AntPathRequestMatcher}
     * @param pattern               请求的antPath路径 {@link AntPathRequestMatcher}
     * @param httpMethod            请求方法 [ GET | POST ]
     */
    public LoginBodyParamFilter(AuthenticationManager authenticationManager, String pattern, String httpMethod) {
        super(new AntPathRequestMatcher(pattern, httpMethod));
        this.setAuthenticationSuccessHandler(new AuthenticationSuccessHandler());
        this.setAuthenticationManager(authenticationManager);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String userName = null;
        String password = null;
        if (request.getMethod().equals(HttpMethod.POST.name())) {
            String body = null;
            try {
                body = RequestUtil.getBody(request);
            } catch (IOException e) {
                log.error("", e);
            }
            Map<String, String> parse = new HashMap<>(3);
            if (!StringUtils.isEmpty(body)) {
                parse = (Map<String, String>) JSON.parse(body);
                userName = parse.get("userName");
                password = parse.get("password");
            }
        } else {
            userName = request.getParameter("userName");
            password = request.getParameter("password");
        }
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(userName, password);
        ExtraParamAuthenticationDetails details = new ExtraParamAuthenticationDetails(request);
        details.setIp(RequestUtil.getIp(request));
        authRequest.setDetails(details);

        return this.getAuthenticationManager().authenticate(authRequest);
    }
}
