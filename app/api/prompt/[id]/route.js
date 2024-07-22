import connectToDB from "../../../../utils/database";
import Prompt from "../../../../models/prompt";

// Get (read)
export const GET = async (request, { params }) => {
  console.log({
    paramID: params.id,
  });
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("faild to fetch all prompts", { status: 500 });
  }
};
// Patch -> update prompt
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt Not Found!", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Faild to update prompt", { status: 500 });
  }
};

// Delete -> prompt

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt Delete successfuly", { statues: 200 });
  } catch (error) {
    console.log(error);
    return new Response("faild to delete prompt!", { status: 500 });
  }
};
