const EMOTIONS =  ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"];
const SIZE= 127;
const video=document.getElementById('wcf');

let model;

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


function preprocessImg() {
    return tf.tidy(() => {
      // reads the image from the video stream and convert it to a tensor object
      const wcImg = tf.browser.fromPixels(video);

      //resizes the image to to the model's input dimensions
      const resizedImg = tf.image.resizeBilinear(wcImg, [SIZE, SIZE], true);

      //normalizes the image to [-1,1], originally [0,225]
      const normalizedImg = resizedImg.toFloat().sub(tf.scalar(1)).div(tf.scalar(127));

      return normalizedImg;

    });
  }

setupWCF();
video.addEventListener('loadeddata',function(){
    console.log(preprocessImg());

});
