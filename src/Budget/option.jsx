export const TravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo travels in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travel in tandem',
        icon:'👨‍👩',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'🍻',
        people:'5 to 10 People'
    },
]

export const BudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💸',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💰',
    },
]


export const AI_PROMPT='Generate Travel Plan for Location : {location} for {totalDays} Days for {travelers} with a {budget} budget, give me Hotels optons list with HotelName, Hotel address, Price,hotel image url,geo coordinates,rating,description and suggest itinerary with placeName,Place Details,Place Image Url,Geo Coordinates,Ticket Pricing,Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'