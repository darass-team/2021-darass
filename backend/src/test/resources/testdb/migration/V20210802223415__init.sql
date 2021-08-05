create table comment
(
    id            bigint not null auto_increment,
    created_date  TIMESTAMP,
    modified_date TIMESTAMP,
    content       varchar(255),
    url           varchar(255),
    project_id    bigint,
    user_id       bigint,
    primary key (id)
);

create table comment_like
(
    id            bigint not null auto_increment,
    created_date  TIMESTAMP,
    modified_date TIMESTAMP,
    comment_id    bigint,
    user_id       bigint,
    primary key (id)
);

create table guest_user
(
    password varchar(255),
    id       bigint not null,
    primary key (id)
);

create table project
(
    id            bigint not null auto_increment,
    created_date  TIMESTAMP,
    modified_date TIMESTAMP,
    description   varchar(255),
    name          varchar(255),
    secret_key    varchar(255),
    user_id       bigint,
    primary key (id)
);

create table social_login_user
(
    email               varchar(255),
    oauth_id            varchar(255),
    oauth_provider_type varchar(255),
    id                  bigint not null,
    primary key (id)
);

create table user
(
    user_type         varchar(31)  not null,
    id                bigint       not null auto_increment,
    created_date      TIMESTAMP,
    modified_date     TIMESTAMP,
    nick_name         varchar(255) not null,
    profile_image_url varchar(255),
    primary key (id)
);

alter table project
    add constraint SECRET_KEY_UNIQUE unique (secret_key);

alter table project
    add constraint project_fk_user
        foreign key (user_id)
            references user (id)
            on delete cascade;

alter table comment
    add constraint comment_fk_project
        foreign key (project_id)
            references project (id)
            on delete cascade;

alter table comment
    add constraint comment_fk_user
        foreign key (user_id)
            references user (id)
            on delete cascade;

alter table comment_like
    add constraint comment_like_fk_comment
        foreign key (comment_id)
            references comment (id)
            on delete cascade;

alter table comment_like
    add constraint comment_like_fk_user
        foreign key (user_id)
            references user (id)
            on delete cascade;

alter table guest_user
    add constraint guest_user_fk_user
        foreign key (id)
            references user (id);

alter table social_login_user
    add constraint social_login_user_fk_user
        foreign key (id)
            references user (id);