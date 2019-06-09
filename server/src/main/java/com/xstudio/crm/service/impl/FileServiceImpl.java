package com.xstudio.crm.service.impl;

import com.xstudio.config.security.SecurityContextUtil;
import com.xstudio.crm.mapper.FileMapper;
import com.xstudio.crm.model.File;
import com.xstudio.crm.service.IFileService;
import com.xstudio.spring.mybatis.paginator.IMybatisPaginatorDao;
import com.xstudio.spring.mybatis.paginator.MybatisPaginatorServiceImpl;
import com.xstudio.tool.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * service implements for table file
 *
 * @author mybatis generator
 * @version Sun Jun 09 18:29:59 CST 2019
 */
@Service
public class FileServiceImpl extends MybatisPaginatorServiceImpl<File, Long> implements IFileService {
    @Autowired
    private FileMapper fileMapper;

    @Override
    public IMybatisPaginatorDao<File, Long> getRepositoryDao() {
        return this.fileMapper;
    }

    @Override
    public void setDefaults(File record) {
        if (record.getFileId() == null) {
            record.setFileId(IdWorker.getId());
        }
    }

    @Override
    public String getActorId(File record) {
        return String.valueOf(SecurityContextUtil.userId());
    }
}