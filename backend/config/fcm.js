import admin from "firebase-admin";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

const initializeFCM = async () => {
  const [version] = await client.accessSecretVersion({
    name: "projects/xenon-axe-450704-n3/secrets/fcm-service-account/versions/latest",
  });

  const payload = version.payload.data.toString();
  const serviceAccount = JSON.parse(payload);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized!");
  }
};

export { initializeFCM, admin };
