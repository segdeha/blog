if (! this.sh_languages) {
  this.sh_languages = {};
}
sh_languages['pascal'] = [
  [
    {
      'regex': /\b(?:alfa|and|array|begin|case|const|div|do|downto|else|end|false|file|for|function|get|goto|if|in|label|mod|new|not|of|or|pack|packed|page|program|put|procedure|read|readln|record|repeat|reset|rewrite|set|text|then|to|true|type|unpack|until|var|while|with|writeln|write)\b/gi,
      'style': 'sh_keyword'
    },
    {
      'next': 1,
      'regex': /\(\*/g,
      'style': 'sh_comment'
    },
    {
      'next': 2,
      'regex': /\{/g,
      'style': 'sh_comment'
    },
    {
      'regex': /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'style': 'sh_number'
    },
    {
      'next': 3,
      'regex': /"/g,
      'style': 'sh_string'
    },
    {
      'next': 4,
      'regex': /'/g,
      'style': 'sh_string'
    },
    {
      'regex': /\b(?:boolean|byte|char|integer|maxint|real)\b/gi,
      'style': 'sh_type'
    },
    {
      'regex': /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      'style': 'sh_symbol'
    },
    {
      'regex': /(?:[A-Za-z]|_)[A-Za-z0-9_]*[ \t]*(?=\()/g,
      'style': 'sh_function'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\*\)/g,
      'style': 'sh_comment'
    },
    {
      'next': 1,
      'regex': /\(\*/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\}/g,
      'style': 'sh_comment'
    },
    {
      'next': 2,
      'regex': /\{/g,
      'style': 'sh_comment'
    }
  ],
  [
    {
      'exit': true,
      'regex': /$/g
    },
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
    },
    {
      'regex': /\\(?:\\|')/g
    },
    {
      'exit': true,
      'regex': /'/g,
      'style': 'sh_string'
    }
  ]
];
