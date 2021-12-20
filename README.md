# landscape-vilmod

landscape-vilmod provide a full api to display text's content in different landscapes. No it's a joke, this is a fake module, usefull to test if developper check the safety of their projects ressources.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
npm i landscape-vilmod
```

## Usage

```javascript
// Init Module
const landScapeVilMod = require('landscape-vilmod')

// Prepare String
let text = new landScapeVilMod("@MyNewApp");

// Change the text landscape as you want
text.flipText();
// ddɐʍǝuʎɯ@

text.vText();
/*
@
M
y
N
e
w
A
p
p
*/

text.hText();
// @MyNewApp

text.vRevertText();
/*
p
p
A
w
e
N
y
M
@
*/

text.hRevertText();
// ppAweNyM@
```

## License
[Apache-2.0]