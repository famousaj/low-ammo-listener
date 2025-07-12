import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const supabase = createClient('https://tuopewzbymuxjeesnvbx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b3Bld3pieW11eGplZXNudmJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTMwODY5MywiZXhwIjoyMDY2ODg0NjkzfQ.aukGKHKyWdfuxO5RTfH8inL3HaJZJnr13lyJw2ZgHM0');

const emailFunctionUrl = 'https://YOUR-PROJECT.functions.supabase.co/send-email-resend';

const myEmail = 'amameajunior@gmail.com';

const channel = supabase.channel('low_ammo_channel');

channel
  .on('broadcast', { event: 'low_ammo' }, async (payload) => {
    console.log('📦 Low Ammo Notification Received:', payload);

    const res = await fetch(emailFunctionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: myEmail,
        subject: '⚠️ Ammo Running Low',
        text: payload.payload?.message || 'Ammo dropped below 100 units.',
      }),
    });

    if (res.ok) {
      console.log('✅ Email sent!');
    } else {
      console.error('❌ Email send failed:', await res.text());
    }
  })
  .subscribe();

console.log('📡 Listening for low ammo notifications...');
