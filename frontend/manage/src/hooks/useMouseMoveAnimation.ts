import { useRef, useState } from "react";

const isMobile = () => {
  const mobileKeyWords = new Array(
    "Android",
    "iPhone",
    "iPad",
    "BlackBerry",
    "Windows CE",
    "SAMSUNG",
    "LG",
    "MOT",
    "SonyEricsson"
  );

  for (let info in mobileKeyWords) {
    if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
      return true;
    }
  }

  return false;
};

const isIOS = () => {
  const mobileKeyWords = new Array("iPhone", "iPad");

  for (let info in mobileKeyWords) {
    if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
      return true;
    }
  }

  return false;
};

const useMouseMoveAnimation = () => {
  const x = useRef<number>(0);
  const y = useRef<number>(0);
  const mx = useRef<number>(0);
  const my = useRef<number>(0);

  const $target = useRef<HTMLElement | null>(null);

  const _loopMobile = () => {
    if (!$target.current) return;

    mx.current = mx.current + (x.current - mx.current) * 0.1;
    my.current = my.current + (y.current - my.current) * 0.1;

    $target.current.style.setProperty("transform", `rotate(${mx.current + my.current - 45}deg)`);

    window.requestAnimationFrame(_loopMobile);
  };

  const loopMobile = () => {
    window.addEventListener("deviceorientation", event => {
      x.current = event.gamma || Math.random();
      y.current = event.beta || Math.random();
    });
    _loopMobile();
  };

  const loop = () => {
    if (!$target.current) return;

    mx.current = mx.current + (x.current - mx.current) * 0.01;
    my.current = my.current + (y.current - my.current) * 0.01;

    $target.current.style.setProperty(
      "transform",
      "translate3d(0%, 0%, 0) rotateX(" + my.current / 10 + "deg) rotateY(" + -mx.current / 10 + "deg)"
    );

    window.requestAnimationFrame(loop);
  };

  const runAnimation = (target: HTMLElement) => {
    $target.current = target;

    if (isMobile()) {
      if (isIOS()) {
        DeviceOrientationEvent.requestPermission()
          .then(function () {
            loopMobile();
          })
          .catch(error => console.error(error));
      } else {
        loopMobile();
      }
    } else {
      window.addEventListener("mousemove", event => {
        x.current = event.clientX - window.innerWidth / 2;
        y.current = event.clientY - window.innerHeight / 2;
      });

      loop();
    }
  };

  return { runAnimation };
};

export { useMouseMoveAnimation };
