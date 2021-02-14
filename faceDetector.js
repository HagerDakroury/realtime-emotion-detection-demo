
async function loadDetection(){
    // Load the model.
    return model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
    

}




async function detectFaces(model) {

    // Pass in an image or video to the model. The model returns an array of
    // bounding boxes, probabilities, and landmarks, one for each detected face.
  
    const predictions = await model.estimateFaces({
      input: document.getElementById("wcf")
    });
    console.log(predictions);
      
    
    return predictions;

  }
  