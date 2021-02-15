const EMOTIONS =  ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"];
const video=document.getElementById('wcf');
const canvas =document.getElementById('overlay');



let model,emodel,predictions,ctx;





async function renderPredictions(){

  setupCanvas();

  predictions=await detectFaces(model);


  ctx.lineWidth = 4;
  let eImg,img_x,img_y;

  if(predictions.length){
  for (let i = 0; i < predictions.length; i++) {
     img_x = predictions[i].box._x;
    
     img_y = predictions[i].box._y;
    let img_h = predictions[i].box._height;
    let img_w = predictions[i].box._width;

    // Render a rectangle over each detected face.
    ctx.rect(img_x, img_y, img_w, img_h);

    eImg=ctx.getImageData(img_x, img_y, img_w, img_h);

  
}

const results=await predictEmotion(emodel,eImg);


let index=results.argMax(1).dataSync()[0];
let label =EMOTIONS[index];
ctx.fillText(label, img_x,img_y);

  
  ctx.strokeStyle = "red";    
  ctx.stroke();
}


  setTimeout(renderPredictions , 100);

}


async function setupWCF (){

    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {
        video.srcObject=stream;
        video.onloadedmetadata=function(e){
            video.play();
        }
      
    })
    .catch(err => {
      console.log(err);
    });
}


 function setupCanvas (){
  canvas.width=video.width;
  canvas.height=video.height;
  const context=canvas.getContext('2d');
  context.drawImage(video,0,0,canvas.width,canvas.height);

  ctx=context;

}









setupWCF();



video.onplay= async function (){
  model= await loadDetection();
  emodel=await loadEmotion();

  setTimeout(renderPredictions , 300);

}

  
