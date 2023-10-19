"use client";
import React, { useState } from "react";
import { Range } from "react-range";

const MusicPlayer = ({ endTime }: { endTime: string }) => {
  const [currentTime, setCurrentTime] = useState<number[]>([0]); // 현재 재생 위치 상태

  const handleTimeChange = (newTime: number[]) => {
    // 토글을 조절할 때 호출되는 함수

    setCurrentTime(newTime);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        <div className="h-2 flex">
          <Range
            values={currentTime}
            step={1}
            min={0}
            max={100}
            onChange={handleTimeChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-1 w-[400px] relative"
                style={{
                  backgroundColor: "rgba(200, 200, 200, 0.5)",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-3 w-3 rounded-full flex items-center"
                style={{
                  backgroundColor: "#ffffff",
                }}
              ></div>
            )}
          />
        </div>
        {/* 시작/종료 시간 */}
        <div className="flex text-slate-50">
          <span>00:00</span>
          <span className="ml-auto">{endTime}</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <img src="/shuffle.png" alt="shuffle Icon" width={20} height={20} />
        <img src="/previous.png" alt="previous Icon" width={40} height={40} />
        <img src="/pause.png" alt="pause Icon" width={50} height={50} />
        <img src="/skip.png" alt="skip Icon" width={40} height={40} />
        <img src="/repeat.png" alt="repeat Icon" width={20} height={20} />
      </div>
    </div>
  );
};

export default MusicPlayer;
