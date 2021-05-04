round((100 * (sum(sale) - lag(sum(sale), 1) over (order by month)) / lag(sum(sale), 1) over 
(order by month)),2) || '%' as percent_growth

