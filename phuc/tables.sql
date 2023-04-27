
--  `user`
-- store information about a user on the page

CREATE TABLE `user`
(
 `id`           int NOT NULL AUTO_INCREMENT ,
 `username`     varchar(255) NOT NULL ,
 `avatar_url`   varchar(2000) NULL ,
 `display_name` varchar(255) NOT NULL ,
 `full_name`    varchar(255) NOT NULL ,
 `password`     varchar(255) NOT NULL ,
 `email`        varchar(255) NOT NULL ,
 `permission`   int NOT NULL ,

PRIMARY KEY (`id`)
);

-- `Post`
-- store general information about a post

CREATE TABLE `post`
(
 `id`               int NOT NULL AUTO_INCREMENT ,
 `post_title`       text NOT NULL ,
 `author_id`      int NOT NULL ,
 `create_date`      text NOT NULL ,
 `raw_post_content` longtext NOT NULL ,
 `modified_date`    datetime NULL ,

PRIMARY KEY (`id`)
);


--  `comments`
-- store information about a comment made by a user

CREATE TABLE `comment`
(
 `id`                int NOT NULL AUTO_INCREMENT ,
 `author_id`         int NOT NULL ,
 `post_id`           int NOT NULL ,
 `parent_comment_id` int NULL ,
 `date`              datetime NOT NULL ,
 `modified_date`     datetime NULL ,
 `content`           text NOT NULL ,
 `status`            int NOT NULL COMMENT '-1: hidden, 0: default, 1: approved' ,

PRIMARY KEY (`id`)
);


--  `blog_option`
-- general information about the blog itself: about, 

CREATE TABLE `blog_option`
(
 `id`           int NOT NULL AUTO_INCREMENT ,
 `option_name`  varchar(255) NOT NULL ,
 `option_value` text NOT NULL ,

PRIMARY KEY (`id`)
);

--  `category`
-- List of all category

CREATE TABLE `category`
(
 `id`   int NOT NULL AUTO_INCREMENT ,
 `name` varchar(255) NOT NULL ,


PRIMARY KEY (`id`)
);

-- category relationship
-- store information about which post is in which category 
CREATE TABLE `category_relationship`
(
 `post_id`     int NOT NULL ,
 `category_id` int NOT NULL ,

PRIMARY KEY (`post_id`, `category_id`)
);



-- * `comment_like
-- This table store who like the comment, the user who like the comment can be a logged in or guest
-- Guest: store ip address, user: store user_id

CREATE TABLE `comment_like`
(
 `id`         int NOT NULL AUTO_INCREMENT ,
 `comment_id` int NOT NULL ,
 `user_id`    int NULL ,
 `ip_address` varchar(45) NULL ,

PRIMARY KEY (`id`)
);


-- This store information about each paragraph
-- Paragraph is a component making a post/blog, can be a picture, a header, a body, a form,...
CREATE TABLE `paragraph`
(
 `post_id`         int NOT NULL ,
 `paragraph_index` int NOT NULL ,
 `type`            int NOT NULL ,
 `content`         text NOT NULL ,

PRIMARY KEY (`post_id`, `paragraph_index`)
);


--  `post_like`
-- store information about who like a post, same with comment_like

CREATE TABLE `post_like`
(
 `id`         int NOT NULL AUTO_INCREMENT ,
 `post_id`    int NOT NULL ,
 `user_id`    int NULL ,
 `ip_address` varchar(45) NULL ,

PRIMARY KEY (`id`)
);



-- Add foreign key now cause i forgot
alter table comment 
ADD FOREIGN KEY (post_id) references post(id);

alter table comment 
ADD FOREIGN KEY (author_id) references user(id);

-- post must come from an exist user
alter table post 
ADD FOREIGN KEY (author_id) references user(id);

alter table comment_like 
ADD FOREIGN KEY (comment_id) references comment(id);

alter table comment_like 
ADD FOREIGN KEY (user_id) references user(id);

alter table post_like 
ADD FOREIGN KEY (post_id) references post(id);

alter table post_like 
ADD FOREIGN KEY (user_id) references user(id);

alter table category_relationship 
ADD FOREIGN KEY (post_id) references post(id);

alter table category_relationship 
ADD FOREIGN KEY (category_id) references category(id);



---------------------------------------------------------------
-- these table are for react program
CREATE TABLE `react_member`
(
 `id`            int NOT NULL ,
 `name`          varchar(255) NOT NULL ,
 `contact_name`  varchar(255) NULL ,
 `phone`         varchar(255) NOT NULL ,
 `email`         varchar(255) NOT NULL ,
 `contact_type`  int NOT NULL ,
 `member_type`   int NOT NULL ,
 `location_type` int NOT NULL ,
 `accepted`      int NULL ,

PRIMARY KEY (`id`)
);

-- ************************************** `user`
-- Note: add primary key to username
CREATE TABLE `react_user`
(
 `id`           int NOT NULL ,
 `username`     varchar(255) NOT NULL ,
 `avatar_url`   varchar(200) NULL ,
 `display_name` varchar(255) NULL ,
 `full_name`    varchar(255) NULL ,
 `password`     varchar(255) NOT NULL ,
 `email`        varchar(255) NULL ,
 `phone_number` varchar(255) NULL ,
 `user_type`    int NOT NULL ,

PRIMARY KEY (`id`)
);


-- ** react need
CREATE TABLE `react_need`
(
 `id`          int NOT NULL ,
 `name`        varchar(255) NOT NULL ,
 `time`        datetime NOT NULL ,
 `state`       int NOT NULL ,
 `email`       varchar(255) NULL ,
 `phone`       varchar(255) NULL ,
 `description` text NOT NULL ,

PRIMARY KEY (`id`)
);