/*!
 * jTableScroll v.1.4
 * http://mikeallisononline.com/
 *
 * Dependent on jquery
 * http://jquery.com/
 *
 * Copyright 2013 Mike Allison
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */

(function ($) {
    $.fn.jTableScroll = function (o) {
        o = $.extend({
            width: null,
            height: null,
            backgroundcolor: null,
            headerCss: null,
        }, o || {});

        //get scrollbar size             
        var dummy = $('<div>').css({ visibility: 'hidden', width: '50px', height:'50px', overflow: 'scroll' }).appendTo('body');
        var scrollbarpx = 50 - $('<div>').height(99).appendTo(dummy).outerWidth();
        dummy.remove();

        //IE8 browser test (because it's bad)
        var rv = -1;
        var ua = navigator.userAgent;
        var re = new RegExp("Trident\/([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
          rv = parseFloat(RegExp.$1);
        }
        var ie8 = (rv == 4);
        
        this.each(function () {
            var self = $(this);
            var parent = self.parent();
            
            if (!o.width)
                o.width = parent.width();
            if (!o.height)
                o.height = parent.height();

            //bypass if table size smaller than given dimesions
            if (self.width() <= o.width && self.height() <= o.height)
                return;
            
            var width = self.width();                        
            self.width(width); //reinforce table width so it doesn't change dynamically 
            
            //Create outer div
            var outerdiv = $(document.createElement('div'));
            outerdiv.css({ 'overflow': 'hidden' }).width(o.width).height(o.height);
            
            //Create header div
            var headerdiv = $(document.createElement('div'));
            headerdiv.css({ 'overflow': 'hidden', 'position': 'relative' }).width(o.width);
            if (o.headerCss)
              headerdiv.addClass(o.headerCss);

            //Create footer div
            var footerdiv = $(document.createElement('div'));
            footerdiv.css({ 'overflow': 'hidden', 'position': 'relative', 'background-color': o.backgroundcolor }).width(o.width);


            //Create header clone
            var cloneTable = self.clone();
            cloneTable.find('tbody').remove();
            cloneTable.find('tfoot').remove();                        
            
            //Create footer clone
            var cloneFoot = self.clone();
            cloneFoot.find('tbody').remove();
            cloneFoot.find('thead').remove();

            var headBgColor = null;            
            //Set header/footer column widths and click events
            self.find('thead').find('th').each(function(index, value) {
              var val = $(value);
              var tdwidth = val.width();
              if (headBgColor == null) {
                if (o.backgroundcolor == null)
                  headBgColor = val.bkgcolor();
                else
                  headBgColor = o.backgroundcolor;
              }
              if (headBgColor == "rgba(0, 0, 0, 0)" || headBgColor == "transparent")
                headBgColor = "#fff";                             

              val.css("width", tdwidth + 'px'); //reinforce width
              $(cloneTable.find('th')[index]).click(function() { val.click(); });
              $(cloneTable.find('th')[index]).width(tdwidth);
              $(cloneFoot.find('th')[index]).click(function () { val.click(); });
              $(cloneFoot.find('td')[index]).width(tdwidth);
            });
            
            cloneTable.css({ 'table-layout': 'fixed', 'background-color': headBgColor });
            cloneFoot.css({ 'table-layout': 'fixed', 'background-color': headBgColor });
            self.css({ 'table-layout': 'fixed' });

            //Create body div
            var bodydiv = $(document.createElement('div'));            

            //Add horizontal scroll event
            bodydiv.scroll(function () {
                headerdiv.scrollLeft(bodydiv.scrollLeft());
                footerdiv.scrollLeft(bodydiv.scrollLeft());
            });

            //Add to DOM
            headerdiv.append(cloneTable);
            footerdiv.append(cloneFoot);
            self.before(outerdiv);
            self.appendTo(bodydiv);
            outerdiv.append(headerdiv);
            outerdiv.append(bodydiv);
            outerdiv.append(footerdiv);                        
            
            //Adjust header and footer div width if vertical scrollbar present
            
            var combinedHeight = self.height() + headerdiv.height() + footerdiv.height();            
            if (combinedHeight >= o.height) {
                headerdiv.width(headerdiv.width() - scrollbarpx);
                footerdiv.width(footerdiv.width() - scrollbarpx);
            }
            //Set body height after other content added to parent
            var marginTop = parseFloat(bodydiv.css("margin-top"));
            marginTop = marginTop - headerdiv.height();
            var marginBottom = parseFloat(bodydiv.css("margin-bottom"));
            marginBottom = marginBottom - (footerdiv.height() + scrollbarpx);
            bodydiv.css({ 'overflow': 'auto', 'margin-top': marginTop + 'px', 'margin-bottom': marginBottom + 'px' }).width(o.width).height(o.height - (footerdiv.height() + scrollbarpx));

            if (ie8)
              self.find('thead').hide();
        });
    };
})(jQuery);


(function($) {
  // Get this browser's take on no fill
  // Must be appended else Chrome etc return 'initial'
  var $temp = $('<div style="background:none;display:none;"/>').appendTo('body');
  var transparent = $temp.css('backgroundColor');
  $temp.remove();

  jQuery.fn.bkgcolor = function( fallback ) {
    function test( $elem ) {
        if ( $elem.css('backgroundColor') == transparent ) {
          return !$elem.is('body') ? test( $elem.parent() ) : fallback || transparent ;
        } else {
          return $elem.css('backgroundColor');
        }
    }
    return test( $(this) );
};

})(jQuery);
