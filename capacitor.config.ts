import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.suojasiipi.app',
  appName: 'Turvasiipi',
  webDir: 'public',
  server: {
    url: 'https://turvasiipi.vercel.app/',
    cleartext: true
  }
};

export default config;
