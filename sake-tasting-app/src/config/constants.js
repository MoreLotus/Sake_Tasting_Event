// Remove the explicit import of 'Scan' icon from lucide-react in your main file
// Only include the static data and config here

import stamp1 from '../custom_image/stamps/HK_01.png';
import stamp2 from '../custom_image/stamps/HK_02.png';
import stamp3 from '../custom_image/stamps/HK_03.png';
import stamp4 from '../custom_image/stamps/HK_04.png';
import stamp5 from '../custom_image/stamps/HK_05.png';
import stamp6 from '../custom_image/stamps/HK_06.png';
import stamp7 from '../custom_image/stamps/HK_07.png';
import stamp8 from '../custom_image/stamps/HK_08.png';
import stamp9 from '../custom_image/stamps/HK_09.png';
import stamp10 from '../custom_image/stamps/HK_10.png';
import stamp11 from '../custom_image/stamps/HK_11.png';


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
    { id: 'sake-1', name: 'Funaguchi', brewery: 'Kikusi', type: 'Nama Genshu', description: 'Funaguchi Kikusui Ichiban Shibori is Japans #1 unpasteurized, undiluted, cask strength nama sake, with a rich, full-bodied flavor and a refreshing.', location: 'N/A', abv: '19%' ,flavor: 'Unique taste of steamed rice, roasted hazelnuts, and tropical fruit.', pairs: 'Seafood, Meat', stampImage: stamp1},
    { id: 'sake-2', name: 'Junmai Ginjo', brewery: 'Arizona Sake', type: 'Nama', description: '2018 Tokyo Sake Competition – Gold Medal – Best Sake produced outside of Japan.', location: 'S5', abv: '15%', flavor: 'Mix of blueberry, pear, and peach. Slightly sweet, fresh, smooth.', pairs: 'Cheese or Savory Foods', stampImage: stamp2},
    { id: 'sake-3', name: 'Mio Sparkling', brewery: 'Shirakabegura', type: 'Sparkling', description: 'Named using the Japanese word for areas of light, shallow water in oceans or rivers, this sparkling sake has a playful carbonation.', location: 'N/A', abv: '5%' ,flavor: 'Flavors of grape and pear.', pairs: 'Aperitif', stampImage: stamp3},
    { id: 'sake-4', name: 'Hana Lychee', brewery: 'Takara', type: 'Flavored Sake', description: 'Captivating lychee aromatics and a sweet, full-bodied palate.', location: 'N/A', abv: '8%', flavor: 'Flavors of lychee, peach, and lemon.', pairs: 'Desserts', stampImage: stamp4},
    { id: 'sake-5', name: 'Hana Apple', brewery: 'Takara', type: 'Flavored Sake', description: 'This is a highly aromatic sake, overfl owing with ripe Fuji apple and marzipan.', location: 'N/A', abv: '8%', flavor: 'Hints of apple and white chocolate.', pairs: 'Desserts', stampImage: stamp5},
    { id: 'sake-6', name: 'Junmai ', brewery: 'Sho Chiku Bai', type: 'Junmai', description: 'classic, full-bodied Japanese sake known for its smooth, well-balanced profile.', location: 'N/A', abv: '16%', flavor: 'Flavors of vanilla, Cream, Spice, Cardamom.', pairs: 'Seafood, Meat', stampImage: stamp6},
    { id: 'sake-7', name: 'Roku ', brewery: 'Suntory', type: 'Gin', description: 'Means "6" in Japanese, made with six natural botanicals of sakura flower, sakura leaf, yuzu peel, green tea, gyokuro tea, and sanaho pepper.', location: 'S7', abv: '43%', flavor: 'Mix of juniper, floral, and citrus flavors.', pairs: 'Seafood, Meat', stampImage: stamp7},
    { id: 'sake-8', name: 'Haku ', brewery: 'Suntory', type: 'Vodka', description: 'Means "white" in Japanese, made from white rice and then bamboo charcoal filtered giving the vodka a soft, mellow character.', location: 'S7', abv: '40%', flavor: 'A clean, neutral, and mineral flavor.', pairs: 'Sushi', stampImage: stamp8},
    { id: 'sake-9', name: 'Toki ', brewery: 'Hibiki', type: 'Whisky', description: 'Means "time" in Japanese. This clear gold spirit features aromas of basil, green apple, and honey.', location: 'N/A', abv: '43%', flavor: 'Hints of vanilla oak, white pepper, and ginger.', pairs: 'Fried, Grilled Food', stampImage: stamp9},
    { id: 'sake-10', name: 'Spellbinder ', brewery: 'Wren House', type: 'Hazy IPA', description: '2020 Great American Beer Festival Gold Medal Winner.', location: 'S6', abv: '7%', flavor: 'Juicy, citrus, tropical, cream.', pairs: 'Seafood', stampImage: stamp10},
    { id: 'sake-11', name: 'Valley ', brewery: 'Wren House', type: 'Lager', description: 'GABF 2019 Silver, CBA Silver Winner - American Lager.', location: 'S6', abv: '4.6%', flavor: 'Crisp, clean, honey and spice.', pairs: 'Spicy Food', stampImage: stamp11},
]

export const OMAKASE_SAKE = [
    { id: 's1', brewery: 'Arizona Sake', name: 'Navajo Tea', type: 'Junmai Ginjo', description: 'Az Sake took their standard Junmai Ginjo sake and added wild-harvested Navajo Tea.   It is a very beautiful presentation with small slivers of the tea bush in the bottle.The tea and sake have been pasteurized but the color and flavor from the tea will continue to steep and deepen as the bottle gets older.', abv: '15%', flavor: 'Earthy, Clean, Fresh', pairs: 'Seafood'},
    { id: 's2', brewery: 'Arizona Sake', name: 'Desert Snow', type: 'Sparkling Nigori', description: 'An unfiltered Nigori that has a beautiful layer of sediment on the bottom. A slight agitation will cause the bottle to look like a snow globe.', abv: '15%', flavor: 'Fruity, Cream', pairs: 'Spicy Food'},
    { id: 's3', brewery: 'Hanagoi', name: 'Umeshu', type: 'Umeshu', description: 'Umeshu is a plum infused Sake. Slightly sweeter flavor making for a perfect apertif or digestif.', abv: '12%', flavor: 'Plum Citrus, Smooth', pairs: 'Seafood, Meat'},
    { id: 's4', brewery: 'Hakutsuru', name: 'Sayuri', type: 'Junmai Nigori', description: 'Sayuri means "little lily" a perfect description for this soft floral-noted Nigori. This unfiltered sake has a very light nose filled with lush cream, cherry blossom, and light fruit. Semi-sweet palate with a very smooth finish.', abv: '12.5%', flavor: 'Floral, Cream, Smooth', pairs: 'Spicy Food'}
]

export const OMAKASE_WHISKY = [
    { id: 'w1', brewery: 'Nikka', name: 'Whisky from the Barrel', type: 'Whisky', description: 'A blended whisky created to deliver full flavors and richness of whisky "from barrels." The liquid marriage is rested in used casks for 3-6 months. Awarded Gold Medal at the 2020 World Whiskies Awards. #1 Whisky of the Year - 2018', abv: '51%', flavor: 'Rich, Malt, Peat, Spice, Complex', pairs: 'Seafood, Spicy Food'},
    { id: 'w2', brewery: 'Yamazaki', name: '12 Year', type: 'Whisky', description: 'Vale of Yamazaki, Japan- Aged in casks of three different kinds of oaks: American, Spanish and Japanese which gives a unique taste. This is a medium-bodied whisky with the aromas of dried fruits and honey. It has a delicate, mellow taste with a lingering, woody, dry finish.', abv: '43%', flavor: 'Delicate, Butterscotch', pairs: 'Sushi'},
    { id: 'w3', brewery: 'Kaigen', name: '3 Year', type: 'Whisky', description: 'Japan- Kaigan whisky is a blend made from 100% Japanese whisky that has been aged a minimum of 3 years. The result is a whisky deep golden in color, with aromas of fresh oak and citrus fruits. A sweet honey and vanilla taste leads to a rich bold finish.', abv: '43%', flavor: 'Rich, Oak, Citrus, Honey', pairs: 'Seafood, Meat'}
]

export const VENDOR_DATA = [
    {id: 'v1', name: 'Hot Bamboo', instagram: 'hotbamboo', specialty: 'Food Stand', location: '1'},
    {id: 'v2', name: 'Let\'s Toast', instagram: 'letstoastofficial', specialty: 'Gourmet Korean BBQ Sandwiches', location: '2'},
    {id: 'v3', name: 'ThaiBBQ Sticks', instagram: 'thaistickphx', specialty: 'Thai Skewers', location: '3'},
    {id: 'v4', name: 'Kakigori', instagram: 'kakigoriaddict', specialty: 'Shaved Ice', location: '4'},
    {id: 'v5', name: 'Twisted Munchies', instagram: 'twisted_munchies_az', specialty: 'Birria Pho & Birria Bo Kho Tacos', location: '5'},
    {id: 'v6', name: 'Peko Eats', instagram: 'eatpeko.az', specialty: 'Food Truck', location: '6'},
    {id: 'v7', name: 'Phenomenal Street Eats', instagram: 'phonemenalstreeteats', specialty: 'Lao-Thai Craft BBQ Food Truck', location: '7'},
    {id: 'v8', name: 'GatchaX2', instagram: 'gacha.x2', specialty: 'Merchandise', location: '8'},
    {id: 'v9', name: 'Sloppy Brush', instagram: 'sloppy_brush', specialty: 'Local Artist', location: '9'},
    {id: 'v10', name: 'Mizumu', instagram: 'mizumori.shop', specialty: 'Shopping & Retail', location: '10'},
    {id: 'v11', name: 'Desert Grace Beauty', instagram: 'desertgracestudio', specialty: 'Tatto & Piercing Shop', location: '11'},
    {id: 'v12', name: 'Kinkan Gifts + Stationary', instagram: 'kinkangifts', specialty: 'Shopping & Retail', location: '12'},
    {id: 'v13', name: 'Smackarons', instagram: 'dawnsmackarons', specialty: 'Macarons', location: '13'},
    {id: 'v14', name: 'Cutesew Luna', instagram: 'cutesewluna', specialty: 'Local Artist', location: '14'},
    {id: 'v15', name: 'Shibabitz', instagram: 'shibabitz', specialty: 'Local Artist', location: '15'},
    {id: 'v16', name: 'Rugalia', instagram: 'rugaliadesigns', specialty: 'Local Artist', location: '16'},
]

export const VIEWS = {
    MAP: 'Map',
    WELCOME: 'Welcome',
    SAKES: 'Sakes',
    PASSPORT: 'Passport',
    VENDORS: 'Vendors'
};