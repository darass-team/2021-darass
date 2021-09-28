alter table comment_alarm add receiver_id bigint;

alter table comment_alarm
    add constraint comment_alarm_fk_receiver
        foreign key (receiver_id)
            references user (id)
            on delete cascade;