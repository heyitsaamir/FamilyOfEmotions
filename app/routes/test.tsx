import { Handlers, type RouteContext } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const file = form.get("image") as File;

    if (!file) {
      return ctx.render({
        message: `Please try again`,
      });
    }

    // const name = file.name;
    try {
    const data = await fetch("http://localhost:3000/addPage", { 
      method: "POST",
      body: form
    });
    return ctx.render({
      message: `Uploaded!`,
    });
  } catch (error) {
    return ctx.render({
      message: `Error: ${error}`,
    });
  }
  },
};

export default function Upload(req: Request, ctx: RouteContext) {
  const { message } = ctx.data ?? {};
  return (
    <>
      <form method="post" encType="multipart/form-data">
        <input type="file" name="image" />
        <button type="submit">Upload</button>
      </form>
      {message ? <p>{message}</p> : null}
    </>
  );
}
