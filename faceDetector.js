const DETECT_MODEL_PATH='./public/models/tiny_face_detector/tiny_face_detector_model-weights_manifest.json';


async function loadDetection(){
    // Load the model.

    return await faceapi.loadTinyFaceDetectorModel(DETECT_MODEL_PATH);

    /*return model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);*/
    

}




async function detectFaces(model) {

  const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 256 });

  const predictions = await faceapi.detectAllFaces(document.getElementById('wcf'),options);



    // Pass in an image or video to the model. The model returns an array of
    // bounding boxes, probabilities, and landmarks, one for each detected face.
  
    /*const predictions = await model.estimateFaces({
      input: document.getElementById("wcf")
    });
    console.log(predictions);*/
      
    
    return predictions;

  }
  