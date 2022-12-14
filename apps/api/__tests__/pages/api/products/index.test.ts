import { createMocks } from "node-mocks-http";
import { getProducts } from "@/lib/api/products";

describe("/api/[animal]", () => {
  test("returns a message with the specified animal", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        animal: "dog",
      },
    });

    await getProducts(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Your favorite animal is dog",
      })
    );
  });
});
