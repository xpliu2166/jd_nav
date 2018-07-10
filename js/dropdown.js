$(function(){
    var sub = $('#sub')
    var activeRow, activeMenu , timer
    var mouseInSub = false
    var mouseTrack = []
    sub.on('mouseenter',function(){
        mouseInSub = true
    }).on('mouseleave',function(){
        mouseInSub = false
    })
    var moveHandler = function(e){
        mouseTrack.push({
            x: e.pageX,
            y: e.pageY
        })
        if(mouseTrack.length > 3){
            mouseTrack.shift()
        }
    }
    $('#test').on('mouseenter',function(){
        sub.removeClass('none')
        $(document).bind('mousemove',moveHandler)
    }).on('mouseleave',function(){
        console.log('fire mouse leave')
        sub.addClass('none')
        if(activeRow){
            activeRow.removeClass('active')
            activeRow = null
        }
        if(activeMenu){
            activeMenu.addClass('none')
            activeMenu = null
        }
        $(document).unbind('mousemove',moveHandler)
    }).on('mouseenter', 'li', function(e){
        var $this = $(this)
        if(!activeRow){
            activeRow = $this
            activeMenu = $('#' + activeRow.data('id'))
            activeRow.addClass('active')
            activeMenu.removeClass('none')
            return
        }
        if(timer){
            clearTimeout(timer)
        }
        var currMousePos = mouseTrack[mouseTrack.length-1] //鼠标当前坐标P
        var leftCorner = mouseTrack[mouseTrack.length-2] //鼠标上一次的坐标A

        var delay = needDelay(sub, leftCorner, currMousePos)

        if(delay){
            timer = setTimeout(function(){//延时处理
                if(mouseInSub){//判断是否在目标元素内
                    return
                }
                activeRow.removeClass('active')
                activeMenu.addClass('none')
                activeRow = $this
                activeRow.addClass('active')
                activeMenu = $('#' + activeRow.data('id'))
                activeMenu.removeClass('none')
                timer = null
            },300)
        }else{
            var prevActiveRow = activeRow
            var prevActiveMenu = activeMenu

            activeRow = $this
            activeMenu = $('#' + activeRow.data('id'))

            prevActiveRow.removeClass('active')
            prevActiveMenu.addClass('none')

            activeRow.addClass('active')
            activeMenu.removeClass('none')
        }
    })
})