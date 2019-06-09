package com.xstudio.crm.service.impl;

import com.xstudio.crm.mapper.UserMapper;
import com.xstudio.crm.model.User;
import com.xstudio.crm.service.IUserService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.xstudio.config.security.AppUserDetails;
import com.xstudio.config.security.SecurityContextUtil;
import com.xstudio.tool.utils.Msg;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

/**
 * service implements for table user
 *
 * @author mybatis generator
 * @version Sun Jun 09 11:26:38 CST 2019
 */
@Service
public class UserServiceImpl extends MybatisPaginatorServiceImpl<User, Long> implements IUserService {

    @Autowired
    private UserMapper userMapper;

    private static BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public IMybatisPaginatorDao<User, Long> getRepositoryDao() {
        return this.userMapper;
    }

    @Override
    public Msg<User> insertSelective(User record) {
        String encode = bCryptPasswordEncoder.encode(record.getPwd());
        record.setPwd(encode);
        return super.insertSelective(record);
    }

    @Override
    public void setDefaults(User record) {
        if (record.getUserId() == null) {
            record.setUserId(IdWorker.getId());
        }
    }

    @Override
    public String getActorId(User record) {
        return String.valueOf(SecurityContextUtil.userId());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User example = new User();
        example.setUserName(username);
        Msg<User> userMsg = selectOneByExample(example);
        if (!userMsg.getSuccess()) {
            throw new UsernameNotFoundException(username);
        }
        User user = userMsg.getData();
        if (user.getLeaving() != null) {
            throw new UsernameNotFoundException(username);
        }
        SimpleGrantedAuthority userAuthority = new SimpleGrantedAuthority("user");
        SimpleGrantedAuthority adminAuthority = new SimpleGrantedAuthority("admin");
        List<SimpleGrantedAuthority> authorities = new ArrayList();
        authorities.add(userAuthority);
        if (0 != user.getIsAdmin()) {
            authorities.add(adminAuthority);
        }
        AppUserDetails userDetails = new AppUserDetails(user.getUserName(), user.getPwd(), authorities, user.getUserId());
        return userDetails;
    }
}
