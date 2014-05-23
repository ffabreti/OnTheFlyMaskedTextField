var len;
$.tfResult.focusable=true; //needed for keypressed


//======------ E V E N T S ------======
//-------------------------------------------
$.tfResult.addEventListener("keypressed", function(e) {
    
    if (e.keyCode==4 || e.keyCode==67) {//back key (soft and hard keyboard)
        e.source.value = e.source.value.slice(0, -1); //chop
        return;  
    }
    //alert(e.keyCode);
    if (typeof(len)==='undefined') len = e.source.value.length;
    //Ti.API.info('==================');
    //Ti.API.info('e.source.value: ' + e.source.value);
    if (len !== e.source.value.length) {
         maskIdent(this);
         len = e.source.value.length;
         e.source.setSelection(len,len);
    }
    //Ti.API.info('value: ' + e.source.value);
    //Ti.API.info('len: ' + len);
    //Ti.API.info('e.source.value: ' + e.source.value);
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
