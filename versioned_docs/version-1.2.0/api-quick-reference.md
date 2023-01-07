---
id: api-quick-reference
sidebar_label: Quick Reference
title: API Quick Reference
---

## Quick Peek

### Properties

| Properties | Type | Modifier | Description |
|---|---|---|---|
|*config*|`Config`|read-only|The current configuration.|
|*length*|`number`|read-only|The number of characters of the birth name, including spaces.|
|*prefix*|`string?`|read-only|The prefix part.|
|*first*|`string`|read-only|The first name.|
|*middle*|`string?`|read-only|The first middle name if any.|
|*last*|`string`|read-only|The last name.|
|*suffix*|`string?`|read-only|The suffix part.|
|*hasMiddle*|`boolean`|read-only|Returns true if any middle name has been set.|
|*birth*|`string`|read-only|The birth name.|
|*short*|`string`|read-only|The shortest version of a person name.|
|*long*|`string`|read-only|The longest version of a person name.|
|*public*|`string`|read-only|The first name combined with the last name's initial.|
|*full*|`string`|read-only|The entire name set.|

### Methods

| Methods | Returns | Description |
|---|---|---|
|*toString()*|`string`|Returns the full name as set.|
|*get(Namon)*|`Name?/Name[]`|Fetches the raw form of a name piece.|
|*equal(Namefully)*|`boolean`|Returns the full name as set.|
|*toJson()*|`JsonName`|Returns the full name as set.|
|*has(Namon)*|`boolean`|Returns the full name as set.|
|*fullName(NameOrder?)*|`string`|Gets the full name ordered as configured.|
|*birthName(NameOrder?)*|`string`|Gets the birth name ordered as configured, no prefix or suffix.|
|*firstName(boolean?)*|`string`|Gets the first name part of the full name.|
|*middleName()*|`string[]`|Gets the middle name part of the full name.|
|*lastName(Surname?)*|`string`|Gets the last name part of the full name.|
|*initials()*|`string[]`|Gets the initials of the full name.|
|*shorten(NameOrder?)*|`string`|Returns a combination of first and last name.|
|*flatten(object?)*|`string`|Flattens a long name using the name types as variants.|
|*zip(Flat?, boolean?)*|`string`|Zips or compacts a name using different forms of variants.|
|*format(string)*|`string`|Formats the full name as desired.|
|*flip()*|`void`|Flips definitely the name order from the current config.|
|*split(RegExp)*|`string[]`|Splits the name parts of a birth name.|
|*join(string)*|`string`|Joins the name parts of a birth name.|
|*toUpperCase()*|`string`|Transforms a birth name into UPPERCASE.|
|*toLowerCase()*|`string`|Transforms a birth name into lowercase.|
|*toCamelCase()*|`string`|Transforms a birth name into camelCase.|
|*toPascalCase()*|`string`|Transforms a birth name into PascalCase.|
|*toHyphenCase()*|`string`|Transforms a birth name into hyphen-case.|
|*toDotCase()*|`string`|Transforms a birth name into dot.case.|
|*toSnakeCase()*|`string`|Transforms a birth name into snake_case.|
|*toToggleCase()*|`string`|Transforms a birth name into ToGgLeCaSe.|

### Static Methods

| Methods | Returns | Description |
|---|---|---|
|*tryParse(string)*|`Namefully`|Constructs an instance from a text.|
|*parse(string)*|`Promise<Namefully>`|Constructs asynchronously an instance from a text.|

[Back to Top](#quick-peek)
