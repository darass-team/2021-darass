export const popUpCenter = (href: string, name: string, width: number, height: number, features?: string) => {
  let xPos = window.screen.width / 2 - width / 2; // 가운데 정렬
  let yPos = window.screen.height / 2 - height / 2;
  xPos += window.screenLeft; // 듀얼 모니터일 때
  yPos += window.screenTop;

  return window.open(href, name, `width=${width}, height=${height}, left=${xPos}, top=${yPos}, ${features}`);
};
