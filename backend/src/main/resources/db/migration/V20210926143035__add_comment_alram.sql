create table comment_alarm
(
    id      bigint not null auto_increment,
    comment_alarm_type varchar(31) not null,
    created_date  TIMESTAMP,
    modified_date TIMESTAMP,
    sender_id       bigint,
    comment_id    bigint,
    primary key (id)
);

alter table comment_alarm
    add constraint comment_alarm_fk_comment
        foreign key (comment_id)
            references comment (id)
            on delete cascade;

alter table comment_alarm
    add constraint comment_alarm_fk_user
        foreign key (sender_id)
            references user (id)
            on delete cascade;