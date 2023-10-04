"use client";
import React, { useState } from "react";

const MusicPlayer = ({ endTime }: { endTime: string }) => {
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 위치 상태

  const handleTimeChange = (e: any) => {
    // 토글을 조절할 때 호출되는 함수
    const newTime = e.target.value;
    setCurrentTime(newTime);
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        {/* 위치 조절 토글 */}
        <input
          type="range"
          min="0"
          max="100"
          value={currentTime}
          onChange={handleTimeChange}
          className="w-[350px] h-1 bg-transparent appearance-none border-none"
          style={{
            backgroundColor: "rgba(200, 200, 200, 0.5)",
          }}
        />
        {/* 시작/종료 시간 */}
        <div className="flex text-slate-50">
          <span>00:00</span>
          <span className="ml-auto">{endTime}</span>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <img src="/shuffle.svg" alt="Home Icon" width={30} height={30} />
        <img src="/previous.svg" alt="Home Icon" width={50} height={50} />
        <img src="/pause.svg" alt="Home Icon" />
        <img src="/skip.svg" alt="Home Icon" width={50} height={50} />
        <img src="/repeat.svg" alt="Home Icon" width={30} height={30} />
      </div>
    </div>
  );
};

export default MusicPlayer;
