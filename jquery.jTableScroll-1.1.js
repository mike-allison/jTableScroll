/*!
 * jTableScroll v.1.1
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
        }, o || {});
        if (!o.backgroundcolor)
            o.backgroundcolor = "#fff";

        //get scrollbar size             
        var dummy = $('<div>').css({ visibility: 'hidden', width: '50px', height:'50px', overflow: 'scroll' }).appendTo('body');
        var scrollbarpx = 50 - $('<div>').height(99).appendTo(dummy).outerWidth();
        dummy.remove();

        return this.each(function () {
            var self = $(this);
            var parent = self.parent();
            
            if (!o.width)
                o.width = parent.width();
            if (!o.height)
                o.height = parent.height();
            
            
            
            var width = self.width();
            self.width(width); //reinforce table width so it doesn't change dynamically 
            
            //Create outer div
            var outerdiv = $(document.createElement('div'));
            outerdiv.css({ 'overflow': 'hidden' }).width(o.width).height(o.height);
            
            //Create header div
            var headerdiv = $(document.createElement('div'));
            headerdiv.css({ 'overflow': 'hidden' , 'position': 'relative' }).width(o.width);

            //Create footer div
            var footerdiv = $(document.createElement('div'));
            footerdiv.css({ 'overflow': 'hidden', 'position': 'relative', 'background-color': o.backgroundcolor }).width(o.width);


            //Create header clone
            var cloneTable = self.clone();
            cloneTable.find('tbody').remove();
            cloneTable.find('tfoot').remove();
            cloneTable.width(width);            
            cloneTable.css({ 'background-color': o.backgroundcolor });                                    

            //Create footer clone
            var cloneFoot = self.clone();
            cloneFoot.find('tbody').remove();
            cloneFoot.find('thead').remove();
            cloneFoot.width(width);
            cloneFoot.css({ 'background-color': o.backgroundcolor });
            //self.find('tfoot').hide(); //hide original footer

            //Set header/footer column widths
            self.find('thead').find('th').each(function (index, value) {
                var val = $(value);
                var tdwidth = val.width();
                val.css("width", tdwidth + 'px'); //reinforce width
                $(cloneTable.find('th')[index]).width(tdwidth);
                $(cloneFoot.find('td')[index]).width(tdwidth);
            });

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
        });
    };
})(jQuery);
