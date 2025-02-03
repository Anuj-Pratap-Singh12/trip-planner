export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole travels in exploration',
    icon: '➜',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travels in tandem',
    icon: '🥂',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '🏡',
    people: '3 to 5 People'
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '🪙',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: "Don't worry about the cost",
    icon: '💵',
    people: '3 to 5 People'
  }
];

export const AI_PROMPT='Generate Travel Plan for Location: {location} for {totalDays} Days for {traveler} with a {budget} budget. Give me a Hotels   options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions, and suggest itinerary with placeName, Place Details, Place Image URL, Geo Coordinates, Ticket Pricing, Time to travel each of the locations for 3 days with each day plan with best time to visit in JSON format.'