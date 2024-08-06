import { Friend } from "@/Types/User";

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
const ImageChange = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};

 const truncateStatus = (status: string, maxWords: number) => {
    const words = status.split(' ');
    if (words.length <= maxWords) return status;
    return words.slice(0, maxWords).join(' ') + '...';
  };
  const getFirstThreeMemberAvatars = (members: Friend[])  => {
    return members.slice(0, 3).map(member => member.avatar || "");
  }
  const getOrSaveFromStorage = ({ key, value, get }:{key:string, value:() => void, get:string}) => {
    if (get)
      return localStorage.getItem(key) ?? null;
    else localStorage.setItem(key, JSON.stringify(value));
  };

export {fileFormat, ImageChange, truncateStatus,getFirstThreeMemberAvatars,getOrSaveFromStorage}