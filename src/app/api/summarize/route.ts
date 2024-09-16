import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { ApiError } from "@/utils/ApiError";
import { SummaryModel } from "@/models/summary.model";

function fileToGenerativePart(path: any, mimeType: any) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = req.headers.get("user-id");
    const notebookId = formData.get("notebookId") as string;

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const mediaPath = formData.get("mediaPath") as File;
    const buffer = Buffer.from(await mediaPath.arrayBuffer());
    const filename = Date.now() + mediaPath.name.replaceAll(" ", "_");

    const filePath = path.join(process.cwd(), "public/uploads/" + filename);

    await writeFile(filePath, buffer);

    const prompt = `
    Please analyze the provided image and generate a concise summary of its educational content. Focus on all the key points. The output should be formatted as given in the example, an array in which the first element is the topic and the rest are the key points.
  
    **Example:**

    ["The Solar System", "The Sun is at the center", "There are eight planets", "The planets are divided into two groups: terrestrial and gas giants"]
  
    **End of Example:**
  
    If the image does not contain any educational content return null
    `;

    const imagePart = fileToGenerativePart(`${filePath}`, mediaPath.type);

    const result = await model.generateContent([prompt, imagePart]);
    fs.unlinkSync(filePath);

    if (result.response.text() !== "null") {
      // TODO: Save summary to database
      await SummaryModel.create({
        content: result.response.text(),
        generatedBy: userId,
        notebook: notebookId,
      });
    }

    return NextResponse.json(
      new ApiSuccess(200, "Success", result.response.text())
    );
  } catch (error: any) {
    return NextResponse.json(new ApiError(500, error.message), {
      status: 500,
    });
  }
}
