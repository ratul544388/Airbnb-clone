import { getPlaiceholder } from "plaiceholder";

export const generateBase64Image = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
};
