
const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

  if (fileExt === "mp3" || fileExt === "wav") return "audio";
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

// https://res.cloudinary.com/dj5q966nb/image/upload/dpr_auto/w_200/v1710344436/fafceddc-2845-4ae7-a25a-632f01922b4d.png

// /dpr_auto/w_200
const ImageChange = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};


export {fileFormat, ImageChange}