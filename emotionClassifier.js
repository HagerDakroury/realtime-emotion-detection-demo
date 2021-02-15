
const SIZE= 64;
const MODEL_PATH="./public/models/emotion/model.json";
let emotionModel;


async function loadEmotion(){
    let model= await tf.loadLayersModel(MODEL_PATH);
    return model;

}

async function predictEmotion(model,img){    

let image=await preprocessImg(img);

return model.predict(image);

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



