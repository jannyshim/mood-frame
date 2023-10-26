"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import ImageUpload from "../components/ImageUpload";
import MusicPlayer from "../components/MusicPlayer";
import { fonts } from "../utils/fonts";
import html2canvas from "html2canvas";
import saveAs from "file-saver";

const InstaFrame = () => {
  const [title, setTitle] = useState("제목");
  const [subtitle, setSubtitle] = useState("소제목");
  const [endTime, setEndTime] = useState("02:37");
  const [imageColor, setImageColor] = useState<string>("");
  const [imageFileSrc, setImageFileSrc] = useState("/catpic.jpeg");
  const [fontStyle, setFontStyle] = useState("ChosunNm");
  const [imageStyle, setImageStyle] = useState("");

  let textFont = fonts[fontStyle];

  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);

  const handleCommentClick = () => {
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
  const handleImage = (style: any) => {
    setImageStyle(style);
  };

  const fontClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontStyle(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const handleCaptureAndDownload = async () => {
    if (!divRef.current) return;

    const div = divRef.current;

    html2canvas(div, { allowTaint: true }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "insta-frame.png");
        }
      });
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mb-3">
      <ImageUpload
        imageColor={imageColor}
        setImageColor={setImageColor}
        imageFile={imageFileSrc}
        setImageFile={setImageFileSrc}
      />
      <div className="flex flex-col justify-between items-center mt-3 gap-3">
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
          <option value="JeonjuCraftGoR">전주공예고딕</option>
          <option value="BookkMyungjo">부크크명조</option>
        </select>
        <div>
          <button
            onClick={() => handleImage("scale-[1.8]")}
            className="bg-blue-300 text-white p-1 ml-1 rounded-md"
          >
            사진확대
          </button>
          <button
            onClick={() => handleImage("scale-100")}
            className="bg-blue-300 text-white p-1 ml-1 rounded-md"
          >
            원래크기
          </button>
        </div>
        <div className="flex gap-1 mb-4">
          <button
            onClick={handleReset}
            className="bg-blue-500 text-white p-1 ml-1 rounded-md w-20"
          >
            다시 쓰기
          </button>
          <button
            onClick={handleCaptureAndDownload}
            className="bg-blue-500 text-white p-1 ml-1 rounded-md w-20"
          >
            사진변환
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
        ref={divRef}
        className={
          "flex flex-col justify-center items-center w-[466px] pb-4 mb-4"
        }
        style={{
          backgroundColor: imageColor ? imageColor : "#959591",
        }}
      >
        <div>
          <div className="mt-7 flex items-center justify-center overflow-hidden rounded-xl w-[250px] h-[250px]">
            <img
              src={imageFileSrc}
              className={`w-[100%] ${imageStyle}`}
              alt="이미지"
            />
          </div>
          <h1 className={`text-3xl font-bold mt-5 text-slate-50 ${textFont}`}>
            {title}
          </h1>
          <p className={`text-lg mb-3 text-slate-50 ${textFont}`}>{subtitle}</p>
        </div>
        <div className={`flex flex-row ${textFont}`}>
          <MusicPlayer endTime={endTime} />
        </div>
      </div>
    </div>
  );
};

export default InstaFrame;
