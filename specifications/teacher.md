## SPECIFICATION

### List all teachers
* Method: `GET`
* URL: `http://localhost:8080/api/teachers`
* Response:
```
[
  {
    "id":1
    "name":"name_example",
    "subject":"subject_name"
  },
  {
    "id":2
    "name":"name_example",
    "subject":"subject_name"
  },
  ...
]
```

### Retrieve teacher by id
* Method: `GET`
* URL: `http://localhost:8080/api/teachers/1`
* Response:
```
{
  "id":1
  "name":"name_example",
  "subject":"subject_name"
}
```

### Create teacher
* Method: `POST`
* URL: `http://localhost:8080/api/teachers`
* Body: 
```
{
  "name":"name_example",
  "subject":"subject_name"
}
```
* Response:
```
{
  "id":1
  "name":"name_example",
  "subject":"subject_name"
}
```

### Update teacher
* Method `PUT`
* URL: `http://localhost:8080/api/teachers/1`
* Body: 
```
{
  "name":"name_example",
  "subject":"subject_name"
}
```
* Response:
```
{
  "id":1
  "name":"name_example",
  "subject":"subject_name"
}
```


### Delete teacher
* Method `DELETE`
* `http://localhost:8080/api/teachers/1`
* Response:
```
{
  "id":1
  "name":"name_example",
  "subject":"subject_name"
}
```

