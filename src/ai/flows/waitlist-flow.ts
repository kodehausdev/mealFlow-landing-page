// src/ai/flows/waitlist-flow.ts
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Debug function to test Firebase connection
async function testFirebaseConnection() {
  try {
    console.log('Testing Firebase connection...');
    console.log('Database instance:', db);
    return true;
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return false;
  }
}

interface WaitlistEntry {
  email: string;
}

interface WaitlistResponse {
  success: boolean;
  message: string;
}

export async function addToWaitlist({ email }: WaitlistEntry): Promise<WaitlistResponse> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.'
      };
    }

    // Check if email already exists in waitlist
    const waitlistRef = collection(db, 'waitlist');
    const emailQuery = query(waitlistRef, where('email', '==', email.toLowerCase()));
    const existingDocs = await getDocs(emailQuery);

    if (!existingDocs.empty) {
      return {
        success: false,
        message: 'This email is already on our waitlist!'
      };
    }

    // Add new email to waitlist
    const docRef = await addDoc(waitlistRef, {
      email: email.toLowerCase(),
      createdAt: serverTimestamp(),
      status: 'pending' // You can use this for managing waitlist status
    });

    console.log('Document written with ID: ', docRef.id);

    return {
      success: true,
      message: 'Thank you! You have been added to our waitlist. We\'ll notify you when MealFlow is ready!'
    };

  } catch (error) {
    console.error('Error adding email to waitlist: ', error);
    
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    };
  }
}