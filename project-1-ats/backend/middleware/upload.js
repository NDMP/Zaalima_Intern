import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
  // Resume
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // Images
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
  new Error(
    "Only PDF, DOC, DOCX, JPG, JPEG, PNG and WEBP files are allowed."
  )
);
  }
};

export default multer({
  storage,
  fileFilter,
});