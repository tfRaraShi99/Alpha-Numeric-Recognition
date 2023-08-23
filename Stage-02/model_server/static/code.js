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
			canvas_inst.lineCap='round'
            canvas_inst.lineJoin='round'
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

function send_to_server(event)
{
    canvas_inst=document.getElementById('canvas_id').getContext('2d');
    h=canvas_inst.getImageData(0,0,canvas_id.width,canvas_id.height,{colorSpace:'srgb'}).data;
    //console.log(h)
    send_inst=document.getElementById('output');
    //console.log('data send');
    //tf.tensor([1,2,3,4]).print();
    
    s_Data=tf.tensor(h);
    //s_Data.print();
    //g_Data=s_Data.reshape([500,500,4]);
    g_Data=s_Data.reshape([500,500,4]);
    //console.log(g_Data.shape);
    sl_Data=tf.slice(g_Data,[0,0,0],[500,500,3]);
    //console.log(sl_Data.shape);
    sl_Datanew=tf.mean(sl_Data,2,[500,500]);
    //console.log(sl_Datanew.shape);
    rl_Data=tf.image.resizeNearestNeighbor(sl_Datanew,[28,28],false);
    //rl_Data=tf.image.resizeBilinear(sl_Datanew,[28,28],false);
    
    console.log(rl_Data.shape);
    
    
    fetch('https://metal-gifts-serve-3-23-158-214.loca.lt/v1/models/lenet',{
        method:'GET',
        //body:h,
        headers:{
        'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data=>{
            console.log(data);
        //send_inst.textContent="the digit is " + data.digit;
    });
    
}

class PaintCanvas extends React.Component{
	render(){
		return e('div',null,toolbar,center(canvas()),center(send_dataN),center(output));
	}
}
root.render(e(PaintCanvas));


//root.render(center(toolbar));
//root.render(canvas_draw())

//console.log(palette);
//console.log(canvas());
//console.log(glob)
//console.log(display);

