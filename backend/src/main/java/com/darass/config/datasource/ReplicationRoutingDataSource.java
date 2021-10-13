package com.darass.config.datasource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

public class ReplicationRoutingDataSource extends AbstractRoutingDataSource {

    public static final String DATASOURCE_KEY_MASTER = "master";
    public static final String DATASOURCE_KEY_SLAVE = "slave";

    @Override
    protected Object determineCurrentLookupKey() {
        boolean isReadOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        if (isReadOnly) {
            logger.warn("Connection Slave");
            return DATASOURCE_KEY_SLAVE;
        } else {
            logger.warn("Connection Master");
            return DATASOURCE_KEY_MASTER;
        }
    }
}
