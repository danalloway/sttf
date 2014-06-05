$(document).ready(function(){
	$("i.glyphicon-filter").each(function(){
		$(this).click(function(){
			var id = $(this).parent().data("player-id");
			$("table.matches tbody tr").hide();
			$('table.matches').find("[data-player-id=" + id + "]").each(function(){
				$(this).parent().show();
			});
		});		
	});
	
	$('table.matches td').each(function(){	
		$(this).mouseover(function(){
			$(this).find('i.filter').addClass("glyphicon glyphicon-filter");
		});
		
		$(this).mouseout(function(){
			$(this).find('i.filter').removeClass("glyphicon glyphicon-filter");
		});
	});  		
});
