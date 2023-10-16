export const shareFile = (file: File, title: any, text: any) => {
  // Check if the `navigator` and sharing options are available
  if (navigator.share) {
    navigator
      .share({
        files: [file],
        title,
        text,
      })
      .then(() => {
        console.log("Share was successful.");
      })
      .catch((error) => {
        console.log("Sharing failed", error);
      });
  } else {
    console.log("Your system doesn't support sharing files.");
  }
};
