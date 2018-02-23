$(document).ready(function() {
  
  var $scene = $(".scene"),
      $content = $(".content"),
      $back = $(".back"),
      $backBgs = $(".back__bg"),
      $front = $(".front"),
      $frontBgs = $(".front__bg"),
      animating = false,
      blockAnimTime = 1500,
      curSlide = 1,
      sliderXDiff = 0,
      curPage = 1,
      nextPage = 0,
      numOfPages = $(".front__bg").length,
      scaleTime = 500,
      transTime = 500,
      totalTime = scaleTime + transTime,
      changeTimeout,
      timeoutTime = 6000;
      // init nav element timeout animation
  $(".nav__el-1").addClass("active");
  
  //default debounce function from David Walsh blog
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
  function changePages() {
    $(".back__bg, .front__bg, .nav__el").removeClass("active");
    $(".nav__el-"+curPage).addClass("active");
   /* $back.css("transform", "translate3d(0,"+(curPage-1)*-100+"%,0)");
    $front.css("transform", "translate3d(0,"+(curPage-1)*100+"%,0)");*/
      $back.css("transform","translate3d"+"("+(curPage-1)*-100+"%,0,0)");
     $front.css("transform","translate3d"+"("+(curPage-1)*100+"%,0,0)");
    createTimeout();

    setTimeout(function() {
      $(".back__bg-"+curPage+", .front__bg-"+curPage).addClass("active");
    }, totalTime);
  };
  
  $(document).on("click", ".nav__el:not(.active)", function() {
    curPage = $(this).attr("data-page");
    changePages();
  });
  
  // ugly hack for animation reset when you coming back from menu section
  function resetTimeoutAnimation() {
    var $activeNavEl = $(".nav__el.active"),
        $activeParts = $activeNavEl.find(".nav__el-clone, .nav__el")
    $activeParts.addClass("instant");
    $activeNavEl.removeClass("active");
    $activeParts.css("top");
    $activeParts.removeClass("instant");
    $activeParts.css("top");
    $activeNavEl.addClass("active");
  }
  
  /* creates timeOut for change of slides.
  Call's itself from inside of changePages() function
  */
  function createTimeout() {
    window.clearTimeout(changeTimeout);
    resetTimeoutAnimation();
    changeTimeout = setTimeout(function() {
      if (curPage >= numOfPages) {
        curPage = 1;
      } else {
        curPage++;
      }
      changePages();
    }, timeoutTime);
  };
  
  createTimeout();
  
  });