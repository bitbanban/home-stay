package com.bitcamp.korea_tour;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
@MapperScan(value="com.bitcamp.korea_tour.model.mapper",sqlSessionFactoryRef = "mysqlSqlSessionFactory")
public class DatabaseConfig {

	@Bean(name = "mysqlDataSource", destroyMethod = "close")
	@Primary
	@ConfigurationProperties(prefix = "spring.datasource")
	public DataSource mysqlDataSource()  { 
		return DataSourceBuilder.create().type(HikariDataSource.class).build();
	} 

	@Bean(name = "mysqlSqlSessionFactory") 
	@Primary
	public SqlSessionFactory mysqlSqlSessionFactory(
			@Qualifier("mysqlDataSource") DataSource mysqlDataSource, 
			ApplicationContext applicationContext) throws Exception { 
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(mysqlDataSource);
		sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:mapper/*.xml")); 
		sqlSessionFactoryBean.setTypeAliasesPackage("com.bitcamp.korea_tour.model");
		
		return sqlSessionFactoryBean.getObject();
	} 

	@Bean(name = "mysqlSqlSessionTemplate") 
	@Primary
	public SqlSessionTemplate mysqlSqlSessionTemplate(SqlSessionFactory mysqlSqlSessionFactory) throws Exception { 
		return new SqlSessionTemplate(mysqlSqlSessionFactory);
	} 
}