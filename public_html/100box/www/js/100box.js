var boxnumber=1;
var boxstart=true;
var boxtime=null;
var boxcounter=0;
var box = {
    
    startup : function () {
        boxnumber=1;
        boxstart=true;
        boxcounter=0;
        var table = "";
        var i3 = 1;
        var h = ['a','b','c','d','e','f','g','h','j','k'];
        table += '<div class="ui-boxgrp">';
        for(var i1=0;i1<10;i1++) {
            for(var i2=0;i2<10;i2++) {
                table += '<div class="ui-box-'+h[i2]+'"><div class="ui-box-div" clicked="0" ifclick="0" number="'+i3+'">&nbsp;</div></div>';
                i3++;
            }
        }
        table += "</div>";

        $("#btngrp").html("");
        $("#btngrp").append(table);
        $('#btngrp').trigger('pagecreate');
        $( ".ui-box-div" ).click(function() {
            if(boxstart == true) {
                $(this).attr("ifclick","1");
            }
            if($(this).attr("clicked") == "0") {
                if($(this).attr("ifclick") == "1") {
                    box.boxclick($(this));
                }
            }
        });
        $("#btntimer").html("00:00");
        $("#btnboxnumber").html(100);
        $('.ui-dialog').dialog('close');
        box.boxtimer("stop");
    },
    boxclick : function (elt) {
        elt.removeClass();
        elt.addClass("ui-box-div-clicked");
        elt.html(boxnumber);
        elt.attr("clicked","1");

        $("#btnboxnumber").html(100-boxnumber);
        if(boxnumber == 100) {
            $("#congin").html($("#btntimer").html());
            $.mobile.changePage( "#congratulations", { role: "dialog" } );
            return;
        }
        
        var numthis = parseInt(elt.attr("number"));
        var numright = numthis+3;
        var numleft = numthis-3;
        var numup = numthis-30;
        var numdown = numthis+30;
        var numrightup = numthis-18;
        var numrightdown = numthis+22;
        var numleftup = numthis-22;
        var numleftdown = numthis+18;
        var numrest = numthis%10;
        
        if(numrest == 0 || numrest >= 8) {
            numright = -1;
            if(numrest == 0 || numrest >=9) {
                numrightup = -1;
                numrightdown = -1;
            }
        }
        else if(numthis == 1 || numrest <= 3) {
            numleft = -1;
            if(numrest <= 2) {
                numleftup = -1;
                numleftdown = -1;
            }
        }
        
        logmsg = "t:"+numthis+"\nr:"+numright+"\nru:"+numrightup+"\nrd:"+numrightdown+"\nl:"+numleft+"\nlu:"+numleftup+"\nld:"+numleftdown+"\nu:"+numup+"\nd:"+numdown+"\nclicked:"+$("[clicked=1]").length+"-"+boxnumber;
        
        $("[clicked=0]").removeClass();
        $("[clicked=0]").addClass("ui-box-div");
        $("[clicked=0]").attr("ifclick","0");
        
        $("[number="+numright+"][clicked=0]").removeClass();
        $("[number="+numright+"][clicked=0]").addClass("ui-box-div-click");
        $("[number="+numright+"][clicked=0]").attr("ifclick","1");
        
        $("[number="+numleft+"][clicked=0]").removeClass();
        $("[number="+numleft+"][clicked=0]").addClass("ui-box-div-click");
        $("[number="+numleft+"][clicked=0]").attr("ifclick","1");
        
        $("[number="+numup+"][clicked=0]").removeClass();
        $("[number="+numup+"][clicked=0]").addClass("ui-box-div-click");
        $("[number="+numup+"][clicked=0]").attr("ifclick","1");
        
        $("[number="+numdown+"][clicked=0]").removeClass();
        $("[number="+numdown+"][clicked=0]").addClass("ui-box-div-click");
        $("[number="+numdown+"][clicked=0]").attr("ifclick","1");
        
        $("[number="+numrightup+"][clicked=0]").removeClass();
        $("[number="+numrightup+"][clicked=0]").addClass("ui-box-div-click");
        $("[number="+numrightup+"][clicked=0]").attr("ifclick","1");
        
        $("[number="+numrightdown+"][clicked=0]").removeClass();
        $("[number="+numrightdown+"][clicked=0]").addClass("ui-box-div-click");
        $("[number="+numrightdown+"][clicked=0]").attr("ifclick","1");
        
        $("[number="+numleftup+"][clicked=0]").removeClass();
        $("[number="+numleftup+"][clicked=0]").addClass("ui-box-div-click");
        $("[number="+numleftup+"][clicked=0]").attr("ifclick","1");
        
        $("[number="+numleftdown+"][clicked=0]").removeClass();
        $("[number="+numleftdown+"][clicked=0]").addClass("ui-box-div-click");
        $("[number="+numleftdown+"][clicked=0]").attr("ifclick","1");
        
        logmsg += "-"+$("[ifclick=1][clicked=0]").length;
        console.log(logmsg);
        if($("[ifclick=1][clicked=0]").length == 0 && boxnumber < 100) {
            $("#losein").html($("#btntimer").html()+" - "+$("#btnboxnumber").html());
            $.mobile.changePage( "#lose", { role: "dialog"} );
            return;
        }
        
        boxnumber++;
        if(boxstart == true) {
            boxstart = false;
            box.boxtimer("start");
        }
        
    },
    boxtimer : function (step) {
        if(step == "start") {
            $("#btntimer").html("00:00");
            clearTimeout(boxtime);
            boxtime = null;
            boxtime = setTimeout(function(){box.boxtimer("go");},1000);
        }
        else if(step == "go") {
            boxcounter++;
            var min = 0;
            var sec = 0;
            if(boxcounter > 59) {
                sec = boxcounter%60;
                min = Math.floor(boxcounter/60);
            }
            else {
                sec = boxcounter;
                min = Math.floor(boxcounter/60);
            }
            if(sec < 10) {
                sec = "0"+sec;
            }
            if(min < 10) {
                min = "0"+min;
            }
            $("#btntimer").html(min+":"+sec);
            if(min == "59" && sec == "59") {
                this.boxtimer("stop");
                $.mobile.changePage( "#lose", { role: "dialog"} );
                return;
            }
            clearTimeout(boxtime);
            boxtime = null;
            boxtime = setTimeout(function(){box.boxtimer("go");},1000);
        }
        else if(step == "stop") {
            clearTimeout(boxtime);
            boxtime = null;
        }
    }
};


$(document).ready(function() { 
    box.startup();
});
