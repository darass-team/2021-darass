package com.darass.config.datasource;

import com.zaxxer.hikari.HikariDataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.AbstractJpaVendorAdapter;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@Profile("prod")
public class CustomDataSourceConfig {

    private final List<HikariDataSource> hikariDataSources;
    private final JpaProperties jpaProperties;

    public CustomDataSourceConfig(List<HikariDataSource> hikariDataSources,
        JpaProperties jpaProperties) {
        this.hikariDataSources = hikariDataSources;
        this.jpaProperties = jpaProperties;
    }

    @Bean
    public DataSource dataSource() {
        return new LazyConnectionDataSourceProxy(routingDataSource());
    }

    @Bean
    public DataSource routingDataSource() {
        DataSource master = createMasterDataSource();
        Map<Object, Object> slaves = createSlaveDataSources();
        slaves.put("master", master);

        ReplicationRoutingDataSource replicationRoutingDataSource = new ReplicationRoutingDataSource();
        replicationRoutingDataSource.setDefaultTargetDataSource(master);
        replicationRoutingDataSource.setTargetDataSources(slaves);
        return replicationRoutingDataSource;
    }

    private Map<Object, Object> createSlaveDataSources() {
        List<HikariDataSource> dataSources = hikariDataSources.stream()
            .filter((datasource) -> Objects.nonNull(datasource.getPoolName()) && datasource.getPoolName().startsWith("slave"))
            .collect(Collectors.toList());
        Map<Object, Object> result = new HashMap<>();

        for (HikariDataSource dataSource : dataSources) {
            result.put(dataSource.getPoolName(), dataSource);
        }
        return result;
    }

    private DataSource createMasterDataSource() {
        return hikariDataSources.stream()
            .filter((datasource) -> datasource.getPoolName().startsWith("master"))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("master DB가 존재하지 않습니다."));
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        EntityManagerFactoryBuilder entityManagerFactoryBuilder = createEntityManagerFactoryBuilder(jpaProperties);
        return entityManagerFactoryBuilder.dataSource(dataSource()).packages("com.darass.darass").build();
    }

    private EntityManagerFactoryBuilder createEntityManagerFactoryBuilder(JpaProperties jpaProperties) {
        AbstractJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        return new EntityManagerFactoryBuilder(vendorAdapter, jpaProperties.getProperties(), null);
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager tm = new JpaTransactionManager();
        tm.setEntityManagerFactory(entityManagerFactory);
        return tm;
    }
}