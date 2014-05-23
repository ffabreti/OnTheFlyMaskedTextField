
//old version sort of based on regexp
String.prototype.masked = String.prototype.masked || function (msk) { 
    //example: this='12.3-45678901/234'
    //example: mask='99.999.999/9999-99'
    
    var onlyNum = this.replace(/\D/g,""); //example: 12345678901234
    var i,j,r,rr,result;
    var puncts = msk.replace(/9+/g,''); //remove all nines (punctuation only)
    //make regexp from mask
    var reArray = msk.split(/[,;:\-\.\(\)\/]/); //example: ["99", "999", "999", "9999", "99"]
    r = '';
    for (i=0; i<reArray.length; i++) {
        rr = '(';
        for (j=0; j<reArray[i].length; j++) {
            rr += '\\\d?';    
        }
        rr += ')?';
        r += rr;  //example: (\d?\d?)?
    }
    //r example: '(\d?\d?)?(\d?\d?\d?)?(\d?\d?\d?)?(\d?\d?\d?\d?)?(\d?\d?)?'
    var regexp = new RegExp(r);
    
    var arr = onlyNum.match(regexp); //arr = ["12345678901234", "12", "345", "678", "9012", "34"]
   
    arr.shift();  //arr = ["12", "345", "678", "9012", "34"]

    var seps = puncts.split('');  //[".", ".", "/", "-"]
    // adds first element as empty because seps joins ahead of arr
    seps.unshift('');   //["", ".", ".", "/", "-"]
    result='';
    for (var i=0; i<=arr.length; i++) {
        if (arr[i]) { result = result + seps.shift() + arr[i]; }                               
    }  
    return result;  //"12.345.678/9012-34"
};
//newer version. iterates thru mask and decides if char should be included on results
String.prototype.maskMe = String.prototype.maskMe || function(msk) { 
    //example: num='1br23456A2345'
    //example: mask='(99) 999-99(999)'
    function isPunct(c) {
        var reg = RegExp('[ ,;:<>@#\*\=\+\.\(\)\/-]'); //punctuation or space
        if ( c.match(reg) && c.match(reg).length>0 ) return(true);
        return(false);
    }
    var alpha = this.replace(/[^a-zA-Z0-9]/g,""); //ex: "1br23456A2345"
    var arr = alpha.split(''); // array of chars => ex.: ["1", "b", "r", "2", "3", "4", "5", "6", "A", "2", "3", "4", "5"]
    var i,r,rr,result;
    r = '';
    for (i=0; i<msk.length; i++) {
        console.log('i: '+i);
        console.log('arr: ' + arr.join(','));
        
        switch(true) {
            case msk[i]==='9': //mask asks for a number
                    console.log('number:'+msk[i]);
                    if (arr.length>0) {
                        rr = arr.shift(); //get next char
                        if ( rr.match(/[0-9]/) ) { //if is a number, insert it
                            r += rr; 
                        } else { 
                            i--; //discard and retry the mask position in next cycle with next char
                        }
                    } else {//empty array of chars
                        return (r); //return 
                    }      
                    break; 
            case msk[i]==('A' || 'a'): //mask asks for a letter
                    console.log('letter:'+msk[i]);
                    if (arr.length>0) {
                        rr = arr.shift(); 
                        if ( rr.match(/[a-zA-Z]/) ) { //if is a letter, insert it
                            r += rr; 
                        } else {
                            i--; //discard and retry the mask position in next cycle with next char
                        }
                    } else {//empty array of chars
                        return (r); //return 
                    }        
                    break;
            case isPunct(msk[i]): //mask punctuation or space
                    if (arr.length>0) {
                        r += msk[i]; //insert this
                    } else { //empty array of chars
                        r += msk[i];  //puts a last puctuation 
                        return (r); //and return 
                    }
                        
                    console.log('puct:'+msk[i]);
                    break;   
            default:
                    //console.log('default:'+msk[i]);
                    
                    break;        
        }
       console.log('r: ' + r);
    }    
    return r;  //"12.345.678/9012-34"
};
