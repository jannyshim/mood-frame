"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ImagePreview from "../components/ImageUpload";
import MusicPlayer from "../components/MusicPlayer";
import { fonts } from "../utils/fonts";

const InstaFrame = () => {
  const [title, setTitle] = useState("제목");
  const [subtitle, setSubtitle] = useState("소제목");
  const [endTime, setEndTime] = useState("02:37");
  const [imageColor, setImageColor] = useState<string>("");
  const [imageFile, setImageFile] = useState("");
  const [fontStyle, setFontStyle] = useState("ChosunNm");

  let textFont = fonts[fontStyle];

  const router = useRouter();

  const handleCommentClick = () => {
    // comment-frame 페이지로 이동하고 이미지 색상과 이미지 URL을 매개변수로 전달
    router.push(`/insta-frame/comment?imageColor=${imageColor}`);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(e.target.value);
  };
  const handleReset = () => {
    setTitle("제목");
    setSubtitle("소제목");
    setEndTime("02:37");
  };
  const fontClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontStyle(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-between items-center mt-[10px] gap-3">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
          required
          className="p-2 rounded-md border-solid"
        />
        <input
          type="text"
          placeholder="소제목"
          value={subtitle}
          onChange={handleSubtitleChange}
          required
          className="p-2 rounded-md border-solid"
        />
        <input
          type="text"
          placeholder="시간(예시 02:37)"
          value={endTime}
          onChange={handleTimeChange}
          required
          className="p-2 rounded-md border-solid border-black"
        />
        <select
          onChange={fontClick}
          className="p-2 rounded-md border-solid border-black"
        >
          <option value="ChosunNm">조선일보명조</option>
          <option value="NotoSansKR">노토산스</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="bg-blue-500 text-white p-1 ml-1 rounded-md w-20"
          >
            다시 쓰기
          </button>
          <button
            onClick={handleCommentClick}
            className="bg-blue-500 text-white p-1 ml-1 rounded-md w-20"
          >
            댓글프레임
          </button>
        </div>
      </div>
      <div
        className={
          "flex flex-col justify-center items-center w-3/5 h-3/5 pb-4 mt-4 mb-4"
        }
        style={{
          backgroundColor: imageColor ? imageColor : "#959591",
        }}
      >
        <div>
          <ImagePreview
            imageColor={imageColor}
            setImageColor={setImageColor}
            imageFile={imageFile}
            setImageFile={setImageFile}
          />
          <h1 className={`text-3xl font-bold mt-5 text-slate-50 ${textFont}`}>
            {title}
          </h1>
          <p className={`text-lg mb-3 text-slate-50 ${textFont}`}>{subtitle}</p>
        </div>
        <div className={`flex flex-row w-4/5 ${textFont}`}>
          <MusicPlayer endTime={endTime} />
        </div>
      </div>
    </div>
  );
};

export default InstaFrame;
