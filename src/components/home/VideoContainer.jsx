import React from "react";

const VideoContainer = () => {
  return (
    <>
      <section className="VideoContainer-sec">
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/X_rFxEl5Tao,_-TTQBUPz6w?&autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=X_rFxEl5Tao,_-TTQBUPz6w?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&rel=0&playlist=VIDEO_ID"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              transform: "translate(0, 0) scale(1.3)",
              width: "100vw",
              height: "100vh",
              border: "none",
            }}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Video"
          ></iframe>
        </div>
        <div className="VideoContainerText">
          <figure className="banner-logo">
            <img src="/new/assets/img/logo.svg" alt="Luxury Hotels Logo" />

            <span
              style={{
                fontSize: "25px",
                fontFamily: "Georgia",
                color: "#7B6929",
              }}
            >
              PRESENTS
            </span>
          </figure>
        </div>
      </section>
    </>
  );
};

export default VideoContainer;
