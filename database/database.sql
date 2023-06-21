CREATE DATABASE labor_docente_bd;
USE labor_docente_bd;
/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
/*actualizar xcon username y contraseña(long)*/
create table USUARIO 
(
   USR_IDENTIFICACION   INT               not null,
   USU_NOMBRE           VARCHAR(50)         not null,
   USU_APELLIDO         VARCHAR(50),
   USU_GENERO           VARCHAR(1)          not null,
   USU_ESTUDIO          VARCHAR(100),
   UserName             VARCHAR(100)          not null,
   USR_Contrasenia      VARCHAR(150)          not null,
   constraint PK_USUARIO primary key (USR_IDENTIFICACION)
);
/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL 
(
   ROL_ID               INT               not null,
   ROL_DESCRIPCION      VARCHAR(50),
   constraint PK_ROL primary key (ROL_ID)
);
/*==============================================================*/
/* Table: USEROL                                                */
/*==============================================================*/
create table USEROL 
(
   USR_IDENTIFICACION   INT               not null,
   ROL_ID               INT               not null,
   UR_FECHAINICIO       DATE,
   UR_FECHAFIN          DATE,
   constraint PK_USEROL primary key (USR_IDENTIFICACION, ROL_ID)
);

/*==============================================================*/
/* Index: USEROL_FK                                             */
/*==============================================================*/
create index USEROL_FK on USEROL (
   USR_IDENTIFICACION ASC
);

/*==============================================================*/
/* Index: USEROL2_FK                                            */
/*==============================================================*/
create index USEROL2_FK on USEROL (
   ROL_ID ASC
);

alter table USEROL
   add constraint FK_USEROL_USEROL_USUARIO foreign key (USR_IDENTIFICACION)
      references USUARIO (USR_IDENTIFICACION);

alter table USEROL
   add constraint FK_USEROL_USEROL2_ROL foreign key (ROL_ID)
      references ROL (ROL_ID);
/**-------------------------------------------------------------PERIODO-------------/
/*==============================================================*/
/* Table: PERIODO                                               */
/*==============================================================*/
create table PERIODO 
(
   PER_ID               INT               not null,
   PER_NOMBRE           VARCHAR(50),
   PER_FECHAINICIO      DATE,
   PER_FECHAFIN         DATE,
   constraint PK_PERIODO primary key (PER_ID)
);
/*==============================================================*/
/* Table: TIPOLABOR                                             */
/*==============================================================*/
create table TIPOLABOR 
(
   TL_ID                INT               not null,
   TL_CODIGO            VARCHAR(3),
   TL_DESCRIPCION       VARCHAR(50),
   constraint PK_TIPOLABOR primary key (TL_ID)
);
/*==============================================================*/
/* Table: LABOR                                                 */
/*==============================================================*/
create table LABOR 
(
   LAB_ID               INT               not null,
   TL_ID                INT               not null,
   LAB_NOMBRE           VARCHAR(50),
   LAB_HORAS            INT,
   constraint PK_LABOR primary key (LAB_ID)
);

/*==============================================================*/
/* Index: ASINGA_FK                                             */
/*==============================================================*/
create index ASINGA_FK on LABOR (
   TL_ID ASC
);

alter table LABOR
   add constraint FK_LABOR_ASINGA_TIPOLABO foreign key (TL_ID)
      references TIPOLABOR (TL_ID);
/*==============================================================*/
/* Table: EVALUACION                                            */
/*==============================================================*/
create table EVALUACION 
(
   EVA_ID               INT               not null,
   LAB_ID               INT               not null,
   PER_ID               INT               not null,
   USR_IDENTIFICACION   INT,
   ROL_ID               INT,
   EVA_ESTADO           SMALLINT,
   EVA_PUNTAJE          DECIMAL(4,2),
   EVA_RESULTADO        VARCHAR(1000),
   constraint PK_EVALUACION primary key (EVA_ID)
);

/*==============================================================*/
/* Index: TIENE_FK                                              */
/*==============================================================*/
create index TIENE_FK on EVALUACION (
   LAB_ID ASC
);

/*==============================================================*/
/* Index: TIENES_PE_FK                                          */
/*==============================================================*/
create index TIENES_PE_FK on EVALUACION (
   PER_ID ASC
);

alter table EVALUACION
   add constraint FK_EVALUACI_REFERENCE_USEROL foreign key (USR_IDENTIFICACION, ROL_ID)
      references USEROL (USR_IDENTIFICACION, ROL_ID);

alter table EVALUACION
   add constraint FK_EVALUACI_TIENE_LABOR foreign key (LAB_ID)
      references LABOR (LAB_ID);

alter table EVALUACION
   add constraint FK_EVALUACI_TIENES_PE_PERIODO foreign key (PER_ID)
      references PERIODO (PER_ID);
ALTER TABLE evaluacion MODIFY COLUMN EVA_ID INT AUTO_INCREMENT;