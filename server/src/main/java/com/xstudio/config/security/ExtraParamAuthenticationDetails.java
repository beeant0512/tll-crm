package com.xstudio.config.security;

import lombok.Data;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import javax.servlet.http.HttpServletRequest;

/**
 * @author xiaobiao huang
 * @version 2018-02-11
 */
@Data
public class ExtraParamAuthenticationDetails extends WebAuthenticationDetails {
    private static final long serialVersionUID = 6022812716106870676L;

    /**
     * 验证码
     */
    private String captcha = null;

    /**
     * ip
     */
    private String ip;

    public ExtraParamAuthenticationDetails(HttpServletRequest request) {
        super(request);
    }

}
