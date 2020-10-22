$(document).ready(function(){
	$('.put-demo-data').on('click', function(){
		$('#marketing-budget').val("200000");
		$('#click-count').val("12500");
		$('#conversion-transit-trial').val("5");
		$('#conversion-trial-payment').val("20");
		$('#cpm').val("80");
		$('#average-cost-avp').val("1900");
		$('#cogs').val("750");
		$('#provision-payment').val("85000");
		$('#fix-cogs').val("170000");
		$('#churn-rate').val("25");

		//Вычисление текущего месяца для таблицы
		monthA = 'январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь'.split(',');
		let time_now = new Date().getMonth();
		let time_new_year = 0;
		for(let j = 0; j<(12-time_now); j++)
		{
			$('.mounth_'+j).text(monthA[(new Date().getMonth() + j)])
			console.log(monthA[(new Date().getMonth() + j)]);
			time_new_year++;
		}
		for(let j = 0; j<time_now; j++)
		{
			$('.mounth_'+time_new_year).text(monthA[(j)]);
			time_new_year++;
		}
		
		$('.put-demo-data').blur();
	});

	$('.main-form__submit').on('click', function(){
		$('.main-form__submit').blur();

		$('#check_average .table__td').text($('#average-cost-avp').val());
		$('#churn-rate .table__td').text($('#churn-rate').val());		
		var count_show = ($('#marketing-budget').val()/$('#cpm').val()*1000);
		var count_click = $('#click-count').val()/count_show;
		var new_client = (count_show*count_click*($('#conversion-transit-trial').val()/100)*($('#conversion-trial-payment').val()/100));
		new_client = Math.round(new_client);
		
		$('#new_client .table__td').text(new_client);
		$('.table__td_all_client_1').text(new_client);
		$('.table__td_back_client_1').text(Number(0));
		$('.table__td_pay1').text(new_client);
		$('.table__td_old1').text(Number(0));
		
		for (let i = 2; i < 13; i++) {
			var client_back = Number($('.table__td_all_client_' + (i-1)).text())-(Number($('.table__td_all_client_' + (i-1)).text()) * ($('#churn-rate').val()/100));
			client_back = Math.round(client_back);
			$('.table__td_back_client_'+i).text(client_back);
  			var client_all = client_back + new_client;
  			client_all = Math.round(client_all);
			$('.table__td_all_client_'+ i).text(client_all);	
		}
		for (let i = 2; i < 13; i++) {
			var client_back = Number($('.table__td_pay' + (i-1)).text())-(Number($('.table__td_pay' + (i-1)).text()) * ($('#churn-rate').val()/100));
			client_back = Math.round(client_back);
			$('.table__td_old'+i).text(client_back);
  			var client_all = client_back + new_client;
  			client_all = Math.round(client_all);
			$('.table__td_pay'+ i).text(client_all);	
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
			var revenue = Number($('#average-cost-avp').val()) * Number($('.table__td_pay'+i).text());
			revenue = Math.round(revenue);
			//console.log(revenue)
			$('.table__td_revenue_ret'+ i).text(revenue);

		}
		for (let i = 1; i < 13; i++) {
			//console.log(Number($('.table__td_all_client_'+i).text()));
			var cogs = (Number ($('.table__td_revenue'+ i).text())  - Number($('#cogs').val())*Number ($('.table__td_pay1').text())-Number($('#provision-payment').val()) - Number($('#marketing-budget').val())); 
			cogs = Math.round(cogs);;
			cogs = Math.round(cogs);
			//console.log(revenue)
			$('.table__td_COGS'+ i).text(cogs);

		}
		for (let i = 1; i < 13; i++) {
			//console.log(Number($('.table__td_all_client_'+i).text()));
			var cogs = (Number ($('.table__td_revenue_ret'+ i).text())  - Number($('#cogs').val())*Number ($('.table__td_pay1').text())-Number($('#provision-payment').val()) - Number($('#marketing-budget').val())); 
			cogs = Math.round(cogs);;
			cogs = Math.round(cogs);
			//console.log(revenue)
			$('.table__td_COGS_ret'+ i).text(cogs);
		}
		$('.table__td_retention1').text(0);
		for (let i = 2; i < 13; i++) {
			var retention = 100 - $('#churn-rate').val();
			retention = Math.round(retention);
			retention = Math.round(retention);
			//console.log(revenue)
			$('.table__td_retention'+ i).text(retention);

		}
		for (let i = 1; i < 13; i++) {
			//console.log(Number($('.table__td_all_client_'+i).text()));
			var cogs = (Number ($('.table__td_revenue'+ i).text())  - Number($('#cogs').val())*Number ($('.table__td_pay1').text())-Number($('#provision-payment').val()) - Number($('#marketing-budget').val()) - Number($('#fix-cogs').val())); 
			
			cogs = Math.round(cogs);;
			cogs = Math.round(cogs);
			if (cogs<0){
				$('.table__td_profi'+ i).removeClass('table__td_not-profit');
				$('.table__td_profi'+ i).removeClass('table__td_profit');
				$('.table__td_profi'+ i).addClass('table__td_not-profit');
			}
			else {
				$('.table__td_profi'+ i).removeClass('table__td_not-profit');
				$('.table__td_profi'+ i).removeClass('table__td_profit');
				$('.table__td_profi'+ i).addClass('table__td_profit');
			}
			//console.log(revenue)
			$('.table__td_profi'+ i).text(cogs);

		}
		for (let i = 1; i < 13; i++) {
			//console.log(Number($('.table__td_all_client_'+i).text()));
			var cogs = (Number ($('.table__td_revenue_ret'+ i).text()) - Number($('#cogs').val())*Number ($('.table__td_pay1').text())-Number($('#provision-payment').val()) - Number($('#marketing-budget').val()) - Number($('#fix-cogs').val())); 
			cogs = Math.round(cogs);;
			cogs = Math.round(cogs);
			if (cogs<0){
				$('.table__td_profi_ret'+ i).removeClass('table__td_not-profit');
				$('.table__td_profi_ret'+ i).removeClass('table__td_profit');
				$('.table__td_profi_ret'+ i).addClass('table__td_not-profit');
			}
			else {
				$('.table__td_profi_ret'+ i).removeClass('table__td_not-profit');
				$('.table__td_profi_ret'+ i).removeClass('table__td_profit');
				$('.table__td_profi_ret'+ i).addClass('table__td_profit');
			}
			//console.log(revenue)
			$('.table__td_profi_ret'+ i).text(cogs);

		}
		
		$('.table__td_mon1-1').text(new_client);
		for (let i = 2; i < 13; i++) {
			$('.table__td_mon1-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon2-2').text(new_client);
		for (let i = 3; i < 13; i++) {
			$('.table__td_mon2-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon3-3').text(new_client);
		for (let i = 4; i < 13; i++) {
			$('.table__td_mon3-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon4-4').text(new_client);
		for (let i = 5; i < 13; i++) {
			$('.table__td_mon4-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon5-5').text(new_client);
		for (let i = 6; i < 13; i++) {
			$('.table__td_mon5-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon6-6').text(new_client);
		for (let i = 7; i < 13; i++) {
			$('.table__td_mon6-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon7-7').text(new_client);
		for (let i = 8; i < 13; i++) {
			$('.table__td_mon7-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon8-8').text(new_client);
		for (let i = 9; i < 13; i++) {
			$('.table__td_mon8-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon9-9').text(new_client);
		for (let i = 10; i < 13; i++) {
			$('.table__td_mon9-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon10-10').text(new_client);
		for (let i = 11; i < 13; i++) {
			$('.table__td_mon10-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon11-11').text(new_client);
		for (let i = 12; i < 13; i++) {
			$('.table__td_mon11-'+i).text($('.table__td_old2').text());
		}
		$('.table__td_mon12-12').text(new_client);



		//Общие данные по экономике




		$('#Revenue').text("р. "+ Number ($('.table__td_revenue1').text()));

		let Revenue_COGS = (Number ($('.table__td_revenue1').text()) - Number($('#cogs').val())*Number ($('.table__td_pay1').text())-Number($('#provision-payment').val()));
		$('#Revenue-COGS').text("р. "+ Revenue_COGS);
		
		let profit = (Number ($('.table__td_revenue1').text()) - Number($('#cogs').val())*Number ($('.table__td_pay1').text())-Number($('#provision-payment').val()) - Number($('#marketing-budget').val()));
		$('#Profit').text("р. "+ profit );

		let Gross_Profit = (Number ($('.table__td_revenue1').text()) - Number($('#cogs').val())*Number ($('.table__td_pay1').text())-Number($('#provision-payment').val()) - Number($('#marketing-budget').val()) - Number($('#fix-cogs').val())); 
		$('#Gross_Profit').text("р. "+ Gross_Profit);
		
		let ARPPU = Revenue_COGS / Number ($('.table__td_pay1').text());
		$('#ARPPU').text("р. "+ARPPU);

		let ARPU =  Revenue_COGS / Number($('#click-count').val());
		$('#ARPU').text("р. "+ARPU);

		let LTV = Number (ARPPU) / Number ($('#churn-rate').val()/100); 
		$('#LTV').text("р. "+ LTV);

		$('#CCPU').text("р. "+ Number($('#marketing-budget').val())/Number ($('.table__td_pay1').text()));

		let Marg = Number($('#average-cost-avp').val()) -  Number($('#cogs').val());
		$('#Margin').text("р. "+ Marg);

		let Count_of_vision = Number($('#marketing-budget').val()) / Number($('#cpm').val()) * 1000;
		$('#Count_of_vision').text(Count_of_vision);

		let leads = Number($('#click-count').val()) * (Number($('#conversion-transit-trial').val()/100));
		$('#Count_of_leads').text(leads);

		let client = Number($('#click-count').val()) * (Number($('#conversion-transit-trial').val()/100))* (Number($('#conversion-trial-payment').val()/100));
		$('#Count_of_clients').text(client);

		let CPA = Number($('#marketing-budget').val()) / leads;
		$('#CPA').text("р. "+CPA);

		let ROMI = (Number ($('.table__td_revenue1').text()) - (Number($('#marketing-budget').val()))) / Number($('#marketing-budget').val()) * 100;
		$('#ROMI').text(ROMI.toFixed(3) + " %");

		let CPC = Number($('#marketing-budget').val()) / Number($('#click-count').val());
		$('#Count_of_click').text(CPC);

		let PPPU = - ((CPC / (Number($('#conversion-transit-trial').val()/100))/(Number($('#conversion-trial-payment').val()/100)))-(Marg-(Number($('#provision-payment').val())/client)));
		$('#PPPU').text("р. "+PPPU);
	});
})
