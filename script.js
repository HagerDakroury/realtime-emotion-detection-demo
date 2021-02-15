const EMOTIONS =  ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"];
const SIZE= 64;
const video=document.getElementById('wcf');
const canvas =document.getElementById('overlay');


const MODEL_PATH="./public/models/emotion/model.json";

let model,emodel,predictions;



async function renderPredictions(){
  predictions=await detectFaces(model);


  canvas.width=video.width;
  canvas.height=video.height;
  const context=canvas.getContext('2d');
  context.drawImage(video,0,0,canvas.width,canvas.height);

  let ctx=context;
  ctx.lineWidth = 4;
  let eImg,img_x,img_y;

  for (let i = 0; i < predictions.length; i++) {
     img_x = predictions[i].box._x;
    
     img_y = predictions[i].box._y;
    let img_h = predictions[i].box._height;
    let img_w = predictions[i].box._width;

    // Render a rectangle over each detected face.
    ctx.rect(img_x, img_y, img_w, img_h);

    eImg=ctx.getImageData(img_x, img_y, img_w, img_h);

  
}

let image=await preprocessImg(eImg);


const eprediction=emodel.predict(image);


let index=eprediction.argMax(1).dataSync()[0];
let label =EMOTIONS[index];
ctx.fillText(label, img_x,img_y);

  
  ctx.strokeStyle = "red";    
  ctx.stroke();


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



/**
 * captures an image from the webcam feed and preprocesses it
 * @returns  A tensor object representing the image and ready to pass to model.predict()
 */


async function preprocessImg(img) {

    return tf.tidy(() => {
      // reads the image from the video stream and convert it to a tensor object
      const wcImg = tf.browser.fromPixels(img).toFloat();

      //resizes the image to to the model's input dimensions
      const resizedImg = wcImg.resizeBilinear( [SIZE, SIZE]);

      //normalizes the image to [-1,1], originally [0,225]
      const normalizedImg = resizedImg.toFloat().sub(tf.scalar(1)).div(tf.scalar(127));

      const greyImg=normalizedImg.mean(2).expandDims(2);

      const batchedImg = greyImg.expandDims(0);


      return batchedImg;

    });
  }







setupWCF();


  /*video.addEventListener('loadeddata',async function(){

    model= await loadDetection();
    /*model=await tf.loadLayersModel(MODEL_PATH);
    const img=await preprocessImg();
    const prediction=model.predict(img);
    console.log(prediction.argMax(1).dataSync()[0]);*/


    /*while(1){
      
        //predictions = await detectFaces();
        //console.log(predictions);

   }*/

//});

video.onplay= async function (){
  model= await loadDetection();
  emodel=await tf.loadLayersModel(MODEL_PATH);

  setTimeout(renderPredictions , 300);

}

  
