"use client";
import * as htmlToImage from "html-to-image";
import saveAs from "file-saver";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { fonts } from "../../utils/fonts";

const CommentFrame = () => {
  const [content, setContent] = useState("내용");
  const [minute, setMinute] = useState("0분 전");
  const [imageFile, setImageFile] = useState("");
  const [fontStyle, setFontStyle] = useState("ChosunNm");
  const [pgNm, setPgNm] = useState("");

  let textFont = fonts[fontStyle];
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageColor = searchParams.get("imageColor");
  const imageUrl = searchParams.get("imageUrl");

  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      // 이미지 파일을 state에 설정
      setImageFile(storedImage);
    }
  }, [imageColor, imageUrl]);

  const handleInstaClick = () => {
    router.push(`/insta-frame`);
  };

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

  const handlePageNm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPgNm(e.target.value);
  };

  const fontClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontStyle(e.currentTarget.value);
  };

  const handleCaptureAndDownload = async () => {
    if (!divRef.current) return;

    const div = divRef.current;

    htmlToImage.toBlob(div).then(function (blob) {
      if (blob !== null) {
        saveAs(blob, "comment-frame.png");
      }
    });
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
            className="p-2 ml-2 rounded-md border-solid h-[100px]"
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
              <option value="JeonjuCraftGoR">전주공예고딕</option>
              <option value="BookkMyungjo">부크크명조</option>
            </select>
            <input
              placeholder="페이지 수"
              value={pgNm}
              onChange={handlePageNm}
              className="p-2 ml-2 w-[80px] rounded-md border-solid"
            />
          </div>

          <div className="flex gap-1">
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
              다운로드
            </button>
            <button
              onClick={handleInstaClick}
              className="bg-blue-500 text-white p-1 ml-1 rounded-md w-30"
            >
              인스타프레임
            </button>
          </div>
        </div>
      </div>
      <div
        ref={divRef}
        className={
          "relative flex flex-col items-center w-[350px] h-[462px] pb-4 mt-4 mb-4"
        }
        style={{
          backgroundColor: imageColor ? imageColor : "#959591",
        }}
      >
        <img
          src={imageFile} // 이미지 파일의 Blob URL
          className="mt-9 rounded-xl object-cover w-[250px] h-[250px]"
          alt="이미지"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-neutral-800/80" />
        <div className="absolute bottom-0 w-full overflow-hidden">
          <div className="flex flex-col items-center h-[300px] rounded-t-xl bg-[#191919] shadow-md p-5">
            <div className="w-10 h-1 rounded-md bg-slate-200 absolute top-0 mt-3" />
            <div className="flex gap-[250px]">
              <p className={`text-2xl mt-3 mb-1 text-slate-50 ${textFont}`}>
                댓글
              </p>
              <p className={`text-[#afaeaf] ${textFont}`}>{pgNm}</p>
            </div>
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
