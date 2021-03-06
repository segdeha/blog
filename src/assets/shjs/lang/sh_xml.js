if (! this.sh_languages) {
  this.sh_languages = {};
}
sh_languages['xml'] = [
  [
    {
      'next': 1,
      'regex': /<\?xml/g,
      'state': 1,
      'style': 'sh_preproc'
    },
    {
      'next': 3,
      'regex': /<!--/g,
      'style': 'sh_comment'
    },
    {
      'regex': /<(?:\/)?[A-Za-z0-9_:-]+(?:\/)?>/g,
      'style': 'sh_keyword'
    },
    {
      'next': 4,
      'regex': /<(?:\/)?[A-Za-z0-9_:-]+/g,
      'state': 1,
      'style': 'sh_keyword'
    },
    {
      'regex': /&(?:[A-Za-z0-9]+);/g,
      'style': 'sh_preproc'
    }
  ],
  [
    {
      'exit': true,
      'regex': /\?>/g,
      'style': 'sh_preproc'
    },
    {
      'next': 2,
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
      'next': 3,
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
      'next': 5,
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
  ]
];
