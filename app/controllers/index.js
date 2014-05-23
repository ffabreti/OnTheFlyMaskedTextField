var len;

//======------ E V E N T S ------======
//-------------------------------------------
$.tfResult.addEventListener("change", function(e) {
    
    if (typeof(len)==='undefined') len = e.value.length;
    //glo.say();
    //glo.say('e.source.value: ' + e.source.value);
    if (len !== e.value.length) {
         maskIdent(this);
         len = e.source.value.length;
         e.source.setSelection(len,len);
    }
    //glo.say('value: ' + e.source.value);
    //glo.say('len: ' + len);
    //glo.say('e.source.value: ' + e.source.value);
});
//-------------------------------------------
$.tfMask.addEventListener("change", function(e){
    $.tfResult.value = '';
    $.tfResult.hintText = this.value; 
});  
//-------------------------------------------
$.tfResult.addEventListener("click", function(e) {
    e.source.bubbleParent = false;  //dont fire the container click /because it is used to blur this textfield
    e.source.setSelection(e.source.value.length,e.source.value.length);
});    
//-------------------------------------------
$.index.addEventListener("click", function(e){
    $.tfResult.blur(); 
});
//======------ F U N C T I O N S ------======
function maskIdent(tf) {
    tf.value = tf.value.maskMe($.tfMask.value); 
}

$.index.open();
