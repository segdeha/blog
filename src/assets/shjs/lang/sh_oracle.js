if (! this.sh_languages) {
  this.sh_languages = {};
}
sh_languages['oracle'] = [
  [
    {
      'regex': /\b(?:VARCHAR|TINYINT|TEXT|DATE|SMALLINT|MEDIUMINT|INT|BIGINT|FLOAT|DOUBLE|DECIMAL|DATETIME|TIMESTAMP|TIME|YEAR|UNSIGNED|CHAR|TINYBLOB|TINYTEXT|BLOB|MEDIUMBLOB|MEDIUMTEXT|LONGBLOB|LONGTEXT|ENUM|BOOL|BINARY|VARBINARY|VARCHAR2|NUMBER)\b/gi,
      'style': 'sh_type'
    },
    {
      'regex': /\b(?:ABORT|ACCEPT|ACCESS|ADD|ADMIN|AFTER|ALL|ALLOCATE|ALTER|ANALYZE|AND|ANY|ARCHIVE|ARCHIVELOG|ARRAY|ARRAYLEN|AS|ASC|ASSERT|ASSIGN|AT|AUDIT|AUTHORIZATION|AVG|BACKUP|BASE_TABLE|BECOME|BEFORE|BEGIN|BETWEEN|BINARY_INTEGER|BLOCK|BODY|BOOLEAN|BUFFER_POOL|BY|CACHE|CANCEL|CASCADE|CASE|CHANGE|CHAR|CHARACTER|CHAR_BASE|CHECK|CHECKPOINT|CLOSE|CLUSTER|CLUSTERS|COBOL|COLAUTH|COLUMN|COLUMNS|COMMENT|COMMIT|COMPILE|COMPRESS|CONNECT|CONSTANT|CONSTRAINT|CONSTRAINTS|CONTENTS|CONTINUE|CONTROLFILE|COUNT|CRASH|CREATE|CURRENT|CURRVAL|CURSOR|CYCLE|DATABASE|DATAFILE|DATA_BASE|DATE|DBA|DEBUGOFF|DEBUGON|DEC|DECIMAL|DECLARE|DEFAULT|DEFINITION|DELAY|DELETE|DELTA|DESC|DIGITS|DISABLE|DISMOUNT|DISPOSE|DISTINCT|DO|DOUBLE|DROP|DUMP|EACH|ELSE|ELSIF|ENABLE|END|ENTRY|ESCAPE|EVENTS|EXCEPT|EXCEPTION|EXCEPTIONS|EXCEPTION_INIT|EXCLUSIVE|EXEC|EXECUTE|EXISTS|EXIT|EXPLAIN|EXTENT|EXTERNALLY|FALSE|FETCH|FILE|FLOAT|FLUSH|FOR|FORCE|FOREIGN|FORM|FORTRAN|FOUND|FREELIST|FREELISTS|FROM|FUNCTION|GENERIC|GO|GOTO|GRANT|GROUP|GROUPS|HAVING|IDENTIFIED|IF|IMMEDIATE|IN|INCLUDING|INCREMENT|INDEX|INDEXES|INDICATOR|INITIAL|INITRANS|INSERT|INSTANCE|INT|INTEGER|INTERSECT|INTO|IS|KEY|LANGUAGE|LAYER|LEVEL|LIKE|LIMITED|LINK|LISTS|LOCK|LOGFILE|LOGGING|LONG|LOOP|MANAGE|MANUAL|MAX|MAXDATAFILES|MAXEXTENTS|MAXINSTANCES|MAXLOGFILES|MAXLOGHISTORY|MAXLOGMEMBERS|MAXTRANS|MAXVALUE|MIN|MINEXTENTS|MINUS|MINVALUE|MLSLABEL|MOD|MODE|MODIFY|MODULE|MONITORING|MOUNT|NATURAL|NEW|NEXT|NEXTVAL|NOARCHIVELOG|NOAUDIT|NOCACHE|NOCOMPRESS|NOCYCLE|NOMAXVALUE|NOMINVALUE|NOMONITORING|NONE|NOORDER|NOPARALLEL|NORESETLOGS|NORMAL|NOSORT|NOT|NOTFOUND|NOWAIT|NULL|NUMBER|NUMBER_BASE|NUMERIC|OF|OFF|OFFLINE|OLD|ON|ONLINE|ONLY|OPEN|OPTIMAL|OPTION|OR|ORDER|OTHERS|OUT|OWN|PACKAGE|PARALLEL|PARTITION|PCTFREE|PCTINCREASE|PCTUSED|PLAN|PLI|POSITIVE|PRAGMA|PRECISION|PRIMARY|PRIOR|PRIVATE|PRIVILEGES|PROCEDURE|PROFILE|PUBLIC|QUOTA|RAISE|RANGE|RAW|READ|REAL|RECORD|RECOVER|REFERENCES|REFERENCING|RELEASE|REMR|RENAME|RESETLOGS|RESOURCE|RESTRICTED|RETURN|REUSE|REVERSE|REVOKE|ROLE|ROLES|ROLLBACK|ROW|ROWID|ROWLABEL|ROWNUM|ROWS|ROWTYPE|RUN|SAVEPOINT|SCHEMA|SCN|SECTION|SEGMENT|SELECT|SEPARATE|SEQUENCE|SESSION|SET|SHARE|SHARED|SIZE|SMALLINT|SNAPSHOT|SOME|SORT|SPACE|SQL|SQLBUF|SQLCODE|SQLERRM|SQLERROR|SQLSTATE|START|STATEMENT|STATEMENT_ID|STATISTICS|STDDEV|STOP|STORAGE|SUBTYPE|SUCCESSFUL|SUM|SWITCH|SYNONYM|SYSDATE|SYSTEM|TABAUTH|TABLE|TABLES|TABLESPACE|TASK|TEMPORARY|TERMINATE|THEN|THREAD|TIME|TO|TRACING|TRANSACTION|TRIGGER|TRIGGERS|TRUE|TRUNCATE|TYPE|UID|UNDER|UNION|UNIQUE|UNLIMITED|UNTIL|UPDATE|USE|USER|USING|VALIDATE|VALUES|VARCHAR|VARCHAR2|VARIANCE|VIEW|VIEWS|WAIT|WHEN|WHENEVER|WHERE|WHILE|WITH|WORK|WRITE|XOR)\b/gi,
      'style': 'sh_keyword'
    },
    {
      'next': 1,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 2,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'next': 3,
      'regex': /`/g,
      'style': 'sh_string'
    },
    {
      'next': 4,
      'regex': /#/g,
      'style': 'sh_comment'
    },
    {
      'next': 5,
      'regex': /\/\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 11,
      'regex': /\/\//g,
      'style': 'sh_comment'
    },
    {
      'next': 12,
      'regex': /\/\*\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 18,
      'regex': /\/\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 19,
      'regex': /--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    }
  ],
  [
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /`/g,
      'style': 'sh_string'
    },
    {
      'regex': /\\./g,
      'style': 'sh_specialchar'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 6,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 8,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 9,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 7,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 8,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 10,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'next': 13,
      'regex': /<!DOCTYPE/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 15,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 16,
      'regex': /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    },
    {
      'regex': /@[A-Za-z]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': />/g,
      'style': 'sh_preproc'
    },
    {
      'next': 14,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /-->/g,
      'style': 'sh_comment'
    },
    {
      'next': 15,
      'regex': /<!--/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'regex': /[^=" \t>]+/g,
      'style': 'sh_type'
    },
    {
      'regex': /=/g,
      'style': 'sh_symbol'
    },
    {
      'next': 17,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'regex': /\\(?:\\|")/g
    },
    {
      'exit': true,
      'regex': /"/g,
      'style': 'sh_string'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\//g,
      'style': 'sh_comment'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
      'style': 'sh_url'
    },
    {
      'regex': /(?:TODO|FIXME)(?:[:]?)/g,
      'style': 'sh_todo'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    }
  ]
];
