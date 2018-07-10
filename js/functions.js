//判断某个点是否在三角形内

function sameSign(a,b){//位运算
    return (a^b) >= 0 //异或运算
}

function vector(a,b){//向量的定义：终点坐标-起点坐标
    return {
        x: b.x-a.x,
        y: b.y-a.y
    }
}

function vectorProduct(v1,v2){//向量的差乘计算
    return v1.x*v2.y - v2.x*v1.y
}

function isPointInTrangle(p,a,b,c){
    var pa = vector(p,a)
    var pb = vector(p,b)
    var pc = vector(p,c)

    //差乘结果
    var t1 = vectorProduct(pa,pb)
    var t2 = vectorProduct(pb,pc)
    var t3 = vectorProduct(pc,pa)
    return sameSign(t1,t2) && sameSign(t2,t3)
}

function needDelay(elem,leftCorner,currMousePos){
    var offset = elem.offset()
    var topLeft = {
        x: offset.left,
        y: offset.top
    }
    var bottomLeft = {
        x: offset.left,
        y: offset.top + elem.height()
    }
    return isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft)
}