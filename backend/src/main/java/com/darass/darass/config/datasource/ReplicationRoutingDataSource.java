package com.darass.darass.config.datasource;

import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

public class ReplicationRoutingDataSource extends AbstractRoutingDataSource {
    private CircularList<String> slaveDataSourceNameList;

    @Override
    public void setTargetDataSources(Map<Object, Object> targetDataSources) {
        super.setTargetDataSources(targetDataSources);

        // slave db 정보를 CircularList로 관리
        slaveDataSourceNameList = new CircularList<>(
            targetDataSources.keySet()
                .stream()
                .map(Object::toString)
                .filter(string -> string.contains("slave"))
                .collect(Collectors.toList())
        );
    }

    /**
     * 현재 요청에서 사용할 DataSource 결정할 key값 반환
     */
    @Override
    protected Object determineCurrentLookupKey() {
        boolean isReadOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        if (isReadOnly) {
            logger.info("Connection Slave");
            return slaveDataSourceNameList.getOne();
        } else {
            logger.info("Connection Master");
            return "master";
        }
    }
}
