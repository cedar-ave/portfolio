// Dataset served by the Norway Facts API sample (see norway-facts.mjs and
// static/openapi/norway-facts.yaml). Plain module data, so the function has
// no database or external calls and every response is deterministic.

export const categories = [
  { id: 'geography', name: 'Geography', description: 'Mountains, fjords, glaciers, lakes, and borders.' },
  { id: 'history', name: 'History', description: 'Independence, the constitution, exploration, and politics.' },
  { id: 'culture', name: 'Culture', description: 'Language, art, literature, food, and outdoor life.' },
  { id: 'nature', name: 'Nature', description: 'Wildlife, light, and the Arctic.' },
  { id: 'economy', name: 'Economy', description: 'Energy, industry, and public finance.' },
];

export const facts = [
  { id: 1, category: 'geography', title: 'A very long coastline', text: 'Counting every fjord, mainland Norway has about 25,000 km of coastline. Including its islands, the total is about 100,000 km.' },
  { id: 2, category: 'geography', title: 'The king of fjords', text: 'Sognefjord is the longest and deepest fjord in Norway, at about 205 km long and over 1,300 m deep.' },
  { id: 3, category: 'geography', title: 'Highest peak in Northern Europe', text: 'Galdhøpiggen in Jotunheimen is 2,469 m tall, making it the highest mountain in Norway and in Northern Europe.' },
  { id: 4, category: 'geography', title: 'Three land neighbors', text: 'Norway shares land borders with Sweden, Finland, and Russia.' },
  { id: 5, category: 'geography', title: 'Largest lake', text: 'Mjøsa, north of Oslo, is the largest lake in Norway.' },
  { id: 6, category: 'geography', title: 'Mainland Europe\'s largest glacier', text: 'Jostedalsbreen in Vestland is the largest glacier in mainland Europe.' },
  { id: 7, category: 'geography', title: 'An Arctic archipelago', text: 'Svalbard, roughly halfway between mainland Norway and the North Pole, is part of Norway. Its largest settlement is Longyearbyen.' },
  { id: 8, category: 'history', title: 'Constitution Day', text: 'The Norwegian constitution was signed at Eidsvoll on 17 May 1814. Norwegians celebrate 17 May as their national day.' },
  { id: 9, category: 'history', title: 'Independence in 1905', text: 'Norway dissolved its union with Sweden in 1905 and became a fully independent kingdom.' },
  { id: 10, category: 'history', title: 'First to the South Pole', text: 'Roald Amundsen\'s expedition was the first to reach the South Pole, on 14 December 1911.' },
  { id: 11, category: 'history', title: 'Two votes against the EU', text: 'Norwegian voters rejected membership in the European Community in 1972 and in the European Union in 1994.' },
  { id: 12, category: 'history', title: 'The Peace Prize', text: 'The Nobel Peace Prize is awarded in Oslo, while the other Nobel Prizes are awarded in Stockholm.' },
  { id: 13, category: 'culture', title: 'Two written standards', text: 'Norwegian has two official written standards, Bokmål and Nynorsk.' },
  { id: 14, category: 'culture', title: 'Sámi languages', text: 'Sámi languages have official status in Norway, and the Sámi Parliament (Sámediggi) meets in Karasjok.' },
  { id: 15, category: 'culture', title: 'The Scream', text: 'Edvard Munch, who painted The Scream, was Norwegian. The National Museum and the Munch museum in Oslo both hold versions of it.' },
  { id: 16, category: 'culture', title: 'A Doll\'s House', text: 'Henrik Ibsen, often called the father of modern drama, wrote A Doll\'s House in 1879.' },
  { id: 17, category: 'culture', title: 'Brown cheese', text: 'Brunost is a sweet, caramel-colored cheese made from whey, usually sliced thin with a cheese slicer.' },
  { id: 18, category: 'culture', title: 'The right to roam', text: 'Allemannsretten gives everyone the right to walk, camp, and pick berries on uncultivated land, including private land, as long as they act responsibly.' },
  { id: 19, category: 'nature', title: 'Midnight sun', text: 'North of the Arctic Circle the sun doesn\'t set for part of the summer. At Nordkapp it stays above the horizon from mid-May to late July.' },
  { id: 20, category: 'nature', title: 'Polar bears', text: 'Polar bears live on Svalbard, where people leaving the settlements are required to carry protection against them.' },
  { id: 21, category: 'nature', title: 'Wild reindeer', text: 'Southern Norway is home to most of Europe\'s remaining wild mountain reindeer.' },
  { id: 22, category: 'nature', title: 'Muskoxen on Dovrefjell', text: 'A herd of muskoxen, reintroduced from Greenland in the mid-1900s, lives on the Dovrefjell plateau.' },
  { id: 23, category: 'economy', title: 'Hydropower', text: 'Hydropower generates close to 90% of Norway\'s electricity.' },
  { id: 24, category: 'economy', title: 'Electric cars', text: 'About nine out of ten new passenger cars sold in Norway in 2024 were fully electric.' },
  { id: 25, category: 'economy', title: 'Oil fund', text: 'The Government Pension Fund Global, funded by petroleum revenue, is one of the largest sovereign wealth funds in the world.' },
  { id: 26, category: 'economy', title: 'Farmed salmon', text: 'Norway is the world\'s largest producer of farmed Atlantic salmon.' },
  { id: 27, category: 'economy', title: 'Ekofisk', text: 'The discovery of the Ekofisk field in the North Sea in 1969 started Norway\'s oil age.' },
];

// The 15 counties (fylker) in effect since 1 January 2024.
export const counties = [
  { code: '03', name: 'Oslo', administrativeCenter: 'Oslo' },
  { code: '11', name: 'Rogaland', administrativeCenter: 'Stavanger' },
  { code: '15', name: 'Møre og Romsdal', administrativeCenter: 'Molde' },
  { code: '18', name: 'Nordland', administrativeCenter: 'Bodø' },
  { code: '31', name: 'Østfold', administrativeCenter: 'Sarpsborg' },
  { code: '32', name: 'Akershus', administrativeCenter: 'Oslo' },
  { code: '33', name: 'Buskerud', administrativeCenter: 'Drammen' },
  { code: '34', name: 'Innlandet', administrativeCenter: 'Hamar' },
  { code: '39', name: 'Vestfold', administrativeCenter: 'Tønsberg' },
  { code: '40', name: 'Telemark', administrativeCenter: 'Skien' },
  { code: '42', name: 'Agder', administrativeCenter: 'Kristiansand' },
  { code: '46', name: 'Vestland', administrativeCenter: 'Bergen' },
  { code: '50', name: 'Trøndelag', administrativeCenter: 'Steinkjer' },
  { code: '55', name: 'Troms', administrativeCenter: 'Tromsø' },
  { code: '56', name: 'Finnmark', administrativeCenter: 'Vadsø' },
];
