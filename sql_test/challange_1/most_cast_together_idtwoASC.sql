-- Replace with your SQL Query
select
id_two,
first_actor,
second_actor
from
(
  select 
  concat(first_id,second_id) as id_two,
  first_actor,
  second_actor,
  count(*) as qtde
  from
  (
    select 
    f.actor_id as first_id,
    f.first_actor, 

    s.actor_id as second_id, 
    s.second_actor,

    f.title
    from
    (
          select distinct
          a.actor_id, 
          a.film_id,
          concat(first_name, ' ', last_name) as  first_actor,
          title
          from        film_actor a 
          inner join  actor      b
          on 
          (
            a.actor_id = b.actor_id 
          )
          inner join  film      c
          on 
          (
            a.film_id =  c.film_id
          )
    ) as f
    inner join 
    (
          select
          a.actor_id, 
          a.film_id,
          concat(first_name, ' ', last_name) as  second_actor,
          title
          from        film_actor a 
          inner join  actor      b
          on 
          (
            a.actor_id = b.actor_id 
          )
          inner join  film      c
          on 
          (
            a.film_id =  c.film_id
          )
     ) as s
    on 
    (
          f.film_id   =  s.film_id
      and f.actor_id <> s.actor_id 
    )
    order by f.actor_id, f.title, s.actor_id desc
  ) as t1
  group by 
  concat(first_id,second_id), 
  first_actor, 
  second_actor
  order by  4 desc 
  limit 2
) as t2
order by id_two 
limit 1