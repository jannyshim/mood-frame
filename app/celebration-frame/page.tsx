"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import ImageUpload from "../components/ImageUpload";

import { fonts } from "../utils/fonts";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import Draggable from "react-draggable";
import ColorPallet from "../components/ColorPallet";

const CelebrationFrame = () => {
  const [title, setTitle] = useState("제목");
  const [subtitle, setSubtitle] = useState("내용");
  const [imageColor, setImageColor] = useState<string>("");
  const [imageFileSrc, setImageFileSrc] = useState("/catpic.jpeg");
  const [fontStyle, setFontStyle] = useState("ChosunNm");
  const [titleColor, setTitleColor] = useState("#ffffff");
  const [paragraphColor, setParagraphColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const nodeRefTitle = useRef<HTMLHeadingElement>(null);
  const nodeRefSubtitle = useRef<HTMLParagraphElement>(null);

  let textFont = fonts[fontStyle];

  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값
  // 업데이트 되는 값을 set 해줌
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(e.target.value);
  };
  const handleReset = () => {
    setTitle("제목");
    setSubtitle("내용");
  };

  const fontClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontStyle(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const handleTitleColorSelect = (color: string) => {
    setTitleColor(color);
    console.log("제목", color);
  };
  const handleParagraphColorSelect = (color: string) => {
    setParagraphColor(color);
    console.log("내용", color);
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
        showColorPicker={showColorPicker}
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
        <div>
          <ColorPallet onSelectColor={handleTitleColorSelect} />
        </div>
        <input
          type="text"
          placeholder="소제목"
          value={subtitle}
          onChange={handleSubtitleChange}
          required
          className="p-2 rounded-md border-solid"
        />
        <div>
          <ColorPallet onSelectColor={handleParagraphColorSelect} />
        </div>
        <select
          onChange={fontClick}
          className="p-2 rounded-md border-solid border-black"
        >
          <option value="ChosunNm">조선일보명조</option>
          <option value="NotoSansKR">노토산스</option>
          <option value="JeonjuCraftGoR">전주공예고딕</option>
          <option value="BookkMyungjo">부크크명조</option>
        </select>
        <div className="flex gap-1 mb-4">
          <button
            onClick={handleReset}
            className="bg-blue-500 text-white p-1 ml-1 rounded-md w-20"
          >
            다시 쓰기
          </button>
          <button
            onClick={handleCaptureAndDownload}
            className="bg-blue-500 text-white p-1 ml-1 rounded-md w-25"
          >
            사진다운로드
          </button>
          <button
            onClick={() => {
              router.push(`/`);
            }}
            className="bg-blue-500 text-white p-1 ml-1 rounded-md w-20"
          >
            이전페이지
          </button>
        </div>
      </div>
      <div
        ref={divRef}
        className="mt-3 flex flex-col overflow-hidden rounded-xl w-[350px] h-[350px]"
        style={{
          backgroundImage: `url(${imageFileSrc})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={`${textFont}`}>
          <Draggable onDrag={(data) => trackPos(data)} nodeRef={nodeRefTitle}>
            <h1
              ref={nodeRefTitle}
              className="text-2xl font-bold"
              style={{ color: titleColor }}
            >
              {title}
            </h1>
          </Draggable>
          <Draggable
            onDrag={(data) => trackPos(data)}
            nodeRef={nodeRefSubtitle}
          >
            <p
              ref={nodeRefSubtitle}
              className="text-lg"
              style={{ color: paragraphColor }}
            >
              {subtitle}
            </p>
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default CelebrationFrame;
