export default function Line() {
  return (
    <svg
      width="290"
      height="9"
      viewBox="0 0 290 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4" filter="url(#filter0_d_77_785)">
        <line
          x1="4"
          y1="0.85"
          x2="286"
          y2="0.85"
          stroke="#AAADB2"
          strokeWidth="0.3"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_77_785"
          x="0"
          y="0.699951"
          width="290"
          height="8.30005"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_77_785"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_785"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
