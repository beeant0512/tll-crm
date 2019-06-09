package com.xstudio.config.security;

import com.xstudio.spring.core.ContextUtil;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collection;

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

    public static String username() {
        String username;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof AppUserDetails) {
            username = ((AppUserDetails) principal).getUsername();
        } else {
            username = "";
        }

        return username;
    }

    public static Boolean isAdmin() {
        Boolean isAdmin = false;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof AppUserDetails) {
            Collection<GrantedAuthority> authorities = ((AppUserDetails) principal).getAuthorities();
            for (GrantedAuthority authority : authorities) {
                if ("admin".equalsIgnoreCase(authority.getAuthority())) {
                    return true;
                }
            }
        }

        return isAdmin;
    }
}
