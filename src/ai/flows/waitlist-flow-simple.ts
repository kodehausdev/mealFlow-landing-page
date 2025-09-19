// src/ai/flows/waitlist-flow-simple.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface WaitlistEntry {
  email: string;
}

interface WaitlistResponse {
  success: boolean;
  message: string;
}

export async function addToWaitlistSimple({ email }: WaitlistEntry): Promise<WaitlistResponse> {
  try {
    console.log('=== FIREBASE DEBUG INFO ===');
    console.log('Database instance:', db);
    console.log('Database app:', db.app);
    console.log('Database app name:', db.app.name);
    console.log('Database app options:', db.app.options);
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.'
      };
    }

    console.log('Attempting to add document to waitlist collection...');
    
    // Simple add without duplicate checking first
    const waitlistRef = collection(db, 'waitlist');
    console.log('Collection reference:', waitlistRef);
    
    const docData = {
      email: email.toLowerCase(),
      createdAt: serverTimestamp(),
      status: 'pending',
      timestamp: new Date().toISOString() // Add regular timestamp too
    };
    
    console.log('Document data:', docData);
    
    const docRef = await addDoc(waitlistRef, docData);
    console.log('SUCCESS! Document written with ID:', docRef.id);

    return {
      success: true,
      message: 'Thank you! You have been added to our waitlist.'
    };

  } catch (error) {
    console.error('=== FULL ERROR DETAILS ===');
    console.error('Error object:', error);
    console.error('Error code:', error?.code);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    
    return {
      success: false,
      message: `Error: ${error?.message || 'Unknown error'}. Please check the console for details.`
    };
  }
}