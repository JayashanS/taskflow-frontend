import React from "react";

const AnimatedClockInfinite = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="200px"
      height="200px"
    >
      {/* First Path */}
      <path
        opacity="0.4"
        d="M12 8V13"
        stroke="#9003fc"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="path1"
      />
      {/* Second Path */}
      <path
        d="M12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25"
        stroke="#9003fc"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="path2"
      />
      {/* Third Path */}
      <path
        opacity="0.4"
        d="M9 2H15"
        stroke="#9003fc"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="path3"
      />
      {/* Fourth Path */}
      <path
        opacity="0.4"
        d="M14.9004 18.4998V17.3398C14.9004 15.9098 15.9204 15.3198 17.1604 16.0398L18.1604 16.6198L19.1604 17.1998C20.4004 17.9198 20.4004 19.0898 19.1604 19.8098L18.1604 20.3898L17.1604 20.9698C15.9204 21.6898 14.9004 21.0998 14.9004 19.6698V18.4998Z"
        stroke="#9003fc"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="path4"
      />

      {/* CSS for Animation */}
      <style>{`
        /* Set initial stroke dash offset for animation */
        .path1, .path2, .path3, .path4 {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }

        .path1 {
          animation: drawPath 2s ease-in-out infinite;
        }

        .path2 {
          animation: drawPath 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .path3 {
          animation: drawPath 2s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .path4 {
          animation: drawPath 2s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        /* Keyframes for path animation */
        @keyframes drawPath {
          0% {
            stroke-dashoffset: 100;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 100;
          }
        }
      `}</style>
    </svg>
  );
};

export default AnimatedClockInfinite;
