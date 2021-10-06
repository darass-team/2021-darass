import { popUpCenter } from "../popUpCenter";

window.open = jest.fn();

describe("popUpCenter test", () => {
  test("인자로, href/name/width/height/features가 주어지면, 계산된 결과값들을 인자로하는 window.open가 호출된다.", () => {
    const href = "href";
    const name = "name";
    const width = 100;
    const height = 100;
    const features = "feature";

    popUpCenter(href, name, width, height, features);

    expect(window.open).toHaveBeenCalledWith(
      href,
      name,
      `width=${width}, height=${height}, left=${window.screen.width / 2 - width / 2}, top=${
        window.screen.height / 2 - height / 2
      }, ${features}`
    );
  });
});
