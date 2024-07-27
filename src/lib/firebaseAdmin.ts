import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);
const bucketName = "apply-frame.appspot.com";
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "apply-frame.appspot.com", // Add your bucket name here
  });
}

const bucket = admin.storage().bucket(bucketName);

export { bucket };
