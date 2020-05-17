import { Response } from "jest-express/lib/response";

import controller from "./controller";

describe("Main Controller", () => {
  it("Returns a 200 on /", () => {
    const response = new Response();

    controller.getMain({}, response);
    expect(response.status).toBeCalledWith(200);
  });
});
