select 
  so.id,
  so.order_time,
  so.week
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

