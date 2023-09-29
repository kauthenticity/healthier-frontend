import { IIcon } from "src/interfaces/assets";

export default function KakaoIcon({ width = 24, height = 24, fill = "#000000" }: IIcon) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6667 3.97702C6.87996 3.97702 3.00002 6.99051 3.00002 10.7072C3.00002 13.0186 4.5007 15.0563 6.78593 16.2683L5.82441 19.7993C5.73946 20.1113 6.09442 20.3599 6.36698 20.1791L10.5818 17.3827C10.9374 17.4172 11.2989 17.4374 11.6667 17.4374C16.4531 17.4374 20.3333 14.424 20.3333 10.7072C20.3333 6.99051 16.4531 3.97702 11.6667 3.97702Z"
        fill={fill}
      />
    </svg>
  );
}
