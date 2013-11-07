/*!
 * jTableScroll v.1
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
            scrollbarpx: null,
            backgroundcolor: null,
        }, o || {});
        return this.each(function () {
            var parent = $(this).parent();                        
            if (!o.width)
                o.width = parent.width();
            if (!o.height)
                o.height = parent.height();
            if (!o.scrollbarpx)
                o.scrollbarpx = 17;
            if (!o.backgroundcolor)
                o.backgroundcolor = "#fff";
            
            var width = $(this).width();
            $(this).width(width); //reinforce table width so it doesn't change dynamically 
            
            //Create outer div
            var outerdiv = document.createElement('div');
            $(outerdiv).css({ 'overflow': 'hidden' }).width(o.width).height(o.height);
            
            //Create header div
            var headerdiv = document.createElement('div');
            $(headerdiv).css({ 'overflow': 'hidden' , 'position': 'relative' }).width(o.width);

            //Create footer div
            var footerdiv = document.createElement('div');
            $(footerdiv).css({ 'overflow': 'hidden' }).width(o.width);


            //Create header clone
            var cloneTable = $(this).clone();
            cloneTable.find('tbody').remove();
            cloneTable.find('tfoot').remove();
            cloneTable.width(width);

            $(this).find('thead').find('th').each(function (index, value) {
                var tdwidth = $(value).width();
                $(value).css("width", tdwidth+'px'); //reinforce width
                $(cloneTable.find('th')[index]).width(tdwidth);
                
            });
            cloneTable.css({ 'background-color': o.backgroundcolor });
            $(headerdiv).append(cloneTable);
                        

            //Create footer clone
            var cloneFoot = $(this).clone();
            cloneFoot.find('tbody').remove();
            cloneFoot.find('thead').remove();
            cloneFoot.width(width);
            
            cloneTable.find('thead').find('th').each(function (index, value) {
                var tdwidth = $(value).width();                
                $(cloneFoot.find('td')[index]).width(tdwidth);
            });
            $(footerdiv).append(cloneFoot);
            $(this).find('tfoot').hide();

            //Create body div
            var bodydiv = document.createElement('div');            

            //Add horizontal scroll event
            $(bodydiv).scroll(function () {
                $(headerdiv).scrollLeft($(bodydiv).scrollLeft());
                $(footerdiv).scrollLeft($(bodydiv).scrollLeft());
            });

            //Add to DOM                    
            $(this).before(outerdiv);
            $(this).appendTo(bodydiv);
            $(outerdiv).append(headerdiv);
            $(outerdiv).append(bodydiv);
            $(outerdiv).append(footerdiv);                        
            
            //Add vertical scrollbar div if needed after load
            
            var combinedHeight = $(this).height() + $(headerdiv).height() + $(footerdiv).height();            
            if (combinedHeight >= o.height) {
                $(headerdiv).width($(headerdiv).width() - o.scrollbarpx);
                $(footerdiv).width($(footerdiv).width() - o.scrollbarpx);
            }
            //Set body height after other content added to parent
            var marginTop = parseFloat($(bodydiv).css("margin-top"));
            marginTop = marginTop - $(headerdiv).height();
            $(bodydiv).css({ 'overflow': 'auto', "margin-top": marginTop + 'px' }).width(o.width).height(o.height - ($(footerdiv).height() + o.scrollbarpx));            
        });
    };
})(jQuery);
