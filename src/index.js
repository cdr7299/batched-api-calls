// huge array, api call for each record, and log the response
// [1,2,3,4....]

const CHUNK = 1000;
const result = [];
const callApi = (data) => {
  let isCurrentBatchDone = true;
  let startIndex = 0;

  while (isCurrentBatchDone && startIndex < data.length) {
    const dataSlice = data.slice(startIndex, startIndex + CHUNK);
    startIndex += CHUNK;
    const currentBatchResponse = []; //

    const generatePromises = (dataSlice) => {
      isCurrentBatchDone = false;
      const promises = [];
      dataSlice.forEach((item, index) => {
        // for
        const p = new Promise(fetch(dataSlice[index]));
        promises.push(p);
      });
      return promises;
    };

    const sliceResponse = Promise.all(generatePromises(dataSlice)).then(
      (result) => {
        // log results
        currentBatchResponse.concat(result);
        result.concat(currentBatchResponse);
        isCurrentBatchDone = true;
        callSamefunc(startIndex);
      }
    );

    // while(!isCurrentBatchDone){
    //   // busy-wait
    // }
  }
};
