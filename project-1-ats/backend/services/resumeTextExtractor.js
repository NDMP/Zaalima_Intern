import path from "path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

const normalizeText = (text) =>
  text.replace(/\s+/g, " ").trim();

const extractPdfText = async (filePath) => {
  const parser = new PDFParse({ url: filePath });

  try {
    const result = await parser.getText();
    return normalizeText(result.text || "");
  } finally {
    await parser.destroy();
  }
};

const extractDocxText = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return normalizeText(result.value || "");
};

export const extractResumeText = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".pdf") {
    return extractPdfText(filePath);
  }

  if (extension === ".docx") {
    return extractDocxText(filePath);
  }

  throw new Error(
    "Resume text extraction supports PDF and DOCX files only."
  );
};
