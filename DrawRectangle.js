/**
 * create by zkk on 2019/4/30
 */

//顶点着色器程序
var VSHADER_SOURCE = `attribute vec4 a_Position;
 attribute float a_PointSize;
 void main(){
     gl_Position = a_Position;//设置坐标
     gl_PointSize = 10.0; //设置尺寸
 }`

//片元着色器程序
var FSHADER_SOURCE = `precision mediump float;
uniform vec4 u_FragColor;  //uniform变量
void main(){
     gl_FragColor = u_FragColor;  //设置颜色
 }`;


function main() {
    var canvas = document.getElementById('webgl');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    //获取webgl上下文
    var gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    //初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Faild to initialize shaders.')
    }

    //获取attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    //var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    //获取u_FragColor变量的存储位置
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    //设置canvas背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制一个点
    //gl.drawArrays(gl.POINTS, 0, 1);

    /*
     //将顶点位置传输给attribute变量
     gl.vertexAttrib3f(a_Positin,0.0,0.0,0.0);
    
     gl.vertexAttrib1f(a_PointSize,5.0)
    
    
    */
    //注册鼠标点击事件响应函数
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    }
}

var g_points = []; //鼠标点击位置数组
var g_colors = []; //存储点颜色的数组
function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX; //鼠标点击处的x坐标
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
    //将坐标存储到g_points数组中
    g_points.push([x,y]);
    //将点的颜色存储到g_colors数组中
    if(x>=0.0 && y>=0.0){
        g_colors.push([1.0,0.0,0.0,1.0]);
    }else if(x<0.0 && y<0.0){
        g_colors.push([0.0,1.0,0.0,1.0]);
    }else{
        g_colors.push([1.0,1.0,1.0,1.0]);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;
    for (var i = 0; i < len; i ++) {
        var rgba = g_colors[i];
        gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
        gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3]);
        //绘制点
        gl.drawArrays(gl.POINTS, 0, 1)
    }
}