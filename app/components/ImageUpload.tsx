"use client";
import { useState, useEffect } from "react";
import ColorThief from "colorthief";

const ImagePreview = ({
  imageColor,
  setImageColor,
  imageFile,
  setImageFile,
}: {
  imageColor: string;
  setImageColor: React.Dispatch<React.SetStateAction<string>>;
  imageFile: string;
  setImageFile: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [imageSrc, setImageSrc] = useState("/catpic.jpeg");
  const [color, setColor] = useState("");
  const [colorPalette, setColorPalette] = useState<string[]>([]);

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const resultString = reader.result as string; // reader.result를 string으로 형변환

      // 이미지 데이터를 Blob으로 변환
      const response = await fetch(resultString);
      const blob = await response.blob();

      // Blob 데이터를 로컬 스토리지에 저장
      const blobURL = URL.createObjectURL(blob);
      localStorage.setItem("uploadedImage", blobURL);

      setImageSrc(resultString); // 파일의 컨텐츠
      setImageFile(blobURL); // Blob URL을 전달
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // 이전에 업로드한 이미지가 로컬 스토리지에 있는지 확인
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      setImageFile(storedImage);
    }

    if (imageSrc) {
      const img = document.createElement("img");
      img.src = imageSrc;

      const colorThief = new ColorThief();

      img.addEventListener("load", () => {
        const colorPalette = colorThief.getPalette(img, 3, 3);
        const paletteColors = colorPalette.map(
          (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        );
        setColorPalette(paletteColors);
      });
    }
  }, [imageSrc]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setColor(e.currentTarget.value);
    setImageColor(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  return (
    <>
      <div className="top-0 absolute flex flex-row mt-5">
        <input
          accept="image/*"
          multiple
          type="file"
          onChange={(e) => onUpload(e)}
        />
        <div className="flex flex-row">
          {/* 추출된 색상 팔레트를 여기에 표시하는 UI를 만듭니다 */}
          {colorPalette.map((color, index) => (
            <button
              key={index}
              style={{
                backgroundColor: color,
                width: "30px",
                height: "30px",
                margin: "5px",
              }}
              onClick={handleClick}
              value={color}
            ></button>
          ))}
        </div>
      </div>
      <div>
        <img
          src={imageSrc}
          className="mt-7 rounded-xl object-cover w-[300px] h-[300px]"
          alt="이미지"
        />
      </div>
    </>
  );
};

export default ImagePreview;
