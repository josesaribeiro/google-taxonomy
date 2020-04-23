## Google Taxonomy CLI Power Tools

> This is a set of tools to deal with the Google Taxonomy files and data

> In a section below you will find a list of all the files to download in XLS format

Along with this code, the following already converted CSV taxonomy files will be provided:

- en-US
- es-ES
- pt-BR

### CLI Usage

#### `csv` task
In order to just read the data from CSV files, execute the following:

```
node taxo csv [--read <language>]
```

> The parameter `--read <language>` can be suppressed. The default will then be assume. The default configuration can be set at the config [file](./config/index.js).

In order to retrieve the list of items in the first level just run:

```
node taxo csv --list 1
```

> You can choose any level to list from. All the items will be sorted by the `id` field.

In order to get information about an item you can either pass the name of the item or its id:

```
node taxo csv [--id 999] [--name "Yoga & Pilates"]
``` 

> Both parameters can be sent or neither, in case both are sent, the name parameter will be ignored

> The name parameter needs to be enclosed by double-quotes

> The id parameter can be enclosed or not by double-quotes

> The name parameter needs to be provided as they are in the data. Spaces and casing must be considered.

After the execution of the `--id` or `--name` subtasks the following result should be printed:

```
Reading en-US Taxonomy file

Taxonomy en-US file read successfully with 5582 items

Item Result from Search/Get Task:
{
  "id": 999,
  "name": "Yoga & Pilates"
}

Parent Chain:
  ==> 988: Sporting Goods
   ==> 990: Exercise & Fitness
    ==> 999: Yoga & Pilates

Children of Yoga & Pilates:
3810: Pilates Machines
6750: Yoga & Pilates Blocks
3640: Yoga & Pilates Mats
6743: Yoga & Pilates Towels
5107: Yoga Mat Bags & Straps
```

The CLI will print out the id and the name found and in case they exist, all the parents up to the first level and all the children. 


### `db` task

The `db` task is available to read data from the CSV files and load them into a Postgres instance. The connection settings can be set at the config [file](./config/index.js).

> A default file set of `docker-compose` and `Dockerfile` is available at the [docker folder](./docker).

In order to load data from a csv file to the db instance, run the following:

```
node taxo db --load [<language> | all]
```
> The language can be supressed, in this case the one used will be the one set as default.

> The parameter `all` will create a multi-language instance of the taxonomy database and will load all files listed in the `config.language.loaded` array and found at the [data folder](./data).



### Google Taxonomy Urls XLS List

This list has been retrieved from this [Feed Army](https://feedarmy.com/kb/google-merchant-taxonomy-list-for-all-countries/) web page: 


[English](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[French](https://www.google.com/basepages/producttype/taxonomy-with-ids.fr-FR.xls)
[Chile, Colombia](https://www.google.com/basepages/producttype/taxonomy-with-ids.es-ES.xls)
[China](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Czechia](https://www.google.com/basepages/producttype/taxonomy-with-ids.cs-CZ.xls)
[Denmark](https://www.google.com/basepages/producttype/taxonomy-with-ids.da-DK.xls)
[Finland](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[France](https://www.google.com/basepages/producttype/taxonomy-with-ids.fr-FR.xls)
[Germany](https://www.google.com/basepages/producttype/taxonomy-with-ids.de-DE.xls)
[Greece](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Hong Kong](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Hungary](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[India](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Indonesia](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Ireland](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-GB.xls)
[Israel](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Italy](https://www.google.com/basepages/producttype/taxonomy-with-ids.it-IT.xls)
[Japan](https://www.google.com/basepages/producttype/taxonomy-with-ids.ja-JP.xls)
[Malaysia](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Mexico](https://www.google.com/basepages/producttype/taxonomy-with-ids.es-ES.xls)
[Netherlands](https://www.google.com/basepages/producttype/taxonomy-with-ids.nl-NL.xls)
[New Zealand](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-AU.xls)
[Norway](https://www.google.com/basepages/producttype/taxonomy-with-ids.no-NO.xls)
[Philippines](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Poland](https://www.google.com/basepages/producttype/taxonomy-with-ids.pl-PL.xls)
[Portugal](https://www.google.com/basepages/producttype/taxonomy-with-ids.pt-BR.xls)
[Romania](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Russia](https://www.google.com/basepages/producttype/taxonomy-with-ids.ru-RU.xls)
[Saudi Arabia](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Singapore](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Slovakia](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[South Africa](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Spain](https://www.google.com/basepages/producttype/taxonomy-with-ids.es-ES.xls)
[Sweden](https://www.google.com/basepages/producttype/taxonomy-with-ids.sv-SE.xls)
[French](https://www.google.com/basepages/producttype/taxonomy-with-ids.fr-CH.xls)
[German](https://www.google.com/basepages/producttype/taxonomy-with-ids.de-CH.xls)
[Italian](https://www.google.com/basepages/producttype/taxonomy-with-ids.it-CH.xls)
[Taiwan](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Thailand](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Turkey](https://www.google.com/basepages/producttype/taxonomy-with-ids.tr-TR.xls)
[Ukraine](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[United Arab Emirates](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[United Kingdom](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-GB.xls)
[United States](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)
[Vietnam](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.xls)

> All of the above files can be converted using _Microsft Excel_, _Apple Numbers_ or _LibreOffice_. In case you don't have any of those installed in your OS, the following [thread](https://stackoverflow.com/questions/10557360/convert-xlsx-to-csv-in-linux-with-command-line) offers plenty of choices to convert __XLS__ files to __CSV__ in a headless way.