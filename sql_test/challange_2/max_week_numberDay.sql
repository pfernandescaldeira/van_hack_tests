select 
  so.id,
  so.order_time,
  so.week,
  CASE EXTRACT(DOW FROM so.order_time)
       WHEN 0 THEN 'Sun'
       WHEN 1 THEN 'Mon'
       WHEN 2 THEN 'Tue'
       WHEN 3 THEN 'Wed'
       WHEN 4 THEN 'Thu'
       WHEN 5 THEN 'Fri'
       WHEN 6 THEN 'Sat'
  END as day,
  EXTRACT(DOW FROM so.order_time) as numberDay
from
(
  select 
    so.id,
    so.order_time,
    EXTRACT(WEEK FROM so.order_time) as week
  from sales_order so
) so
inner join
(
    select
      max(EXTRACT(WEEK FROM order_time)) as max_week
    from sales_order
) as mw
on
(
  so.week = mw.max_week
)
order by so.order_time

