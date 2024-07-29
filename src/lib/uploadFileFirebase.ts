import { bucket } from "./firebaseAdmin";

export const uploadFileToFirebase = async (buffer: any, fileName: string) => {
  const file = bucket.file(fileName);

  await file.save(buffer, {
    metadata: { contentType: "application/pdf" }, // Update as per file type
    public: true,
  });

  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};
