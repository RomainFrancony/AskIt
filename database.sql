DROP TABLE IF EXISTS OPTION;

DROP INDEX IF EXISTS OPTION_PK;

DROP INDEX IF EXISTS POLL_PK;

DROP TABLE IF EXISTS  POLL;

/*==============================================================*/
/* Table : POLL                                                 */
/*==============================================================*/
create table POLL (
   ID_POLL              SERIAL               not null,
   MULTI                BOOLEAN              not null default false,
   LIBELLE_POLL         VARCHAR(200)         not null,
   constraint PK_POLL primary key (ID_POLL)
);

/*==============================================================*/
/* Index : ACHETEUR_PK                                          */
/*==============================================================*/
create unique index POLL_PK on POLL (
ID_POLL
);

/*==============================================================*/
/* Table : OPTION                                                */
/*==============================================================*/
create table OPTION (
   ID_OPTION            SERIAL             not null,
   ID_POLL              INT4               not null,
   LIBELLE_OPTION       VARCHAR(50)        not null,
   VOTE                 INT4               not null default 0,
   COLOR                CHAR(7)            not null default '#1B95E0',
   constraint PK_OPTION primary key (ID_OPTION),
   constraint FK_OPTION_POLL foreign key(ID_POLL) references POLL(ID_POLL)
);

/*==============================================================*/
/* Index : ACHETEUR_PK                                          */
/*==============================================================*/
create unique index OPTION_PK on OPTION (
ID_OPTION
);