import admin from "firebase-admin";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

async function initializeFCM() {
  const [version] = await client.accessSecretVersion({
    name: "projects/xenon-axe-450704-n3/secrets/fcm-service-account/versions/latest",
  });

  const payload = version.payload.data.toString();
  const serviceAccount = JSON.parse(payload);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("Firebase Admin initialized from Secret Manager!");
}

export default initializeFCM;
