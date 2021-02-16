const video=document.getElementById('wcf');
const canvas=document.getElementById('overlay-canvas');

let model,emodel,predictions;

const displaySize = { width: video.width, height: video.height };



/*needs cleaning up and comments */
async function renderPredictions(){


  predictions=await detectFaces(model);

  const resizedDetections = faceapi.resizeResults(predictions, displaySize);


  let eImg;

  if(predictions.length){
  
    // Render a rectangle over each detected face.
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);

    eImg=canvas.getContext('2d').getImageData(predictions[0].box._x, predictions[0].box._y, predictions[0].box._width, predictions[0].box._height);


    const dummyCanvas=document.createElement("canvas");
    dummyCanvas.width=video.width;
    dummyCanvas.height=video.height;

    dummyCanvas.getContext('2d').drawImage(video,0, 0, canvas.width,canvas.height);

    eImg=dummyCanvas.getContext('2d').getImageData(resizedDetections[0].box._x, resizedDetections[0].box._y, resizedDetections[0].box._width, resizedDetections[0].box._height);

    const results=await predictEmotion(emodel,eImg);

    updateChart(results);

  }

  setTimeout(renderPredictions , 50);

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
  faceapi.matchDimensions(canvas, displaySize);
}









setupWCF();

video.onplay= async function (){
  model= await loadDetection();
  emodel=await loadEmotion();
  setupCanvas();

  setTimeout(renderPredictions , 100);

}