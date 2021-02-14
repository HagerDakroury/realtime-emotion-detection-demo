
async function loadDetection(){
    // Load the model.
    return model = await blazeface.load();
  

}




async function detectFaces(model) {

    // Pass in an image or video to the model. The model returns an array of
    // bounding boxes, probabilities, and landmarks, one for each detected face.
  
    const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
    const predictions = await model.estimateFaces(document.querySelector('#wcf'), returnTensors);
    
    
    return predictions;

  }
  