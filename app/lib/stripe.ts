import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export const getCheckoutUrl = async (
  app: FirebaseApp,
  priceId: string
): Promise<string> => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionRef = collection(db, "customers", userId, "checkout_sessions");

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error?: { message: string };
        url?: string;
      };
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  try {
    const functions = getFunctions(app, "us-central1");
    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    const { data } = await functionRef({
      customerId: user?.uid,
      returnUrl: window.location.origin,
    });

    const dataWithUrl = data as { url: string };
    return dataWithUrl.url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get portal URL");
  }
};