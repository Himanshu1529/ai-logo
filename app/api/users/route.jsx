import { db } from "@/app/configs/FirebaseConfig";
import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { userEmail, userName } = await req.json();

    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If the document exists, return its data
      return NextResponse.json(docSnap.data());
    } else {
      // Create a new user document
      const data = {
        userName: userName,
        email: userEmail,
        credits: 5,
      };

      await setDoc(docRef, data);

      return NextResponse.json(data);
    }
  } catch (error) {
    // Return an error response
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}
