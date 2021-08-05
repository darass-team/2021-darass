alter table comment drop foreign key comment_fk_sub_comment;

alter table comment
    add constraint comment_fk_sub_comment
        foreign key (parent_id)
            references comment (id)
            on delete cascade;