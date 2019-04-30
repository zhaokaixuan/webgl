/**
 * create by zkk on 2019/4/30
 */

//顶点着色器程序
var VSHADER_SOURCE = `attribute vec4 a_Position;
 void main(){
     gl_Position = a_Position;//设置坐标
 }`

//片元着色器程序
var FSHADER_SOURCE = `precision mediump float;
uniform vec4 u_FragColor;  //uniform变量
void main(){
     gl_FragColor = vec4(0.0,1.0,0.0,1.0);  //设置颜色
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
    //设置顶点位置
    var n = initVertexBuffers(gl);
    if(n<0){
        console.log('Failed to set the positions of the vertices');
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
    gl.drawArrays(gl.TRIANGLES_STRIP, 0, n);

    /*
     //将顶点位置传输给attribute变量
     gl.vertexAttrib3f(a_Positin,0.0,0.0,0.0);
    
     gl.vertexAttrib1f(a_PointSize,5.0)
    
    
    */
   
}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        -0.5,0.5,0.5,0.5,-0.5,-0.5,0.5,-0.5
    ]);
    var n = 4; //点的个数

    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();

    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
     //获取attribute变量的存储位置
     var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
     //将缓冲区对象分配给a_Position变量
     gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

     //连接a_Position变量与分配给它的缓冲区对象
     gl.enableVertexAttribArray(a_Position);
     return n;

}