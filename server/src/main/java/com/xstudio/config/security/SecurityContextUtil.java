package com.xstudio.config.security;

import com.xstudio.spring.core.ContextUtil;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityContextUtil extends ContextUtil {

    public static Long userId() {
        Long userId;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof AppUserDetails) {
            userId = ((AppUserDetails) principal).getUserId();
        } else {
            userId = 0L;
        }

        return userId;
    }
}
