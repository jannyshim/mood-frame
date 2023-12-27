"use client";
import { useState } from "react";

const ColorPallet = ({
  onSelectColor,
}: {
  onSelectColor: (color: string) => void;
}) => {
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const togglePalette = () => {
    setPaletteVisible((prevVisible) => !prevVisible);
  };

  const pallet: string[][] = [
    [
      "#FF0000",
      "#FF5E00",
      "#FFBB00",
      "#FFE400",
      "#ABF200",
      "#1DDB16",
      "#00D8FF",
      "#0054FF",
      "#0100FF",
      "#5F00FF",
      "#FF00DD",
      "#FF007F",
      "#000000",
      "#FFFFFF",
    ],
    [
      "#FFD8D8",
      "#FAE0D4",
      "#FAECC5",
      "#FAF4C0",
      "#E4F7BA",
      "#CEFBC9",
      "#D4F4FA",
      "#D9E5FF",
      "#DAD9FF",
      "#E8D9FF",
      "#FFD9FA",
      "#FFD9EC",
      "#F6F6F6",
      "#EAEAEA",
    ],
    [
      "#FFA7A7",
      "#FFC19E",
      "#FFE08C",
      "#FAED7D",
      "#CEF279",
      "#B7F0B1",
      "#B2EBF4",
      "#B2CCFF",
      "#B5B2FF",
      "#D1B2FF",
      "#FFB2F5",
      "#FFB2D9",
      "#D5D5D5",
      "#BDBDBD",
    ],
    [
      "#F15F5F",
      "#F29661",
      "#F2CB61",
      "#E5D85C",
      "#BCE55C",
      "#86E57F",
      "#5CD1E5",
      "#6799FF",
      "#6B66FF",
      "#A566FF",
      "#F361DC",
      "#F361A6",
      "#A6A6A6",
      "#8C8C8C",
    ],
    [
      "#CC3D3D",
      "#CC723D",
      "#CCA63D",
      "#C4B73B",
      "#9FC93C",
      "#47C83E",
      "#3DB7CC",
      "#4374D9",
      "#4641D9",
      "#8041D9",
      "#D941C5",
      "#D9418C",
      "#747474",
      "#5D5D5D",
    ],
    [
      "#980000",
      "#993800",
      "#997000",
      "#998A00",
      "#6B9900",
      "#2F9D27",
      "#008299",
      "#003399",
      "#050099",
      "#3F0099",
      "#990085",
      "#99004C",
      "#4C4C4C",
      "#353535",
    ],
    [
      "#670000",
      "#662500",
      "#664B00",
      "#665C00",
      "#476600",
      "#22741C",
      "#005766",
      "#002266",
      "#030066",
      "#2A0066",
      "#660058",
      "#660033",
      "#212121",
      "#191919",
    ],
  ];

  const handleColorSelect = (color: string) => {
    onSelectColor(color);
    setSelectedColor(color);
    setPaletteVisible(false);
  };

  return (
    <div>
      <button onClick={togglePalette} className="underline">
        글자 색상 선택⬇️
      </button>
      {paletteVisible && (
        <div>
          {pallet.map((row, rowIndex) => (
            <div key={rowIndex} className="flex wrap">
              {row.map((color, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className="w-4 h-4 pointer"
                  style={{
                    background: color,
                    border:
                      selectedColor === color ? "2px solid black" : "none",
                  }}
                  onClick={() => handleColorSelect(color)}
                ></button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPallet;
