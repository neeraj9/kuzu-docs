---
title: Data types
---

Kùzu supports a set of primitive and nested data types both for node and relationship properties as
well as for forming expressions whose outputs are specified using these data types. This section
shows all built-in data types.

## INT8

| Size | Description
| --- | ---
| 1 byte | signed one-byte integer

## INT16

| Size | Description
| --- | ---
| 2 bytes | signed two-byte integer

## INT32

| Size | Description | Aliases
| --- | --- | ---
| 4 bytes | signed four-byte integer | INT

## INT64

| Size | Description | Aliases
| --- | --- | ---
| 8 bytes | signed eight-byte integer | SERIAL

## INT128

| Size | Description
| --- | ---
| 16 bytes | signed sixteen-byte integer

## UINT8

| Size | Description
| --- | ---
| 1 byte | unsigned one-byte integer

## UINT16

| Size | Description
| --- | ---
| 2 bytes | unsigned two-byte integer

## UINT32

| Size | Description
| --- | ---
| 4 bytes | unsigned four-byte integer

## UINT64

| Size | Description
| --- | ---
| 8 bytes | unsigned eight-byte integer

## FLOAT

| Size | Description
| --- | ---
| 4 bytes | single precision floating-point number

## DOUBLE

| Size | Description
| --- | ---
| 8 bytes | double precision floating-point number

## BOOLEAN

| Size | Description
| --- | ---
| 1 byte | true/false

## STRUCT

| Size | Description
| --- | ---
| fixed | a dictionary or map where keys are of type STRING

## UUID

| Size | Description
| --- | ---
| 16 bytes | signed sixteen-byte integer

The data type `UUID` stores Universally Unique Identifiers (UUID) as defined by RFC 4122,
ISO/IEC 9834-8:2005, and related standards. Kuzu follows [PostgreSQL's implementation](https://www.postgresql.org/docs/13/datatype-uuid.html)
for the `UUID` format.

Example:

```cypher
RETURN UUID('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11') as result;
```

Output:
```
---------------------------------------------
| result                                    |
---------------------------------------------
| a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11      |
---------------------------------------------
```

## STRING

| Size | Description
| --- | ---
| variable | variable-length character string

`STRING` data type supports UTF-8 encoding.

Example:

```cypher
RETURN 'Зарегистрируйтесь, σπαθιοῦ, Yen [jɛn], kΩ' AS str;
```

Output:

```
---------------------------------------------
| str                                       |
---------------------------------------------
| Зарегистрируйтесь, σπαθιοῦ, Yen [jɛn], kΩ |
---------------------------------------------
```

## NULL

| Size | Description
| --- | ---
| fixed | special value to represent unknown data

`NULL`s are special values to represent unknown data. Every node/relationship property or result of
any expression can be `NULL` in addition to the non-`NULL` domain of values they can take. For
example, boolean expressions can be true, false or `NULL`.

The `NULL` (in any of its case variations, such as `Null` or `null`) can be
used to specify a null literal. Some examples of comparisons using `NULL` are shown below.

Compare a value with `NULL`:
```cypher
RETURN 3 = null;
```
Output:
```
------------
| 3 = null |
------------
|          |
------------
```

Compare `NULL` with `NULL`:
```cypher
RETURN null = null;
```
Output:
```
---------------
| null = null |
---------------
|             |
---------------
```
Kùzu's CLI returns an empty cell to indicate nulls.

## DATE

| Size | Description
| --- | ---
| 4 bytes | year, month, day

`DATE` is specified in ISO-8601 format (`YYYY-MM-DD`).

Example:
```cypher
RETURN date('2022-06-06') as x;
```
Output:
```
--------------
| x          |
--------------
| 2022-06-06 |
--------------
```

## TIMESTAMP

| Size | Description
| --- | ---
| 4 bytes | combination of time and date

`TIMESTAMP` combines date and a time (hour, minute, second, millisecond) and is formatted
according to the ISO-8601 format (`YYYY-MM-DD hh:mm:ss[.zzzzzz][+-TT[:tt]]`),
which specifies the date (`YYYY-MM-DD`), time (`hh:mm:ss[.zzzzzz]`) and a time offset
`[+-TT[:tt]]`. Only the Date part is mandatory. If time is specified, then the millisecond
`[.zzzzzz]` part and the time offset are optional.

Example:
```cypher
RETURN timestamp("1970-01-01 00:00:00.004666-10") as x;
```
Output:
```
------------------------------
| x                          |
------------------------------
| 1970-01-01 10:00:00.004666 |
------------------------------
```

## INTERVAL

| Size | Description
| --- | ---
| 4 bytes | date/time difference

`INTERVAL` consists of multiple date parts and represents the total time length of these date parts.
Kùzu follows [DuckDB's implementation](https://duckdb.org/docs/sql/data_types/interval) for the
interval format.

Example:
```cypher
RETURN interval("1 year 2 days") as x;
```
Output:
```
-----------------
| x             |
-----------------
| 1 year 2 days |
-----------------
```

## BLOB

| Size | Description | Aliases
| --- | --- | ---
| variable | arbitrary binary object | BYTEA

`BLOB`(**B**inary **L**arge **OB**ject) allows storage of an arbitrary binary object with up to
4KB in size in Kùzu. The database processes it as binary data because it has no knowledge as to what
the underlying data represents (e.g. image, video).

Below is an example of how to create a blob object with 3 bytes (188, 189, 186, 170):
```cypher
RETURN BLOB('\\xBC\\xBD\\xBA\\xAA') as result;
```
Output:
```
---------------------------------------------
| result                                    |
---------------------------------------------
| \xBC\xBD\xBA\xAA                          |
---------------------------------------------
```

## SERIAL

`SERIAL` is a logical data type and usually used for creating an incremental sequence of unique
identifier column (similar to `AUTO_INCREMENT` supported by some other databases).

Here's how to use `SERIAL` on a primary key column for a CSV file that has the following
values:
```
// person.csv
Alice
Bob
Carol
```

```cypher
CREATE NODE TABLE Person(ID SERIAL, name STRING, PRIMARY KEY(ID));
COPY Person FROM `person.csv`;
MATCH (a:Person) RETURN a;
```
Output:
```
-------------------------------------------
| a                                       |
-------------------------------------------
| (label:Person, 3:0, {ID:0, name:Alice}) |
-------------------------------------------
| (label:Person, 3:1, {ID:1, name:Bob})   |
-------------------------------------------
| (label:Person, 3:2, {ID:2, name:Carol}) |
-------------------------------------------
```

## NODE

| Size | Description
| --- | ---
| fixed | represents a node in a graph

`NODE` is a logical data type. Internally, `NODE` is processed as `STRUCT` type. A `NODE` always contains
an internal ID field with key `_ID` and a label field with key `_LABEL`. The rest fields are node properties.

Here's how to return `NODE` column:
```cypher
MATCH (a:User)
RETURN a;
```
Output:
```
----------------------------------------------------
| a                                                |
----------------------------------------------------
| {_ID: 0:0, _LABEL: User, name: Adam, age: 30}    |
----------------------------------------------------
| {_ID: 0:1, _LABEL: User, name: Karissa, age: 40} |
----------------------------------------------------
| {_ID: 0:2, _LABEL: User, name: Zhang, age: 50}   |
----------------------------------------------------
| {_ID: 0:3, _LABEL: User, name: Noura, age: 25}   |
----------------------------------------------------
```

## REL

| Size | Description
| --- | ---
| fixed | represents a relationship in a graph

`REL` is a logical type. Internally, `REL` is processed as `STRUCT` type. A `REL` always contains a
src ID field with key `_SRC`, a dst ID field with key `_DST`, an internal ID field with key `_ID`
and a label field with key `_LABEL`. The rest fields are rel properties.

Here's how to return `REL` column:
```cypher
MATCH (a:User)-[e:Follows]->(b:User)
RETURN e;
```
Output:
```
---------------------------------------------------------
| e                                                     |
---------------------------------------------------------
| (0:0)-{_LABEL: Follows, _ID: 2:0, since: 2020}->(0:1) |
---------------------------------------------------------
| (0:0)-{_LABEL: Follows, _ID: 2:1, since: 2020}->(0:2) |
---------------------------------------------------------
| (0:1)-{_LABEL: Follows, _ID: 2:2, since: 2021}->(0:2) |
---------------------------------------------------------
| (0:2)-{_LABEL: Follows, _ID: 2:3, since: 2022}->(0:3) |
---------------------------------------------------------
```

## LIST

Kùzu supports two LIST data types: variable-size list `VAR-LIST` and fixed-size `FIXED-LIST.`

| Data Type | DDL Definition | Size | Description
| --- | --- | --- | ---
| VAR-LIST | INT64[] | fixed | a fixed-size sequence of values of the same numerical type
| FIXED-LIST | INT64[5] | variable | a sequence of values of the same type

`LIST` data types include values of a single data type. The data type of values within a `LIST` is
declared before a set of brackets in DDL. For example, `STRING[]` declares a `(VAR-)LIST` of STRING values.

### FIXED-LIST

A `FIXED-LIST` type can contain fixed number of values with the same numeric type. For example,
`INT64[5]` is a `FIXED-LIST` of 5 INT64 values.

### VAR-LIST
A `VAR-LIST` type can contain arbitrary number of values with the same type. VAR-LISTS can be of any
type Kùzu supports including nested and complex types. For example, `STRING[][]` is
`VAR-LIST` of `VAR-LIST` of STRING values. Similarly, `MAP(STRING, STRING)[]`
is a `VAR-LIST` of `MAP(STRING, STRING)` values.

:::danger[Note]
Kùzu does not currently support operations on `FIXED-LIST` values (except casting values to `FIXED-LIST`).
:::

Kùzu does support several operations on `VAR-LIST`, which are covered in the examples shown below.

Create a `VAR-LIST` as follows:
```cypher
RETURN ["Alice", "Bob"] AS l;
```
Output:
```
---------------
| l           |
---------------
| [Alice,Bob] |
---------------
```

Create a `VAR-LIST` via the function
```cypher
RETURN list_creation(1,2,3,4) AS l;
```
Output:
```
-------------
| l         |
-------------
| [1,2,3,4] |
-------------
```

`UNWIND` a `VAR-LIST`:
```cypher
UNWIND [[1,2], [3], [4, 5]] AS x 
UNWIND x as y 
RETURN y;
```
Output:
```
-----
| y |
-----
| 1 |
-----
| 2 |
-----
| 3 |
-----
| 4 |
-----
| 5 |
-----
```

## VARIANT

Variant is a data type that can store values of various data types (similar to the `sql_variant` data type of SQLServer).
Currently it can only be used to store [RDF literals](https://www.w3.org/TR/rdf11-concepts/#section-Graph-Literal) in [RDFGraphs](../../rdf-graphs). 
That is, you cannot create a regular node or relationship table that holds a column of type VARIANT.
When working with RDFGraphs, the [Literals node table](../../rdf-graphs/rdfgraphs-overview#rdfgraphs-mapping-of-triples-to-property-graph-tables)'s 
`val` column stores RDF literal values. RDF literals, and Kùzu's Variant data type can store values of different data types.
For example, consider the following triples in a Turtle file:

```turtle
@prefix kz: <http://kuzu.io/rdf-ex#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

kz:Waterloo a kz:City ;
	    kz:name "Waterloo" ;
	    kz:population 10000 ;
	    kz:altitude1 "329.0"^^xsd:decimal .
```
Suppose that you insert these into an RDFGraph named `UniKG`. You will get the following values in the `val` column 
of the Literals node table `UniKG_l`:
```cypher
MATCH (a:UniKG_r)-[p:UniKG_lt]->(o:UniKG_l)
RETURN a.iri, p.iri, o.val;
```
Output:
```
-------------------------------------------------------------------------------------------------
| a.iri                          | p.iri                                           | o.val      |
-------------------------------------------------------------------------------------------------
| http://kuzu.io/rdf-ex#Waterloo | http://kuzu.io/rdf-ex#altitude1                 | 329.000000 |
-------------------------------------------------------------------------------------------------
| http://kuzu.io/rdf-ex#Waterloo | http://kuzu.io/rdf-ex#population                | 10000      |
-------------------------------------------------------------------------------------------------
| http://kuzu.io/rdf-ex#Waterloo | http://kuzu.io/rdf-ex#name                      | Waterloo   |
-------------------------------------------------------------------------------------------------
```
In the output above the data types of the values in `o.val` are as follows (data types are not rendered in Kùzu cli's output)
- 329.000000 is a double
- 10000 is an integer
- "Waterloo" is a string

These different types are stored under the same column `val` of the `Literals` node table.
The following Kùzu data types can be stored in a Variant column. You can use the `cast` function to cast a value to a 
specific data type before storing it in a Variant column (as will be demonstrated in the `CREATE` statement 
examples momentarily).

| Kùzu Data Type | CAST Function Example |
|----------------|-----------------------|
| INT8           | cast(2, "INT8")       |
| INT16          | cast(2, "INT16")      |
| INT32          | cast(2, "INT32")      | 
| INT64          | cast(2, "INT64")      |
| UINT8          | cast(2, "UINT8")      |
| UINT16         | cast(2, "UINT16")     |
| UINT32         | cast(2, "UINT32")     | 
| UINT64         | cast(2, "UINT64")     |
| DOUBLE         | cast(4.4, "DOUBLE")   |
| FLOAT          | cast(4.4, "FLOAT")    |
| BLOB           | cast("\\xB2", "BLOB") |
| BOOL           | cast("true", "BOOL")  |
| STRING         | cast(123, "STRING")   |
| DATE           | cast("2024-01-01", "DATE") |
| TIMESTAMP      | cast("2024-01-01 11:25:30Z+00:00", "TIMESTAMP") |
| INTERVAL       | cast("1 year", "INTERVAL") |

For example, the below code adds new triples into an RDFGraph with type date and float, respectively:
```cypher
CREATE (a:UniKG_r {iri:"http://kuzu.io/rdf-ex#foo"})-[p:UniKG_lt {iri:"http://kuzu.io/rdf-ex#datepredicate"}]->(o:UniKG_l {val:cast("2024-01-01", "DATE")});
CREATE (a:UniKG_r {iri:"http://kuzu.io/rdf-ex#foo"})-[p:UniKG_lt {iri:"http://kuzu.io/rdf-ex#doublepredicate"}]->(o:UniKG_l {val:4.4});
```
Above, DATE type needs to be cast explicitly as in "cast("2024-01-01", "DATE")" while 4.4, which is of type DOUBLE, 
can be provided as is. This is because DATE is not an automatically inferred data type. The above two CREATE statements will create 
the following two triples:
```
----------------------------------------------------------------------------------
| http://kuzu.io/rdf-ex#foo | http://kuzu.io/rdf-ex#doublepredicate | 4.400000   |
----------------------------------------------------------------------------------
| http://kuzu.io/rdf-ex#foo | http://kuzu.io/rdf-ex#datepredicate   | 2024-01-01 |
----------------------------------------------------------------------------------
```
