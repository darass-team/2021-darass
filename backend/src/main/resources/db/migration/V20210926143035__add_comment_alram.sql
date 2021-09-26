create table comment_alarm
(
    id      bigint not null auto_increment,
    alarm_message_type varchar(31) not null,
    user_id       bigint,
    comment_id    bigint
);

alter table comment_alarm
    add constraint comment_alarm_fk_comment
        foreign key (comment_id)
            references comment (id)
            on delete cascade;

alter table comment_alarm
    add constraint comment_alarm_fk_user
        foreign key (user_id)
            references user (id)
            on delete cascade;