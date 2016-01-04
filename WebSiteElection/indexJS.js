$(function(){
   //alert("aaa");
    initUI();
});

    var initUI = function(){
	//alert("rrr");
       // ajaxCall();
        setInterval(ajaxCall("#table1","server1_1.jag"), 2000);
	setInterval(ajaxCall("#table2","server1_2.jag"), 2000);
	setInterval(ajaxCall("#table3","server2_1.jag"), 2000);
	setInterval(ajaxCall("#table4","server2_2.jag"), 2000);
	setInterval(ajaxCall("#table5","server3_1.jag"), 2000);
	setInterval(ajaxCall("#table6","server3_2.jag"), 2000);

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

