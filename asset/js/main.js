function NewWindow(text) {
  win=window.open(text,'','top=0,left=0,width=400,height=350');
}
$(document).ready(function ($){
	$.get('../_head.htm', function(data) {
		$(document.head).html(data);
	});
	$.get('../_header.htm', function(data) {
		$(document.body).prepend(data);
		$("#pull").click(function() {
			$(".left-column").slideToggle("400",function() {});
		});
	});
	var leftItems, leftItemNames;
	$.get('./_left.htm', function(data) {
		$('.middle-column-home').before(data);
		leftItems = [];
		leftItemNames = [];
		$('.left-column').find('a').each(function(){
			var a = $(this);
			leftItems.push(a.attr('href'));
			leftItemNames.push(a.html());
		});
	});
	function setDesignLink(clazz, index){
		$(clazz).html(leftItems[index] ? ('<a href="' + leftItems[index] + '" rel="next">' + leftItemNames[index] + '</a>') : '');
	}
	function loadArticle(){
		var hash = location.hash.replace('#', '') || 'react-tutorial';
		$.get(hash + '.html', function(data) {
			$('.article-intro').html(data).find('pre').addClass('prettyprint');
			PR.prettyPrint();
		});
		var index = leftItems.indexOf(location.hash || '#');
		$('.left-column').find('a').removeClass('selected').eq(index).addClass('selected');
		setDesignLink(".previous-design-link", index - 1);
		setDesignLink(".next-design-link", index + 1);
	}
	$('.main').on('click', 'a', function(){
		var href = $(this).attr('href');
		if(href && href.startsWith('#')) setTimeout(loadArticle, 100);
	});
	$.get('../_footer.htm', function(data) {
		$('#footer').html(data);
		loadArticle();
	});

	//搜索
	$(".search-reveal").click(function() {
        $(".row-search-mobile").slideToggle("400", function() {});
    });

	$('.placeholder').on('blur',function(){
	    if($(this).val() == ""){
	    	$(this).val("搜索……");
	    }
	}).on('focus',function(){
	 if($(this).val() == '搜索……') {
	      $(this).val('');
	   }
	});

	// 首页导航
	$("#index-nav li").click(function(){
		$(this).find("a").addClass("current");
		$(this).siblings().find("a").removeClass("current");
		id = $(this).find("a").attr("data-id");
		$("#tool").hide();
		if(id == 'index') {

		} else if(id == 'note') {

		} else if(id == 'tool') {

		} else if(id == 'quiz') {
			$("#manual").hide();
			$("#" + id).show();
			$(".sub-navigation-articles").show();
		} else if(id == 'manual') {
			$("#quiz").hide();
			$("#" + id).show();
			$(".sub-navigation-articles").show();
		} else {
			$("#quiz").hide();
			$("#manual").hide();
		}
    });
	$("#cate0").click(function() {
		$(".codelist-desktop").show();
	})
	$(".design").click(function() {
		$("." + $(this).attr("id")).show().siblings().hide();
	})
	//移动设备点击链接
	$('a').on('click touchend', function(e) {
		if(screen.availHeight==548 && screen.availHeight==320) {
	  		window.location = $(this).attr('href');
  		}
	});

	$(window).scroll(function () {
	    if($(window).scrollTop() >= 100) {
	        $(".go-top").fadeIn();
	    }else {
	    	$(".go-top").fadeOut();
	    }
	});

	$(".go-top").click(function(event){
		$('html,body').animate({scrollTop:0}, 100);
		return false;
	});
	$(window).resize(function() {
		if(window.location.href.indexOf("w3cnote") > 0 && $(window).width() > 768) {
			$(".left-column").show();
		}
	});
});