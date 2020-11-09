USE [master]
GO

IF db_id('inVision') IS NULL
    CREATE DATABASE [inVision]
GO

USE [inVision]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Dream];
DROP TABLE IF EXISTS [CompletedHow];
DROP TABLE IF EXISTS [Why];
DROP TABLE IF EXISTS [How];

CREATE TABLE [UserProfile]
(
    [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
    [UserName] NVARCHAR(255) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL,
    [FirebaseUserId] NVARCHAR(28) NOT NULL,

    CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Dream]
(
    [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
    [Name] NVARCHAR(255) NOT NULL,
    [IsDeactivated] INTEGER NOT NULL,
    [UserProfileId] INTEGER NOT NULL,

    CONSTRAINT FK_Dream_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(Id)
)
GO

CREATE TABLE [How]
(
    [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
    [Description] NVARCHAR(255) NOT NULL,
    [TimeToComplete] INTEGER NOT NULL,
    [IsRepeatable] INTEGER NOT NULL,
    [Importance] INTEGER NOT NULL,
    [IsDeleted] INTEGER NOT NULL,
    [DreamId] INTEGER NOT NULL,

    CONSTRAINT FK_How_Dream FOREIGN KEY (DreamId) REFERENCES Dream(Id)
)
GO

CREATE TABLE [CompletedHow]
(
    [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
    [DateCompleted] DATETIME NOT NULL,
    [HowId] INTEGER NOT NULL,

    CONSTRAINT FK_CompletedHow_How FOREIGN KEY (HowId) REFERENCES How(Id)
)
GO

CREATE TABLE [Why]
(
    [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
    [Description] NVARCHAR(255) NOT NULL,
    [DreamId] INTEGER NOT NULL,

    CONSTRAINT FK_Why_Dream FOREIGN KEY (DreamId) REFERENCES Dream(Id)
)
GO
