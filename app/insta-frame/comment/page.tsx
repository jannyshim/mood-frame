"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { fonts } from "../../utils/fonts";

const CommentFrame = () => {
  const [content, setContent] = useState("내용");
  const [minute, setMinute] = useState("0분 전");
  const [imageFile, setImageFile] = useState("");
  const [fontStyle, setFontStyle] = useState("ChosunNm");

  let textFont = fonts[fontStyle];

  const searchParams = useSearchParams();
  const imageColor = searchParams.get("imageColor");
  const imageUrl = searchParams.get("imageUrl");

  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      // 이미지 파일을 state에 설정
      setImageFile(storedImage);
    }
    // imageColor와 imageUrl 값을 사용하여 작업 수행
    console.log("imageColor:", imageColor);
    console.log("imageUrl:", imageUrl);
  }, [imageColor, imageUrl]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(e.target.value);
  };

  const handleReset = () => {
    setContent("내용");
    setMinute("0분 전");
  };
  const fontClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontStyle(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center m-2">
        <div className="flex flex-col justify-between items-center gap-3">
          <textarea
            placeholder="내용"
            value={content}
            onChange={handleContentChange}
            required
            className="p-2 ml-2 rounded-md border-solid h-[90px]"
          />

          <input
            placeholder="0분 전"
            value={minute}
            onChange={handleMinuteChange}
            required
            className="p-2 ml-2 rounded-md border-solid"
          />
          <div className="flex">
            <select
              onChange={fontClick}
              className="p-2 ml-2 rounded-md border-solid border-black"
            >
              <option value="ChosunNm">조선일보명조</option>
              <option value="NotoSansKR">노토산스</option>
            </select>
            <button
              onClick={handleReset}
              className="bg-blue-500 text-white p-1 ml-1 rounded-md w-20"
            >
              다시 쓰기
            </button>
          </div>
        </div>
      </div>
      <div
        className={"relative flex flex-col items-center w-3/4 mt-4 mb-4"}
        style={{
          backgroundColor: imageColor ? imageColor : "#959591",
        }}
      >
        <img
          src={imageFile} // 이미지 파일의 Blob URL
          className="mt-9 rounded-xl object-cover w-[300px] h-[300px]"
          alt="이미지"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-neutral-800/80"></div>
        <div className="absolute bottom-0 h-3/5 w-full">
          <div className="relative flex flex-col items-center rounded-t-xl bg-[#191919] shadow-md p-5">
            <div className="w-10 h-1 rounded-md bg-slate-200 absolute top-0 mt-3" />
            <p
              className={`text-2xl mt-6 mr-auto mb-1 text-slate-50 ${textFont}`}
            >
              댓글
            </p>
            <div className="flex mr-auto mt-5 gap-4">
              <img src="/profile.png" className="h-12 w-12 rounded-full" />
              <div className="flex flex-col">
                <div className={`flex text-[#afaeaf] ${textFont}`}>
                  <p>@jamiero__</p>
                  <p>{minute}</p>
                </div>
                <p className={`text-l mb-3 text-slate-50 ${textFont}`}>
                  {content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentFrame;
