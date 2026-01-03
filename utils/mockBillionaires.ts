// mock people
export const sampleNames = [
  "Elon Musk", "Jeff Bezos", "Bernard Arnault", "Bill Gates", "Mark Zuckerberg",
  "Warren Buffett", "Larry Ellison", "Larry Page", "Sergey Brin", "Steve Ballmer",
  "Mukesh Ambani", "Francoise Bettencourt Meyers", "Amancio Ortega", "Alice Walton",
  "Jim Walton", "Rob Walton", "Alice Li", "Zhang Yiming", "Ma Huateng", "Gautam Adani",
  "Richard Branson", "Carlos Slim", "Michael Bloomberg", "Jack Ma", "Phil Knight",
  "Sheldon Adelson", "Oprah Winfrey", "Li Ka-shing", "Ray Dalio", "Charles Koch",
  "David Koch", "George Soros", "Hasso Plattner", "Stefan Quandt", "Susanne Klatten",
  "Vagit Alekperov", "Leonid Mikhelson", "Masayoshi Son", "Peter Thiel", "John Doerr",
  "Tony Stark", "Bruce Wayne", "Scrooge McDuck", "Willy Wonka", "Richie Rich",
  "Goldfinger", "Cash McQueen", "Billionaire Bob", "Count Moneybags", "Sir Spendsalot",
  "Dolla Dolla Bill", "Big Bank Benny", "Caviar Carl", "Lambo Larry", "Fendi Fred",
  "Chad Cashington", "Richie McRichface", "Eliza Dough", "Moola Mike", "Bankroll Betty",
  "Hugh Hefner Jr.", "Cashmere Kate", "Diamond Dan", "Gilded George", "Platinum Pete",
  "Richie McCheddar", "Count Coin", "Money McFly", "Luxor Lucy", "Opulent Oliver",
  "Sir Lendsalot", "Fortune Frank", "Moneybags Mason", "Cash King Karl", "Richie B",
  "Bling Bling Bella", "Doughboy Dave", "Cashmere Carl", "Richie Rolls", "Fortune Fiona",
  "Goldie Goldstein", "Mister Money", "Dollar Dave", "Billions Ben", "C.R.E.A.M. Carl",
  "Faux Gates", "Not Bezos", "Mark Zuckerman", "Elon Mask", "Jeff Beezo", "Warren Buffoon",
  "Larry Ellison Jr.", "Alice Waltonette", "Jim Wally", "Robbie Waltons", "Alice Lee",
  "Zhang Yiming Jr.", "Ma Huateng Sr.", "Gautam Add-on", "Billionaire Bill", "Rich Rick",
  "Dollar Dora", "Lambo Liz", "Cash Cat", "Money Moose", "Plush Pete", "Fortune Felix",
  "Opulent Opal", "Blingy Bryan", "Rich Ruby", "Sir Spendalot II", "Big Bucks Bob",
  "Caviar Caitlyn", "Lux Lex", "Diamond Diana", "Moola Milo", "Bankroll Brooke",
  "Richie Richerson", "Count Cashington", "Dollar Doug", "Billion Buck Barry", "Cashmere Connie",
  "Gold Graham", "Cashy Carl", "Money Margo", "Richie Ritchie", "Bling Benny", "Fendi Faye",
  "Lambo Lance", "Fortune Freda", "Opulent Oscar", "Luxor Larry", "Diamond Duke",
  "Cashmere Claudia", "Rich Rex", "Billionaire Bea", "Sir Rich-a-lot", "Money Mervin",
  "Platinum Paula", "C.R.E.A.M. Chris", "Dollar Donna", "Big Bank Bella", "Bling Brianna",
  "Cash Catnip", "Richie Rollo", "Moola Monica", "Fortune Freddie", "Goldie Garth",
  "Money Maddy", "Lambo Leo", "Cashmere Celine", "Bankroll Barry", "Richie Rocket",
  "Count Cashley", "Dollar Dawn", "Billionaire Benny", "Opulent Olivia", "Fortune Felix Jr.",
  "Lux Louie", "Diamond Dee", "Money Monty", "Richie Rush", "Platinum Patrick", "Cashmere Cass",
  "Bling Bling Brandon", "Richie Richson", "Count Cashmore", "Dollar Dylan", "Big Bucks Bianca"
];

const currencies = ["USD", "EUR", "JPY", "GBP", "CHF", "AUD", "CNY"];

export const generatePeople = () => {
  const count = Math.floor(Math.random() * 101) + 67; // 67–167
  const people: any[] = [];

  for (let i = 1; i <= count; i++) {
    let id = i;
    let name = "";
    let showName = false;
    let billions = "0.00";
    let showMoney = false;
    let currency = currencies[Math.floor(Math.random() * currencies.length)];

    // Special billionaire at user id
    if (i === count) {
      people.push({
        id,
        name: "New user",
        showName: false,
        billions: "0",
        showMoney: false,
        currency: "USD",
      });
      continue;
    }

    // Randomly decide visibility
    const visibilityRand = Math.random();
    if (visibilityRand < 0.2) {
      // Show name only
      showName = true;
      showMoney = false;
    } else if (visibilityRand < 0.55) {
      // Show money only
      showName = false;
      showMoney = true;
    } else if (visibilityRand < 0.95) {
      // Show both
      showName = true;
      showMoney = true;
    } else {
      // Show neither
      showName = false;
      showMoney = false;
    }

    if (showName) {
      // Pick a random name from the list
      name = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    }

    if (showMoney) {
      billions = (Math.random() * 100).toFixed(2);
    }

    people.push({ id, name, showName, billions, showMoney, currency });
  }

  return people;
};