$(function(){
  // alert("aaa");
    init();
});

    var init = function(){
	//alert("rrr");
       // ajaxCall();
        setInterval('ajaxCal("#tableTag1","serverTagHillary.jag");', 20000);
	setInterval('ajaxCal("#tableTag2","serverTagTrump.jag");', 20000);
	setInterval('ajaxCal("#tableTag3","serverTagBernie.jag");', 20000);
    };

var ajaxCal = function(id,url){
	//alert("ddd");
        $.ajax({
            url: url,
            dataType: "json",
            type: "POST",
            success: function(data){
		//alert("sss");
                var table = $(id);
		$(id+" tr").remove();
                if(data){
                    $.each(data,function(i,e){
                        table.append("<tr><td>"+e+"</td></tr>");
                    });
                }
            },
	    error: function(e){
		alert("Error" + e);
	   }
        });
    };

