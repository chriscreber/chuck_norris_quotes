
SELECT setval(pg_get_serial_sequence('"Link"', 'id'), coalesce(max(id)+1, 1), false) FROM "Link";