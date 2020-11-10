
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
    (1, 'Become a Youtuber', 0, 1),
    (2, 'Run a 20 Minute 5k', 0, 1),
    (3, 'Bench 1000 lbs', 0, 2),
    (4, 'Write a novel', 1, 2),
    (5, 'Start a podcast', 0, 1);
SET IDENTITY_INSERT [Dream] OFF

SET IDENTITY_INSERT [How] ON
INSERT INTO [How]
    ([Id], [Description], [TimeToComplete], [IsRepeatable], [Importance], [IsDeleted], [DreamId])
VALUES
    (1, 'Record a Video', 45, 1, 9, 0, 1),
    (2, 'Design Logo', 60, 0, 4, 0, 1),
    (3, 'Comission the intro song', 10, 0, 3, 0, 1),
    (4, 'Pick a training plan', 30, 0, 6, 0, 2),
    (5, 'Buy new shoes', 60, 0, 3, 0, 2),
    (6, 'Meal prep', 90, 1, 8, 0, 2),
    (7, 'Eat a lot', 60, 1, 10, 0, 3),
    (8, 'Learn to read', 90, 0, 1, 0, 4),
    (9, 'Backup old videos', 15, 1, 2, 0, 1),
    (10, 'Explore random Wikis', 30, 1, 7, 0, 5),
    (11, 'Email Kyle upcoming topic research', 15, 0, 8, 0, 5),
    (12, 'Update potential topic sheet', 30, 0, 5, 0, 5),
    (13, 'Check trending topics', 10, 1, 8, 0, 1),
    (14, 'Make video thumbnails', 30, 1, 5, 0, 1),
    (15, 'Stretch', 15, 1, 9, 0, 2),
    (16, 'Find new routes', 30, 1, 5, 0, 2),
    (17, 'Research potential guests', 60, 1, 7, 0, 5),
    (18, 'Write show intro song', 120, 0, 8, 0, 5),
    (19, 'Sign up for race', 10, 0, 3, 0, 2),
    (20, 'Listen to Check the Wire', 60, 1, 2, 0, 1);

SET IDENTITY_INSERT [How] OFF

SET IDENTITY_INSERT [CompletedHow] ON
INSERT INTO [CompletedHow]
    ([Id], [DateCompleted], [HowId])
VALUES
    (1, '2020-08-29', 1),
    (2, '2019-08-30', 1),
    (3, '2019-09-29', 2),
    (4, '2019-08-15', 6),
    (5, '2019-08-29', 4),
    (6, '2019-07-15', 10),
    (7, '2019-08-11', 12),
    (8, '2019-08-16', 10),
    (9, '2019-08-18', 10),
    (10, '2019-08-15', 8),
    (11, '2019-08-18', 10),
    (12, '2019-07-12', 13),
    (13, '2019-08-21', 13),
    (14, '2019-06-12', 13),
    (15, '2019-07-25', 15),
    (16, '2019-10-18', 18),
    (17, '2019-10-25', 15),
    (18, '2019-11-02', 14),
    (19, '2019-07-07', 7),
    (20, '2019-05-21', 9);
SET IDENTITY_INSERT [CompletedHow] OFF

SET IDENTITY_INSERT [Why] ON
INSERT INTO [Why]
    ([Id], [Description], [DreamId])
VALUES
    (1, 'Have a fun and rewarding day job', 1),
    (2, 'Creatively express myself', 1),
    (3, 'Control my own schedule', 1),
    (4, 'Feel better about my body', 2),
    (5, 'Have a training goal', 2),
    (6, 'Flex on people', 2),
    (7, 'Protect my loved ones', 3),
    (8, 'Join MENSA', 4),
    (9, 'Learn more about the world', 5),
    (10, 'Have my hands in multiple creative endeavors', 5),
    (11, 'Have fun with my friends', 1),
    (12, 'Lower my heart rate', 2),
    (13, 'Feel free', 2),
    (14, 'Create networking opportunities', 5),
    (15, 'Establish a brand', 5),
    (16, 'Work with content creators I like', 1),
    (17, 'Influence the world for better', 5);
SET IDENTITY_INSERT [Why] OFF