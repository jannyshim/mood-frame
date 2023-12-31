"use client";
import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const MusicPlayer = ({ endTime }: { endTime: string }) => {
  const [currentTime, setCurrentTime] = useState<number[]>([0]); // 현재 재생 위치 상태
  const [nowTime, setNowTime] = useState("00:00");

  const handleTimeChange = (newTime: number[]) => {
    // 토글을 조절할 때 호출되는 함수
    setCurrentTime(newTime);
  };

  const calculateTime = (percent: number) => {
    const totalSeconds =
      parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
    const currentSeconds = Math.round((totalSeconds * percent) / 100);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    // currentTime 값이 변경될 때마다 nowTime을 계산하여 설정합니다.
    const percent = currentTime[0];
    const newNowTime = calculateTime(percent);
    setNowTime(newNowTime);
  }, [currentTime]);

  return (
    <div className="w-full items-center">
      <div className="flex flex-col gap-1">
        <div className="h-2 flex justify-center items-center">
          <Range
            values={currentTime}
            step={1}
            min={0}
            max={100}
            onChange={handleTimeChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-1 w-[250px] relative"
                style={{
                  background: getTrackBackground({
                    values: currentTime,
                    colors: ["#849ED1", "#ccc"],
                    min: 0,
                    max: 100,
                  }),
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
        <div className="flex text-slate-50 w-[280px] items-center">
          <span>{nowTime}</span>
          <span className="ml-auto">{endTime}</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <img src="/shuffle.png" alt="shuffle Icon" width={15} height={15} />
        <img src="/previous.png" alt="previous Icon" width={35} height={35} />
        <img src="/pause.png" alt="pause Icon" width={40} height={40} />
        <img src="/skip.png" alt="skip Icon" width={35} height={35} />
        <img src="/repeat.png" alt="repeat Icon" width={15} height={15} />
      </div>
    </div>
  );
};

export default MusicPlayer;
