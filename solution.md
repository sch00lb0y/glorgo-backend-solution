1) - ### schema for refferal table                            
     user: foreign key not null                       
     code: String not null              
     used: boolean not null       
   - ### snippet for refferal code 
      ```js
        let generateCode = (length) => {
	    let letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let letterLength = 51
	    let result = ''
	    for (var i = 0; i < length; i++) {
		  result += letter[Math.floor(Math.random() * letterLength + 1)] 
	    }
	    return result
      }
      ```
2)  yeah i have used nosql. i have more knowledge on nosql than sql:sweat_smile:
    There is myth that in nosql we can't form relation but we can form relation like sql in nosql also. 
    for example aggregate framework in mongodb allow usto do make relation between two collection same like join is sql.
    nosql can be used when we have a complex structure of data. sql can be used when we have financial transactional data.
    as we know the requirement of software is always change so chaning the pre defined schema in sql 
    wil be tough task. it is worth considering to use hybid db like orient db(http://orientdb.com/orientdb/)
3)  I didn't had an oppurtunity of using mocks and stubs but that won't be problem if you want to me use. Mock and stub is like faking the dependecies in test case to test cases like whether our callback called or
    argument which we passing is correct 
    
4) 
   ```sql
   SELECT Movie.name, AVG(stars) as stars FROM Rating INNER JOIN Movie ON Rating.id=Movie.id GROUP BY(movie) ORDER BY stars DESC LIMIT 50
   ```
5) 
   ## stack used : node,mongodb
   - if slot not available best possible time slot on that day will be shown              
   check readme for installation (https://github.com/sch00lb0y/glorgo-backend-solution)
  
  ## Thanks
   ### balaji
    
