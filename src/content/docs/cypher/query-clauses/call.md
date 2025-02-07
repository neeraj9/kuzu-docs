---
title: Call
description: CALL clause is a reading clause used for executing schema functions.
---

`CALL` clause is used for executing schema functions. The following tables lists
built-in schema functions

| Function | Description |
| ----------- | --------------- |
| `TABLE_INFO('tableName')` | returns metadata information of the given table |
| `CURRENT_SETTING('setting')` | returns the value of the given setting |
| `DB_VERSION()` | returns the version of Kùzu |
| `SHOW_TABLES()` | returns the name, type, comment of all tables in the database |
| `READ_PANDAS(pd)` | scans pandas DataFrame |

### TABLE_INFO

TABLE_INFO takes table name as a parameter and returns metadata information of the table.

| Column | Description | Type |
| ------ | ----------- | ---- |
| `property id` | Internal identifier of the property within table | INT64 |
| `name` | name of the property | STRING |
| `type` | data type of the property | STRING |
| `primary key` | if property is primary key | BOOLEAN |

```cypher
CALL TABLE_INFO('User') return *;
```
Output:
```
---------------------------------------------
| property id | name | type   | primary key |
---------------------------------------------
| 0           | name | STRING | True        |
---------------------------------------------
| 1           | age  | INT64  | False       |
---------------------------------------------
```

### CURRENT_SETTING

CURRENT_SETTING returns the value of given database configuration.

<!-- All supported configurable database options can be found here: [configuration](../configuration) -->

```cypher
CALL current_setting('threads') return *;
```
Output:
```
-----------
| threads |
-----------
| 8       |
-----------
```

### DB_VERSION

DB_VERSION returns current database version.

| Column | Description | Type |
| ------ | ----------- | ---- |
| version | database version | STRING |


```cypher
CALL db_version() RETURN *;
```
Output:
```
----------------
| KUZU_Version |
----------------
| v0.3.2       |
----------------
```

### SHOW_TABLES

SHOW_TABLES returns the name, type and comment of all tables in the database.

| Column | Description | Type |
| ------ | ----------- | ---- |
| name | name of the table | STRING |
| type | type of the table | STRING |
| comment | comment of the table | STRING |

```cypher
CALL show_tables() RETURN *;
```
Output:
```
--------------------------------------------
| name        | type | comment             |
--------------------------------------------
| gf          | RDF  |                     |
--------------------------------------------
| gf_TRIPLES  | REL  |                     |
--------------------------------------------
| gf_RESOURCE | NODE |                     |
--------------------------------------------
| person      | NODE | person info         |
--------------------------------------------
| knows       | REL  | person knows person |
--------------------------------------------
```

### SHOW_CONNECTION

SHOW_CONNECTION returns the source/destination nodes for a rel/relgroup in the database.

| Column | Description | Type |
| ------ | ----------- | ---- |
| source table name | name of the source node | STRING |
| destination table name | name of the destination node | STRING |

Show connection on a rel table:
```cypher
CALL show_connection('knows') RETURN *;
```
Output:
```
----------------------------------------------
| source table name | destination table name |
----------------------------------------------
| person            | person                 |
----------------------------------------------
```
Show connection on a rel group:
```cypher
CALL show_connection('knows') RETURN *;
```
Output:
```
----------------------------------------------
| source table name | destination table name |
----------------------------------------------
| user              | person                 |
----------------------------------------------
| person            | person                 |
----------------------------------------------
```

### READ_PANDAS

`READ_PANDAS` can be used to scan a pandas dataframe object. 

Consider the following pandas DataFrame "person"
```py
# main.py
import numpy as np
import pandas as pd

id = np.array([0, 2, 3, 5, 7, 11, 13], dtype=np.int64)
age = np.array([42, 23, 33, 57, 67, 39, 11], dtype=np.uint16)
height_in_cm = np.array([167, 172, 183, 199, 149, 154, 165], dtype=np.uint32)
is_student = np.array([False, True, False, False, False, False, True], dtype=bool)
person = pd.DataFrame({'id': id, 'age': age, 'height': height_in_cm, 'is_student': is_student})
```

You can directly scan the `person` DataFrame as a regular table through `READ_PANDAS` function in Python.

```py
result = conn.execute(
    """
    CALL READ_PANDAS("person")
    RETURN age as age, height / 2.54 as height_in_inch
    """
    ).get_as_df()
print(result)
```
Output:
```
    age   height_in_inch
0   42       65.748031
1   23       67.716535
2   33       72.047244
3   57       78.346457
4   67       58.661417
5   39       60.629921
6   11       64.960630
```
