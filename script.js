const EMOTIONS =  ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"];
const SIZE= 100;
const video=document.getElementById('wcf');
const canvas =document.getElementById('overlay');


const MODEL_PATH="./public/models/otherModel/model.json";

let model,predictions;



async function renderPredictions(){
  predictions=await detectFaces(model);

  canvas.width=video.width;
  canvas.height=video.height;
  const context=canvas.getContext('2d');
  context.drawImage(video,0,0,canvas.width,canvas.height);

  let ctx=context;
  ctx.lineWidth = 4;


  for (let i = 0; i < predictions.length; i++) {
    const start = predictions[i].boundingBox.topLeft;
    const end = predictions[i].boundingBox.bottomRight;
    const size = [end[0] - start[0], end[1] - start[1]];

    // Render a rectangle over each detected face.
    ctx.rect(start[0], start[1], size[0], size[1]);


  
}

  
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


async function preprocessImg() {
    return tf.tidy(() => {
      // reads the image from the video stream and convert it to a tensor object
      const wcImg = tf.browser.fromPixels(video).toFloat();

      //resizes the image to to the model's input dimensions
      const resizedImg = tf.image.resizeBilinear(wcImg, [SIZE, SIZE], true);

      //normalizes the image to [-1,1], originally [0,225]
      const normalizedImg = resizedImg.toFloat().sub(tf.scalar(1)).div(tf.scalar(127));

      //const greyImg=normalizedImg.mean(2).expandDims(2);

      const batchedImg = normalizedImg.expandDims(0);
      
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
  setTimeout(renderPredictions , 300);

}

  
