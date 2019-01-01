(function($) {
    $.fn.clocker = function(params={}) {
      var timer;
      var elem;
      var self = this;
      var defaults = {
        "refresh_rate": 500,
        "output_format": "%m/%d/%y (%h:%i:%s)",
        "months_terms": []
      };
      params = $.extend({}, defaults, params);
      var expected = Date.now() + params.refresh_rate;
  
      var startTimer = function() {
          var dt = Date.now() - expected; // the drift (positive for overshooting)
          if (dt > params.refresh_rate) {
              // something really bad happened. Maybe the browser (tab) was inactive?
              // possibly special handling to avoid futile "catch up" run
          }
  
          var times = getTime();
          var render = formatOutput(times);
  
          self.each(function() {
            elem = $(this);
  
            $(elem).html(render);
          });
  
          expected += params.refresh_rate;
          setTimeout(startTimer, Math.max(0, params.refresh_rate - dt)); // take into account drift
      }
  
      function checkTime(i) {
        if (i < 10)
          i = "0" + i;  // add zero in front of numbers < 10
        return i;
      }
  
      function getTime()
      {
        var today = new Date();
        return {
          h: today.getHours(),
          i: today.getMinutes(),
          s: today.getSeconds(),
          d: today.getDate(),
          m: today.getMonth() + 1, //January is 0!
          y: today.getFullYear()
        }
      }
  
      function formatOutput(times)
      {
        var render = params.output_format;
  
        if (params.months_terms[times.m - 1])
          times.m = params.months_terms[times.m - 1];
  
        for (idx in times)
            render = render.replace("%" + idx, checkTime(times[idx]));
  
        return render;
      }
  
      setTimeout(startTimer, params.refresh_rate);
  
      return this;
    };
  })(jQuery);