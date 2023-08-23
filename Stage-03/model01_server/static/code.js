// console.log("hello world");
// let v=0;
// for(let i = 0; i < 10; i++)
// {
// 	v++;
// }
// console.log("updated value of v is: ",v);

//different techniques to provide functionality
//normal technique
//function
//ES6 class
	
const e=React.createElement;
const root=ReactDOM.createRoot(document.getElementById('my_app'));
let h=1;


const a=e('p',
	{style:{
		textAlign:"center",
		fontSize:"30px",
		color:'#800000'
	}},
	'Greetings From React');


function center(element){
	h++;
	return e('h'+String.fromCharCode('0'.charCodeAt(0)+h),
		{style:
			{
			textAlign:"center",
			}},
		element);
}



//can explore more objects in the console select object to provide different functionality


const palette=e('label',null,'  COLOR',e('input',{type:"color", onChange:setcolor}));

					function setcolor(event){
						canvas_inst=document.getElementById('canvas_id').getContext('2d');
						canvas_inst.fillStyle=event.target.value;
						canvas_inst.strokeStyle=event.target.value;

					// 	canvas_inst.style.background=event.target.value;
					// 	console.log(canvas_inst);
				//console.log('colorset');
					}

					function colorchange(event){
				//console.log('colorchanged');
					}
const brush_wid=e('label',null,'  BRUSH',e('input',{type:"range",onChange:brushwid, min:"20",max:"40"}));
					function brushwid(event){
						canvas_inst=canvas_id.getContext('2d');
						canvas_inst.lineWidth=event.target.value;
						//console.log(event);
					}

//const dis_button=e('label',null,'DRAWING',e(type:'text',onMouseOver:,onMouseOut:))


function canvas(){
	const canvas_obj=e('canvas',{
		id:"canvas_id",
		width:"500",
		height:"500",
		onMouseMove:canvas_draw,
		onDoubleClick:toggle_draw,
		style:
		{
			background:"black",
			border:"5px solid green",
		}	
	});
	return canvas_obj;
	
}

let draw_mode=0;

const display=e('button',{id:'text',style:{
		fontSize:"20px",
		color:'black',
        width:"100px",
	}},'Draw  ');

function toggle_draw(event){
	let canvas_inst=document.getElementById('canvas_id').getContext('2d');
	draw_mode=1-draw_mode;
	let draw_label=document.getElementById('text');
		if(draw_mode==1){
			canvas_inst.beginPath();
			canvas_inst.linecap='round'
			draw_label.textContent="Drawing";
		}
		else{
			draw_label.textContent="Draw";
			canvas_inst.closePath();

		}
}

function canvas_draw(event){
	//console.log('moving',event.nativeEvent.screenX,event.nativeEvent.screenY);
	canvas_inst=event.target.getContext('2d');
	//console.log(event.nativeEvent.offsetX,event.nativeEvent.offsetY);
	//console.log(event);
	if(draw_mode){
		//canvas_inst.fillText('hello',event.nativeEvent.offsetX,event.nativeEvent.offsetY);
		//canvas_inst.strokeStyle(event.target.value);
		//canvas_inst.lineWidth(event.target.value);
		canvas_inst.lineTo(event.nativeEvent.offsetX,event.nativeEvent.offsetY);
		canvas_inst.stroke();

	}
}

const clear=e('button',{id:'text2',
	onClick:clear_draw,
	style:{
	fontSize:"20px",
	color:'black',
    
	}},'  Clear  '
);
function clear_draw(event){
		canvas_inst=canvas_id.getContext('2d');
		canvas_inst.clearRect(0,0,canvas_id.width,canvas_id.height);
		canvas_inst.closePath();

		draw_mode=0;
		let draw_label=document.getElementById('text');
		draw_label.textContent='Draw';
		
}

// const serve=e('button',{id:'text3',
// 	onClick:send_data,
// 	style:{
// 	fontSize:"20px",
// 	color:'black'
// 	}},'  Serve  '
// );

// function send_data(event){
// 	canvas_inst=canvas_id.getContext('2d');
// 	console.log(canvas_inst.getImageData(0,0,canvas_id.width,canvas_id.height));
// 	let imagedata=canvas_inst.getImageData(0,0,canvas_id.width,canvas_id.height).data;
// 	console.log(imagedata);
// }

const toolbar=e('div',{
	style:{
		font_family:"lobster,cursive",
		textAlign:"Center",
		backgroundColor:"#6BC1EE",
		border:"3px solid blue",
		width:"400px",
        height:"60px",
        padding:"20px",
		margin:'auto',
		wordSpacing:"20px",
	}},
	palette,
	brush_wid,
	clear,
    display,
	);


// const send_dataN=e('form',{id:'send_dataN',role:'form',method:"POST",action:'/'},
// 					e('input',{type:'text',name:'image'}),
// 					e('input',{type:'submit', onClick:send_to_server})
// 					);

// function send_to_server(event){
// 	//event.preventDefault();
// 	canvas_inst=canvas_id.getContext('2d');
// 	h=canvas_inst.getImageData(0,0,canvas_id.width,canvas_id.height,{colorSpace:'srgb'}).data.toString();
// 	form_inst=document.getElementById('send_dataN');
// 	form_inst.image.value = h;


// }
const send_dataN=e('button',{id:'send_dataN',onClick:send_to_server},'predict');

const output=e('font',{id:'output',size:"50",color:"Red"},'the digit is 0');
const output2=e('font',{id:'output2',size:"40",color:"Red"},'the percentage of accuracy is 0 %');

const drag=e('button',{id:'model',onClick:model_choose,
                        style:{
                            fontsize:"30px",
                            color:'black',
                            width:'100px',
                        }},'lenet5');
let v=0;
let x='lenet5';
function model_choose(event){
    v=1-v;
    let drag_label=document.getElementById('model');
    //let canvas_inst=document.getElementById('canvas_id').getContext('2d');
    if(v==1){
        x='lenetW5';
        drag_label.textContent="lenetW5";
        //canvas_inst.style.backgroundColor= "white";

    }
    else{
        x='lenet5';
        drag_label.textContent="lenet5";

    }
    
}

function send_to_server(event)
{   
    canvas_inst=document.getElementById('canvas_id').getContext('2d');
    h=canvas_inst.getImageData(0,0,canvas_id.width,canvas_id.height,{colorSpace:'srgb'}).data;
    //console.log(h)
    send_inst=document.getElementById('output');
    send_inst2=document.getElementById('output2');

    s_Data=tf.tensor(h);
    //s_Data.print();
    //console.log(s_Data.shape)
    g_Data=s_Data.reshape([500,500,4]);

    //g_Data=s_Data.reshape([500,500,4]);
    //console.log(g_Data.shape);
    sl_Data=tf.slice(g_Data,[0,0,0],[500,500,3]);
    //console.log(sl_Data.shape);
    sl_Datanew=tf.mean(sl_Data,2,[500,500]);
    //console.log(sl_Datanew.shape);
    rl_Data=tf.image.resizeNearestNeighbor(sl_Datanew,[28,28],false);
    a_Data=tf.range(0,28,1)
    //console.log(a_Data.shape)

    //rl_Data=tf.image.resizeBilinear(sl_Datanew,[28,28],false);
    el_Data=tf.expandDims(rl_Data,0)
    //console.log(el_Data)
    js_Data=el_Data.arraySync();

    obj={"instances":js_Data};
    obj=JSON.stringify(obj);
    //console.log(obj);
    fetch('https://trishnatfx01.loca.lt/v1/models/'+x+':predict',{
        method:'POST',
        body:obj,
        headers:{
        'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data=>{
            console.log(data);
            res=tf.argMax(data.predictions,1);
            res.print();
            res2=tf.max(data.predictions,1);
            res2=res2.mul(100);
            res2.print();

        send_inst.textContent="the digit is " + res.arraySync()[0];
        send_inst2.textContent="the digit percentage is " + res2.arraySync()[0].toFixed(3);
    });
    
}

class PaintCanvas extends React.Component{
	render(){
		return e('div',null,toolbar,center(canvas()),center(send_dataN),center(drag),center(output),center(output2));
	}
}
root.render(e(PaintCanvas));


//root.render(center(toolbar));
//root.render(canvas_draw())

//console.log(palette);
//console.log(canvas());
//console.log(glob)
//console.log(display);

