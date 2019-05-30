package com.xstudio.config.datasource;

import com.alibaba.druid.pool.DruidDataSource;
import com.xstudio.spring.mybatis.SqlSessionFactoryUtil;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.boot.autoconfigure.ConfigurationCustomizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

/**
 * carbond 数据库配置
 * <p>
 *
 * @author xiaobiao on 2017/4/7.
 */

@Configuration
@MapperScan(annotationClass = Mapper.class, basePackages = {"com.xstudio.crm.mapper"}, sqlSessionFactoryRef = "crmSqlSessionFactory")
public class CrmDataSourceConfiguration {

    /**
     * 将MybatisConfig类中初始化的对象注入进来
     */
    @Autowired
    private ConfigurationCustomizer customizer;

    @Primary
    @Bean(name = "crmDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.druid.crm")
    public DruidDataSource crmDataSource() {
        return new DruidDataSource();
    }

    @Bean("crmSqlSessionFactory")
    public SqlSessionFactory crmSqlSessionFactory(@Qualifier("crmDataSource") DataSource dataSource) throws Exception {
        return SqlSessionFactoryUtil.getSqlSessionFactory(dataSource
                , "classpath:/mybatis/mysql/crm/**/**.xml"
                , "com.xstudio.crm.model"
                , customizer);
    }

    @Bean(name = "crmTransactionManager")
    public DataSourceTransactionManager crmTransactionManager(@Qualifier("crmDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    /**
     * SqlSessionTemplate 是 SqlSession接口的实现类，是spring-mybatis中的，实现了SqlSession线程安全
     */
    @Bean(name = "crmSqlSessionTemplate")
    public SqlSessionTemplate crmSqlSessionTemplate(@Qualifier("crmSqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}