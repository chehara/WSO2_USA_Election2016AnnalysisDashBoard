$(function(){
   //alert("aaa");
    initUI();
});

    var initUI = function(){
	//alert("rrr");
       // ajaxCall();
        setInterval(ajaxCall("#table1","serverHillary_1.jag"), 10000);
	setInterval(ajaxCall("#table2","serverHillary_2.jag"), 10000);
	setInterval(ajaxCall("#table3","serverTrump_1.jag"), 10000);
	setInterval(ajaxCall("#table4","serverTrump_2.jag"), 10000);
	setInterval(ajaxCall("#table5","serverBernie_1.jag"), 10000);
	setInterval(ajaxCall("#table6","serverBernie_2.jag"), 10000);

    };

var ajaxCall = function(id,url){
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

