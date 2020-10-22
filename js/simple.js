$(document).ready(function(){
	$('.put-demo-data').on('click', function(){
		$('#marketing-budget').val("1");
		$('#click-count').val("1334");
		$('#conversion-transit-trial').val("25");
		$('#conversion-trial-payment').val("30");
		$('#cpm').val("1000");
		$('#average-cost-avp').val("3500");
		$('#cogs').val("10000");
		$('#provision-payment').val("135000");
		$('#fix-cogs').val("200000");
		$('#churn-rate').val("25");
		$('.put-demo-data').blur();
	});

	$('.main-form__submit').on('click', function(){
		$(this).blur();
		$('#check_average .table__td').text($('#average-cost-avp').val());
		$('#churn-rate .table__td').text($('#churn-rate').val());		
		var count_show = ($('#marketing-budget').val()/$('#cpm').val()*1000);
		var count_click = $('#click-count').val()/count_show;
		var new_client = (count_show*count_click*($('#conversion-transit-trial').val()/100)*($('#conversion-trial-payment').val()/100));
		new_client = Math.round(new_client);
		
		$('#new_client .table__td').text(new_client);
		$('.table__td_all_client_1').text(new_client);
		$('.table__td_back_client_1').text(Number(0));
		
		for (let i = 2; i < 13; i++) {
			var client_back = Number($('.table__td_all_client_' + (i-1)).text())-(Number($('.table__td_all_client_' + (i-1)).text()) * ($('#churn-rate').val()/100));
			client_back = Math.round(client_back);
			$('.table__td_back_client_'+i).text(client_back);
  			var client_all = client_back + new_client;
  			client_all = Math.round(client_all);
			$('.table__td_all_client_'+ i).text(client_all);	
		}
		
		for (let i = 1; i < 13; i++) {
			//console.log(Number($('.table__td_all_client_'+i).text()));
			var revenue = Number($('#average-cost-avp').val()) * Number($('.table__td_all_client_'+i).text());
			revenue = Math.round(revenue);
			//console.log(revenue)
			$('.table__td_revenue'+ i).text(revenue);

		}
		for (let i = 1; i < 13; i++) {
			//console.log(Number($('.table__td_all_client_'+i).text()));
			var cogs = Number ($('.table__td_revenue'+ i).text()) - (Number($('#cogs').val()) * Number ($('.table__td_all_client_'+ i).text())) - Number($('#marketing-budget').val());
			cogs = Math.round(cogs);;
			cogs = Math.round(cogs);
			//console.log(revenue)
			$('.table__td_COGS'+ i).text(cogs);

		}
		for (let i = 1; i < 13; i++) {
			//console.log(Number($('.table__td_all_client_'+i).text()));
			var cogs = Number ($('.table__td_revenue'+ i).text()) - (Number($('#cogs').val()) * Number ($('.table__td_all_client_'+ i).text())) - Number($('#marketing-budget').val())-Number($('#fix-cogs').val());
			cogs = Math.round(cogs);;
			cogs = Math.round(cogs);
			//console.log(revenue)
			$('.table__td_profi'+ i).text(cogs);

		}
	});
})