-- All possbile Hows for a Dream --
select * from how h
where dreamId = 1

--Completed Hows for a Dream--
SELECT ch.Id AS CompletedId, ch.DateCompleted, h.Id AS HowId, h.Description, h.TimeToComplete, h.IsRepeatable, h.DreamId 
FROM CompletedHow ch 
JOIN How h ON ch.HowId = h.Id 
WHERE h.DreamId = 1

--Hows that can be done (filters out completed hows but keeps any repeatables)--
SELECT DISTINCT h.Id, h.Description, h.TimeToComplete, h.IsRepeatable, h.DreamId,
				d.Name, d.UserProfileId
FROM How h
JOIN Dream d ON h.DreamId = d.Id
LEFT JOIN CompletedHow ch ON h.Id = ch.HowId 
WHERE (ch.Id IS NULL OR h.IsRepeatable = 1) 
AND (h.DreamId = 1 AND d.UserProfileId = 1)


SELECT TOP 1 h.Id, h.Description, h.TimeToComplete, h.IsRepeatable, h.DreamId,
				d.Name, d.UserProfileId
FROM How h
JOIN Dream d ON h.DreamId = d.Id
LEFT JOIN CompletedHow ch ON h.Id = ch.HowId 
WHERE (ch.Id IS NULL OR h.IsRepeatable = 1) 
AND (h.DreamId = 1 AND d.UserProfileId = 1)
ORDER BY NEWID();

SELECT DISTINCT Id FROM How WHERE dreamId = 1


select * from UserProfile