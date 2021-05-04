select 
  COALESCE (final.day, aux.day)                   as  day,
  COALESCE (final.qty_sold, aux.qty_sold)         as qty_sold,
  COALESCE (final.total_profit, aux.total_profit) as total_profit
from
(
  select 'Sun' as day, 0 as qty_sold, 0.0 as total_profit, 0 as numberDay
  union all
  select 'Mon' as day, 0 as qty_sold, 0.0 as total_profit, 1 as numberDay
  union all
  select 'Tue' as day, 0 as qty_sold, 0.0 as total_profit, 2 as numberDay
  union all
  select 'Wed' as day, 0 as qty_sold, 0.0 as total_profit, 3 as numberDay
  union all
  select 'Thu' as day, 0 as qty_sold, 0.0 as total_profit, 4  as numberDay
  union all
  select 'Fri' as day, 0 as qty_sold, 0.0 as total_profit, 5 as numberDay
  union all
  select 'Sat' as day, 0 as qty_sold, 0.0 as total_profit, 6 as numberDay
) as aux
left join
(
  select 
    day,
    count(*) as qty_sold,
    sum(profit) as total_profit,
    numberDay
  from
  (
    select 
       a.id,
       a.sales_order_id,
       a.menu_item_id,
       b.name,
       (b.price - b.cost) as profit,
       t1.order_time,
       t1.day,
       t1.numberDay

    from        order_item  a
    inner join  menu_item   b
    on
    (
      a.menu_item_id = b.id
    )
    inner join 
    (

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
      ) as so
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
    ) as t1
    on
    (
      a.sales_order_id = t1.id
    )
    
    order by t1.order_time
  ) as t2

  group by day, numberDay
) as final
on 
(
   aux.day = final.day 
)
order by COALESCE (final.numberDay, aux.numberDay) 
