## SPECIFICATION

### List all students
* Method: `GET`
* URL: `http://localhost:8080/api/students`
* Response:
```
[
  {
    "id":1
    "name":"name_example",
    "course":"course_name"
  },
  {
    "id":2
    "name":"name_example",
    "course":"course_name"
  },
  ...
]
```

### Retrieve student by id
* Method: `GET`
* URL: `http://localhost:8080/api/students/1`
* Response:
```
{
  "id":1
  "name":"name_example",
  "course":"course_name"
}
```

### Create student
* Method: `POST`
* URL: `http://localhost:8080/api/students`
* Body: 
```
{
  "name":"name_example",
  "course":"course_name"
}
```
* Response:
```
{
  "id":1
  "name":"name_example",
  "course":"course_name"
}
```

### Update student
* Method `PUT`
* URL: `http://localhost:8080/api/students/1`
* Body: 
```
{
  "name":"name_example",
  "course":"course_name"
}
```
* Response:
```
{
  "id":1
  "name":"name_example",
  "course":"course_name"
}
```


### Delete student
* Method `DELETE`
* `http://localhost:8080/api/students/1`
* Response:
```
{
  "id":1
  "name":"name_example",
  "course":"course_name"
}
```

