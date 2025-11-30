// Remove the explicit import of 'Scan' icon from lucide-react in your main file
// Only include the static data and config here

export const appId = 'sake-8a8e4';

export const firebaseConfig = {
    apiKey: "AIzaSyB8bJcU2vVs3nZ-XqMM3aXbHThXCFldIAc",
    authDomain: "sake-8a8e4.firebaseapp.com",
    projectId: "sake-8a8e4",
    storageBucket: "sake-8a8e4.firebasestorage.app",
    messagingSenderId: "697705849107",
    appId: "1:697705849107:web:809786a5244264650afae6",
    measurementId: "G-56622PCEYN"
};

export const initialAuthToken = null;

export const SAKE_DATA = [
    { id: 'sake-1', name: 'Dassai 45', brewery: 'Asahi Shuzo', region: 'Yamaguchi', style: 'Junmai Daiginjo', location: 'Booth A1', flavor: 'Fruity, elegant, clean finish.' },
    { id: 'sake-2', name: 'Kubota Senju', brewery: 'Asahi Shuzo', region: 'Niigata', style: 'Ginjo', location: 'Booth A2', flavor: 'Light, crisp, and dry with a hint of sweetness.' },
    { id: 'sake-3', name: 'Hakkaisan', brewery: 'Hakkaisan Brewery', region: 'Niigata', style: 'Junmai Ginjo', location: 'Booth B1', flavor: 'Clean, smooth, subtle aroma. Excellent food pairing.' },
    { id: 'sake-4', name: 'Wakatake Onikoroshi', brewery: 'Ohmuraya Shuzo', region: 'Shizuoka', style: 'Junmai', location: 'Booth B2', flavor: 'Bold and dry, strong flavor profile, masculine sake.' },
    { id: 'sake-5', name: 'Tamagawa Ice Breaker', brewery: 'Tamagawa', region: 'Kyoto', style: 'Junmai Namazake', location: 'Booth C1', flavor: 'Unpasteurized and vibrant. Best served chilled or on the rocks.' },
    { id: 'sake-6', name: 'Tatenokawa 50', brewery: 'Tatenokawa Shuzo', region: 'Yamagata', style: 'Junmai Daiginjo', location: 'Booth C2', flavor: 'Soft, well-rounded, notes of pear and melon.' },
];

export const VIEWS = {
    MAP: 'Map',
    SAKES: 'Sakes',
    PASSPORT: 'Passport',
};