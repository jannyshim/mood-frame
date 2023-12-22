"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useRef } from "react";
import { fonts } from "../../utils/fonts";
import html2canvas from "html2canvas";
import saveAs from "file-saver";

const OnlyCommentFrame = () => {
  const [content, setContent] = useState("내용");
  const [minute, setMinute] = useState("0분 전");
  const [fontStyle, setFontStyle] = useState("ChosunNm");
  const [pgNm, setPgNm] = useState("");

  let textFont = fonts[fontStyle];
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageColor = searchParams.get("imageColor");
  const imageUrl = searchParams.get("imageUrl");

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

    html2canvas(div, { allowTaint: true }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "comment-frame.png");
        }
      });
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
            style={{ whiteSpace: "pre-wrap" }}
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
              onClick={() => {
                router.push(`/insta-frame`);
              }}
              className="bg-blue-500 text-white p-1 ml-1 rounded-md w-30"
            >
              인스타프레임
            </button>
            <button
              onClick={() => {
                router.push(`/insta-frame/comment?imageColor=${imageColor}`);
              }}
              className="bg-blue-500 text-white p-1 ml-1 rounded-md w-30"
            >
              댓글프레임
            </button>
          </div>
        </div>
      </div>
      <div
        ref={divRef}
        className={
          "relative flex flex-col items-center w-[466px] h-[466px] rounded-t-xl bg-[#191919] p-5 mb-7"
        }
      >
        <div className="w-10 h-1 rounded-md bg-slate-200 absolute top-0 mt-3" />
        <div className="flex gap-[250px]">
          <p className={`text-2xl mt-3 mb-1 text-slate-50 ${textFont}`}>댓글</p>
          <p className={`text-[#afaeaf] ${textFont}`}>{pgNm}</p>
        </div>
        <div className="flex mr-auto mt-5 gap-4">
          <img src="/profile.png" className="h-12 w-12 rounded-full" />
          <div className="flex flex-col">
            <div className={`flex text-[#afaeaf] ${textFont}`}>
              <p>@jamiero__</p>
              <p>{minute}</p>
            </div>
            <p
              className={`text-l mb-3 text-slate-50 ${textFont}`}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlyCommentFrame;
