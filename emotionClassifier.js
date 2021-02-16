
const SIZE= 64;
const MODEL_PATH="./public/models/emotion/model.json";
let emotionModel;


/**
 *  loads a pre-converted model using tensorflowjs
 */
async function loadEmotion(){
    let model= await tf.loadLayersModel(MODEL_PATH);
    return model;

}

/**
 *  predicts emotions from an image of a detected face
 * @param model A .json model loaded with tf.loadLayersModel()
 * @param img A pre-proccessed tensor object matching the model's input
 * @returns An array of predictions
 */
async function predictEmotion(model,img){    

let image=await preprocessImg(img);

return model.predict(image);

}

/**
 *  preprocesses an image to match the model's input
 * @param img An image, a video steam or an image data object
 * @returns  A tensor object representing the image and ready to pass to model.predict()
 */


async function preprocessImg(img) {

    return tf.tidy(() => {
      //reads the image data and converts it to a tensor object
      const wcImg = tf.browser.fromPixels(img).toFloat();

      //resizes the image to to the model's input dimensions
      const resizedImg = wcImg.resizeBilinear( [SIZE, SIZE]);

      //normalizes the image to [-1,1], originally [0,225]
      const normalizedImg = resizedImg.toFloat().sub(tf.scalar(1)).div(tf.scalar(127));

      //converts from rgb to greyscale
      const greyImg=normalizedImg.mean(2).expandDims(2);

      //expands the first dimension to match the model's input
      const batchedImg = greyImg.expandDims(0);


      return batchedImg;

    });
  }



