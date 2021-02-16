const DETECT_MODEL_PATH='./public/models/tiny_face_detector/tiny_face_detector_model-weights_manifest.json';


/**loads the the tinyFaceDetector model using faceapi.js */
async function loadDetection(){

    return await faceapi.loadTinyFaceDetectorModel(DETECT_MODEL_PATH);

    

}



/**
 *  detects faces from a video stream using a pre-loaded tinyFaceDetector model
 * @returns An array of predictions
 */
async function detectFaces() {

  const options = new faceapi.TinyFaceDetectorOptions();

  const predictions = await faceapi.detectAllFaces(document.getElementById('wcf'),options);

  return predictions;

  }
  