
USE [inVision]
    GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
    ([Id], [UserName], [Email], [FirebaseUserId])
VALUES
    (1, 'Beatley', 'brandon@wheatley.com', 'jpuhyzaicsokywncxveknzowfpdu'),
    (2, 'Testee', 'test@test.com', 'jpuhfasicsokywncxveknzowfpdu');
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Dream] ON
INSERT INTO [Dream]
    ([Id], [Name], [IsDeactivated], [UserProfileId])
VALUES
    (1, 'Become Youtuber', 0, 1),
    (2, 'Run 20 Minute 5k', 0, 1),
    (3, 'Bench 1000 lbs', 0, 2),
    (4, 'Write a novel', 1, 2);
SET IDENTITY_INSERT [Dream] OFF

SET IDENTITY_INSERT [How] ON
INSERT INTO [How]
    ([Id], [Description], [TimeToComplete], [IsRepeatable], [IsDeleted], [DreamId])
VALUES
    (1, 'Record Video', 45, 1, 0, 1),
    (2, 'Design Logo', 60, 0, 0, 1),
    (3, 'Comission intro song', 30, 0, 0, 1),
    (4, 'Pick training plan', 30, 0, 0, 2),
    (5, 'Buy new shoes', 60, 0, 0, 2),
    (6, 'Meal prep', 90, 1, 0, 2),
    (7, 'Eat a lot', 60, 1, 0, 3),
    (8, 'Learn to read', 90, 0, 0, 4),
    (9, 'Backup old videos', 30, 1, 0, 1);
SET IDENTITY_INSERT [How] OFF

SET IDENTITY_INSERT [CompletedHow] ON
INSERT INTO [CompletedHow]
    ([Id], [DateCompleted], [HowId])
VALUES
    (1, '2020-08-29', 1),
    (2, '2019-08-30', 1),
    (3, '2019-09-29', 2),
    (4, '2019-08-15', 6),
    (5, '2019-08-29', 4);
SET IDENTITY_INSERT [CompletedHow] OFF

SET IDENTITY_INSERT [Why] ON
INSERT INTO [Why]
    ([Id], [Description], [DreamId])
VALUES
    (1, 'Shake off the shackles of employment', 1),
    (2, 'Creatively express myself', 1),
    (3, 'Control my own schedule', 1),
    (4, 'Feel better about my body', 2),
    (5, 'Have a training goal', 2),
    (6, 'Flex on people', 2),
    (7, 'Protect my loved ones', 3),
    (8, 'Join MENSA', 4);
SET IDENTITY_INSERT [Why] OFF