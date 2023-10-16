export const dataURLtoFile = (dataurl: string, filename: string) => {
  var arr = dataurl.split(",");
  var mimeTypeMatch = arr[0].match(/:(.*?);/);
  if (mimeTypeMatch) {
    var mimeType = mimeTypeMatch[1];
    var decodedData = atob(arr[1]);
    var lengthOfDecodedData = decodedData.length;
    var u8array = new Uint8Array(lengthOfDecodedData);
    while (lengthOfDecodedData--) {
      u8array[lengthOfDecodedData] =
        decodedData.charCodeAt(lengthOfDecodedData);
    }
    return new File([u8array], filename, { type: mimeType });
  } else {
    throw new Error("Invalid data URL format");
  }
};
