alter table comment add parent_id bigint;

alter table comment
    add constraint comment_fk_sub_comment
        foreign key (parent_id)
            references comment (id)
            on delete cascade;