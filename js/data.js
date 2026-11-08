/**
 * IIIT Bhubaneswar Mess Management System - Seed Dataset
 * Institution: Indian Institute of Information Technology, Bhubaneswar
 * Campus: Gothapatna, Malipada, Bhubaneswar, Odisha 751003
 */

const SEED_DATA = {
  institution: {
    name: "Indian Institute of Information Technology Bhubaneswar",
    shortName: "IIIT-Bh",
    tagline: "Autonomous Institute of Govt. of Odisha",
    address: "Gothapatna, Malipada, Bhubaneswar, Odisha 751003",
    messCommitteeChair: "Dr. P. K. Sahoo (Chief Warden)",
    emergencyHelpline: "+91 674 2653 300 / mess@iiit-bh.ac.in",
    currency: "₹",
    dailyRebateRate: 120, // ₹120 refunded per rebate day
    monthlyBaseFee: 3600 // ₹3,600 standard monthly mess fee
  },

  users: [
    {
      id: "std-001",
      name: "Sourav Mohapatra",
      role: "student",
      rollNo: "B121045",
      branch: "Computer Science & Engineering",
      year: "3rd Year",
      hostel: "Mahanadi (BH-1)",
      roomNo: "304",
      messHall: "Central Mess",
      dietPref: "Non-Veg",
      balance: -240, // excess or due
      monthlyBase: 3600,
      avatar: "SM",
      phone: "+91 98612 34567"
    },
    {
      id: "std-002",
      name: "Ananya Mishra",
      role: "student",
      rollNo: "B222019",
      branch: "Information Technology",
      year: "2nd Year",
      hostel: "Daya Hall (GH)",
      roomNo: "212",
      messHall: "South Mess",
      dietPref: "Veg",
      balance: 120,
      monthlyBase: 3600,
      avatar: "AM",
      phone: "+91 94371 88990"
    },
    {
      id: "mgr-001",
      name: "Mr. Ramesh Pradhan",
      role: "manager",
      title: "Chief Caterer & Mess Contractor",
      agency: "Utkal Caterers & Hospitality Ltd.",
      assignedMess: "Central Mess",
      phone: "+91 97760 12345"
    },
    {
      id: "adm-001",
      name: "Dr. P. K. Sahoo",
      role: "warden",
      title: "Hostel Chief Warden & Mess In-Charge",
      department: "Dept. of Computer Engineering",
      cabin: "Academic Block B-204",
      phone: "+91 674 2653 320"
    }
  ],

  hostels: [
    { id: "bh1", name: "Mahanadi Hall (BH-1)", type: "Boys", capacity: 450, currentOccupancy: 418, mess: "Central Mess" },
    { id: "bh2", name: "Brahmaputra Hall (BH-2)", type: "Boys", capacity: 400, currentOccupancy: 382, mess: "North Mess" },
    { id: "bh3", name: "Baitarani Hall (BH-3)", type: "Boys", capacity: 350, currentOccupancy: 320, mess: "North Mess" },
    { id: "gh1", name: "Daya Hall (GH-1)", type: "Girls", capacity: 300, currentOccupancy: 285, mess: "South Mess" },
    { id: "gh2", name: "Rushikulya Wing (GH-2)", type: "Girls", capacity: 250, currentOccupancy: 230, mess: "South Mess" }
  ],

  messes: [
    {
      id: "central",
      name: "Central Mess (Mahanadi Ground)",
      caterer: "Utkal Caterers Pvt Ltd",
      capacity: 450,
      currentCrowdPct: 68,
      avgWaitMins: 7,
      status: "Open - Serving Dinner",
      counters: 4,
      specialty: "Multi-Cuisine & Odia Delicacies"
    },
    {
      id: "north",
      name: "North Mess (Brahmaputra)",
      caterer: "Kalinga Food Services",
      capacity: 380,
      currentCrowdPct: 44,
      avgWaitMins: 3,
      status: "Open - Fast Queue",
      counters: 3,
      specialty: "Special Diet & Quick Service"
    },
    {
      id: "south",
      name: "South Mess (Daya/Rushikulya)",
      caterer: "Annapurna Hospitality",
      capacity: 350,
      currentCrowdPct: 78,
      avgWaitMins: 9,
      status: "Busy - High Traffic",
      counters: 3,
      specialty: "Healthy Balance & Fresh Juices"
    }
  ],

  mealSlots: [
    { id: "breakfast", name: "Breakfast", timeRange: "07:30 AM - 09:30 AM", startHour: 7.5, endHour: 9.5, price: 50 },
    { id: "lunch", name: "Lunch", timeRange: "12:30 PM - 02:30 PM", startHour: 12.5, endHour: 14.5, price: 90 },
    { id: "snacks", name: "Evening Snacks", timeRange: "05:00 PM - 06:30 PM", startHour: 17.0, endHour: 18.5, price: 40 },
    { id: "dinner", name: "Dinner", timeRange: "07:30 PM - 09:45 PM", startHour: 19.5, endHour: 21.75, price: 90 }
  ],

  // 7-day Weekly Menu for IIIT Bhubaneswar Mess
  weeklyMenu: {
    Monday: {
      breakfast: {
        items: [
          { name: "Steamed Idli (4 pcs)", type: "veg", cals: 210, protein: "6g", carbs: "42g", fat: "1g" },
          { name: "Medu Vada (1 pc)", type: "veg", cals: 160, protein: "4g", carbs: "18g", fat: "8g" },
          { name: "Vegetable Sambar & Coconut Chutney", type: "veg", cals: 110, protein: "3g", carbs: "15g", fat: "3g" },
          { name: "Boiled Eggs (2 pcs) [Optional Non-Veg]", type: "non-veg", cals: 140, protein: "12g", carbs: "1g", fat: "9g" },
          { name: "Fresh Tea / Coffee & Bread Jam", type: "veg", cals: 130, protein: "3g", carbs: "26g", fat: "2g" }
        ],
        highlight: "Fresh South Indian Breakfast with crispy hot vadas",
        rating: 4.6
      },
      lunch: {
        items: [
          { name: "Steamed Rice & Phulka Roti", type: "veg", cals: 280, protein: "7g", carbs: "58g", fat: "2g" },
          { name: "Traditional Odia Dalma (Lentils + Raw Papaya, Pumpkin & Plantain)", type: "veg", cals: 160, protein: "9g", carbs: "24g", fat: "3g" },
          { name: "Paneer Butter Masala (Veg)", type: "veg", cals: 290, protein: "12g", carbs: "14g", fat: "22g" },
          { name: "Egg Curry 2 Eggs (Non-Veg option)", type: "non-veg", cals: 240, protein: "14g", carbs: "8g", fat: "16g" },
          { name: "Aloo Potol Bhaja (Pointed Gourd Fry)", type: "veg", cals: 120, protein: "2g", carbs: "16g", fat: "6g" },
          { name: "Fresh Curd, Green Salad & Roasted Papad", type: "veg", cals: 90, protein: "4g", carbs: "10g", fat: "3g" }
        ],
        highlight: "Authentic Odia Dalma with tempered roasted cumin-chilli powder",
        rating: 4.8
      },
      snacks: {
        items: [
          { name: "Singada (Crispy Samosa - 2 pcs)", type: "veg", cals: 260, protein: "4g", carbs: "32g", fat: "14g" },
          { name: "Spicy Ghugni (Yellow Pea Curry)", type: "veg", cals: 140, protein: "6g", carbs: "22g", fat: "3g" },
          { name: "Karak Masala Chai & Green Chutney", type: "veg", cals: 95, protein: "2g", carbs: "14g", fat: "3g" }
        ],
        highlight: "Hot Singada-Ghugni combo, campus rain favorite!",
        rating: 4.7
      },
      dinner: {
        items: [
          { name: "Tawa Roti with Desi Ghee", type: "veg", cals: 220, protein: "6g", carbs: "40g", fat: "4g" },
          { name: "Jeera Pulao", type: "veg", cals: 210, protein: "4g", carbs: "42g", fat: "3g" },
          { name: "Dal Tadka (Yellow Lentils)", type: "veg", cals: 150, protein: "8g", carbs: "20g", fat: "4g" },
          { name: "Kadhai Paneer (Veg)", type: "veg", cals: 260, protein: "11g", carbs: "12g", fat: "18g" },
          { name: "Chicken Curry (Odisha Style)", type: "non-veg", cals: 310, protein: "26g", carbs: "6g", fat: "19g" },
          { name: "Hot Gulab Jamun (1 pc)", type: "veg", cals: 150, protein: "2g", carbs: "26g", fat: "5g" }
        ],
        highlight: "Odisha rustic chicken curry & soft hot gulab jamun",
        rating: 4.9
      }
    },
    Tuesday: {
      breakfast: {
        items: [
          { name: "Puri (4 pcs) & Aloo Dum (Odia style)", type: "veg", cals: 380, protein: "7g", carbs: "52g", fat: "16g" },
          { name: "Sooji Halwa", type: "veg", cals: 180, protein: "3g", carbs: "32g", fat: "5g" },
          { name: "Sprouts Salad with Lime & Lemon Tea", type: "veg", cals: 90, protein: "6g", carbs: "14g", fat: "1g" },
          { name: "Boiled Eggs (2 pcs)", type: "non-veg", cals: 140, protein: "12g", carbs: "1g", fat: "9g" }
        ],
        highlight: "Crispy puris with aromatic Aloo Dum & Sooji Halwa",
        rating: 4.7
      },
      lunch: {
        items: [
          { name: "Rice & Butter Rotis", type: "veg", cals: 280, protein: "7g", carbs: "58g", fat: "3g" },
          { name: "Moong Dal with Ginger-Heeng tempering", type: "veg", cals: 140, protein: "8g", carbs: "22g", fat: "3g" },
          { name: "Rajma Masala (Slow cooked Punjabi style)", type: "veg", cals: 240, protein: "12g", carbs: "36g", fat: "5g" },
          { name: "Bhindi Do Pyaza (Okra stir fry)", type: "veg", cals: 110, protein: "2g", carbs: "14g", fat: "5g" },
          { name: "Fresh Onion-Cucumber Salad, Boondi Raita", type: "veg", cals: 95, protein: "3g", carbs: "12g", fat: "4g" }
        ],
        highlight: "Nutritious slow-cooked Rajma Chawal with fresh boondi raita",
        rating: 4.5
      },
      snacks: {
        items: [
          { name: "Veg Bread Roll / Cutlet (2 pcs)", type: "veg", cals: 220, protein: "4g", carbs: "28g", fat: "10g" },
          { name: "Mint-Coriander Chutney & Tomato Dip", type: "veg", cals: 40, protein: "1g", carbs: "6g", fat: "1g" },
          { name: "Hot Coffee / Cardamom Tea", type: "veg", cals: 95, protein: "2g", carbs: "14g", fat: "3g" }
        ],
        highlight: "Golden spiced veggie cutlets with herb dip",
        rating: 4.4
      },
      dinner: {
        items: [
          { name: "Chapati & Steamed Rice", type: "veg", cals: 240, protein: "6g", carbs: "50g", fat: "2g" },
          { name: "Mix Veg Lababdar", type: "veg", cals: 190, protein: "5g", carbs: "18g", fat: "11g" },
          { name: "Chana Dal Tadka", type: "veg", cals: 160, protein: "9g", carbs: "24g", fat: "4g" },
          { name: "Fish Curry in Mustard Paste (Macha Besara)", type: "non-veg", cals: 280, protein: "22g", carbs: "7g", fat: "17g" },
          { name: "Paneer Kofta (Veg Option)", type: "veg", cals: 270, protein: "10g", carbs: "16g", fat: "18g" },
          { name: "Sweet Custard with Fruits", type: "veg", cals: 130, protein: "3g", carbs: "24g", fat: "3g" }
        ],
        highlight: "Tuesday Special Macha Besara (Traditional Odia Rohu Fish)",
        rating: 4.8
      }
    },
    Wednesday: {
      breakfast: {
        items: [
          { name: "Kanda Poha with Peanuts & Crispy Sev", type: "veg", cals: 260, protein: "6g", carbs: "44g", fat: "7g" },
          { name: "Coconut Chutney", type: "veg", cals: 80, protein: "1g", carbs: "5g", fat: "6g" },
          { name: "Masala Omelette (Double Egg)", type: "non-veg", cals: 180, protein: "13g", carbs: "2g", fat: "13g" },
          { name: "Banana (1 pc) & Milk / Tea", type: "veg", cals: 140, protein: "4g", carbs: "28g", fat: "2g" }
        ],
        highlight: "Light wholesome Poha with double egg masala omelette",
        rating: 4.5
      },
      lunch: {
        items: [
          { name: "Steamed Rice & Soft Rotis", type: "veg", cals: 280, protein: "7g", carbs: "58g", fat: "2g" },
          { name: "Masoor Dal with Tomato-Garlic Tadka", type: "veg", cals: 150, protein: "8g", carbs: "22g", fat: "3g" },
          { name: "Chole Masala (Amritsari chickpeas)", type: "veg", cals: 240, protein: "11g", carbs: "34g", fat: "7g" },
          { name: "Baigana Bhaja (Crispy Fried Eggplant slice)", type: "veg", cals: 130, protein: "2g", carbs: "14g", fat: "8g" },
          { name: "Plain Curd, Lemon Salad & Papad", type: "veg", cals: 85, protein: "4g", carbs: "9g", fat: "3g" }
        ],
        highlight: "Spicy Chole with hot rice and classic Odia Baigana Bhaja",
        rating: 4.6
      },
      snacks: {
        items: [
          { name: "Onion Pakoda (Pyaji) with Fried Green Chillies", type: "veg", cals: 240, protein: "4g", carbs: "26g", fat: "13g" },
          { name: "Tangy Tamarind Chutney", type: "veg", cals: 50, protein: "0g", carbs: "12g", fat: "0g" },
          { name: "Ginger Masala Tea", type: "veg", cals: 90, protein: "2g", carbs: "14g", fat: "3g" }
        ],
        highlight: "Crunchy Cuttack-style Pyaji with steaming ginger tea",
        rating: 4.8
      },
      dinner: {
        items: [
          { name: "Veg Hyderabadi Biryani with Mirchi Salan", type: "veg", cals: 360, protein: "9g", carbs: "54g", fat: "12g" },
          { name: "Chicken Dum Biryani (Non-Veg)", type: "non-veg", cals: 490, protein: "29g", carbs: "52g", fat: "17g" },
          { name: "Paneer Tikka Masala (Veg Special)", type: "veg", cals: 290, protein: "13g", carbs: "14g", fat: "20g" },
          { name: "Cucumber Onion Raita & Roasted Papad", type: "veg", cals: 85, protein: "3g", carbs: "10g", fat: "3g" },
          { name: "Odia Chhena Poda (Caramelized Cottage Cheese Dessert)", type: "veg", cals: 190, protein: "6g", carbs: "24g", fat: "8g" }
        ],
        highlight: "MID-WEEK FEAST: Dum Biryani & Authentic Chhena Poda",
        rating: 4.95
      }
    },
    Thursday: {
      breakfast: {
        items: [
          { name: "Uttapam with Onion & Tomato toppings (2 pcs)", type: "veg", cals: 240, protein: "5g", carbs: "42g", fat: "5g" },
          { name: "Mixed Vegetable Sambar & Tomato Chutney", type: "veg", cals: 105, protein: "3g", carbs: "16g", fat: "3g" },
          { name: "Boiled Eggs (2 pcs)", type: "non-veg", cals: 140, protein: "12g", carbs: "1g", fat: "9g" },
          { name: "Milk / Bournvita / Tea", type: "veg", cals: 120, protein: "4g", carbs: "18g", fat: "3g" }
        ],
        highlight: "Crispy grilled uttapams with aromatic vegetable sambar",
        rating: 4.6
      },
      lunch: {
        items: [
          { name: "Rice & Butter Phulkas", type: "veg", cals: 280, protein: "7g", carbs: "58g", fat: "2g" },
          { name: "Arhar Dal Tadka", type: "veg", cals: 150, protein: "8g", carbs: "22g", fat: "3g" },
          { name: "Dum Aloo Kashmiri with Kasuri Methi", type: "veg", cals: 210, protein: "4g", carbs: "28g", fat: "9g" },
          { name: "Cabbage Matar Sabzi", type: "veg", cals: 110, protein: "3g", carbs: "16g", fat: "4g" },
          { name: "Dahi (Curd), Pickle & Fried Papad", type: "veg", cals: 90, protein: "4g", carbs: "10g", fat: "3g" }
        ],
        highlight: "Comforting Kashmiri Dum Aloo with fresh ghee phulkas",
        rating: 4.4
      },
      snacks: {
        items: [
          { name: "Sweet Corn Chaat with Butter & Herbs", type: "veg", cals: 180, protein: "5g", carbs: "30g", fat: "4g" },
          { name: "Biscuits (Good Day / Marie)", type: "veg", cals: 110, protein: "2g", carbs: "18g", fat: "4g" },
          { name: "Hot Coffee / Lemon Green Tea", type: "veg", cals: 80, protein: "1g", carbs: "12g", fat: "2g" }
        ],
        highlight: "Healthy buttered sweet corn chaat",
        rating: 4.3
      },
      dinner: {
        items: [
          { name: "Tawa Roti & Jeera Rice", type: "veg", cals: 250, protein: "6g", carbs: "52g", fat: "3g" },
          { name: "Dal Makhani (Overnight slow cooked)", type: "veg", cals: 240, protein: "9g", carbs: "26g", fat: "11g" },
          { name: "Shahi Paneer in Cashew Cream Gravy", type: "veg", cals: 290, protein: "12g", carbs: "14g", fat: "20g" },
          { name: "Egg Masala (2 Eggs in rich onion gravy)", type: "non-veg", cals: 230, protein: "13g", carbs: "9g", fat: "15g" },
          { name: "Ice Cream Cup (Vanilla / Butterscotch)", type: "veg", cals: 140, protein: "3g", carbs: "18g", fat: "7g" }
        ],
        highlight: "Rich Dal Makhani, Shahi Paneer & chilled dessert",
        rating: 4.7
      }
    },
    Friday: {
      breakfast: {
        items: [
          { name: "Stuffed Aloo Paratha (2 pcs) with Desi Butter", type: "veg", cals: 360, protein: "7g", carbs: "52g", fat: "14g" },
          { name: "Fresh Curd & Mango Pickle", type: "veg", cals: 80, protein: "3g", carbs: "8g", fat: "3g" },
          { name: "Boiled Eggs (2 pcs)", type: "non-veg", cals: 140, protein: "12g", carbs: "1g", fat: "9g" },
          { name: "Hot Tea / Coffee", type: "veg", cals: 90, protein: "2g", carbs: "14g", fat: "3g" }
        ],
        highlight: "Golden spiced Aloo Parathas with creamy curd",
        rating: 4.8
      },
      lunch: {
        items: [
          { name: "Rice & Rotis", type: "veg", cals: 280, protein: "7g", carbs: "58g", fat: "2g" },
          { name: "Odia Chana Dalma with raw banana & pumpkin", type: "veg", cals: 170, protein: "9g", carbs: "26g", fat: "3g" },
          { name: "Soyabean Aloo Kassa", type: "veg", cals: 210, protein: "14g", carbs: "22g", fat: "7g" },
          { name: "Crispy Alu Bhaja (Matchstick potato fry)", type: "veg", cals: 140, protein: "2g", carbs: "18g", fat: "7g" },
          { name: "Dahi Bundi Raita & Roasted Papad", type: "veg", cals: 95, protein: "3g", carbs: "12g", fat: "4g" }
        ],
        highlight: "Protein-rich Soyabean Kassa & crispy matchstick potatoes",
        rating: 4.5
      },
      snacks: {
        items: [
          { name: "Veg Chowmein with Chilli Sauce", type: "veg", cals: 260, protein: "5g", carbs: "42g", fat: "8g" },
          { name: "Hot Coffee / Cardamom Tea", type: "veg", cals: 90, protein: "2g", carbs: "14g", fat: "3g" }
        ],
        highlight: "Desi street style hakka chowmein with green chilli sauce",
        rating: 4.6
      },
      dinner: {
        items: [
          { name: "Phulka Roti & Peas Pulao", type: "veg", cals: 260, protein: "6g", carbs: "52g", fat: "3g" },
          { name: "Yellow Moong Dal Tadka", type: "veg", cals: 140, protein: "8g", carbs: "22g", fat: "3g" },
          { name: "Matar Paneer (Veg)", type: "veg", cals: 250, protein: "11g", carbs: "14g", fat: "16g" },
          { name: "Chicken Kassa (Odia spicy semi-gravy)", type: "non-veg", cals: 320, protein: "27g", carbs: "6g", fat: "20g" },
          { name: "Odia Rasagola (Hot 1 pc)", type: "veg", cals: 160, protein: "3g", carbs: "28g", fat: "4g" }
        ],
        highlight: "Weekend kickoff with Chicken Kassa & Pahala-style Rasagola",
        rating: 4.9
      }
    },
    Saturday: {
      breakfast: {
        items: [
          { name: "Masala Dosa with Potato Filling (1 large)", type: "veg", cals: 310, protein: "6g", carbs: "46g", fat: "11g" },
          { name: "Vegetable Sambar & Coconut Chutney", type: "veg", cals: 110, protein: "3g", carbs: "15g", fat: "3g" },
          { name: "Boiled Eggs (2 pcs)", type: "non-veg", cals: 140, protein: "12g", carbs: "1g", fat: "9g" },
          { name: "Filter Coffee / Milk / Tea", type: "veg", cals: 95, protein: "2g", carbs: "14g", fat: "3g" }
        ],
        highlight: "Crispy buttery Masala Dosa hot off the griddle",
        rating: 4.85
      },
      lunch: {
        items: [
          { name: "Steamed Rice & Rotis", type: "veg", cals: 280, protein: "7g", carbs: "58g", fat: "2g" },
          { name: "Panch Phoran Dal", type: "veg", cals: 145, protein: "8g", carbs: "22g", fat: "3g" },
          { name: "Kadhi Pakoda (Gram flour dumplings in tangy yogurt gravy)", type: "veg", cals: 220, protein: "7g", carbs: "22g", fat: "11g" },
          { name: "Aloo Gobi Matar Dry", type: "veg", cals: 130, protein: "3g", carbs: "18g", fat: "5g" },
          { name: "Green Chutney, Salad & Roasted Papad", type: "veg", cals: 50, protein: "1g", carbs: "8g", fat: "1g" }
        ],
        highlight: "Classic North Indian Kadhi Chawal with crunchy pakodas",
        rating: 4.5
      },
      snacks: {
        items: [
          { name: "Bread Pakoda stuffed with spicy mashed potato", type: "veg", cals: 250, protein: "5g", carbs: "32g", fat: "12g" },
          { name: "Green Chilli & Mint Chutney", type: "veg", cals: 35, protein: "1g", carbs: "5g", fat: "1g" },
          { name: "Ginger Masala Chai", type: "veg", cals: 90, protein: "2g", carbs: "14g", fat: "3g" }
        ],
        highlight: "Deep fried Bread Pakoda with spicy mint dip",
        rating: 4.5
      },
      dinner: {
        items: [
          { name: "Tawa Naan & Jeera Rice", type: "veg", cals: 280, protein: "7g", carbs: "54g", fat: "4g" },
          { name: "Dal Tadka", type: "veg", cals: 150, protein: "8g", carbs: "20g", fat: "4g" },
          { name: "Paneer Pasanda (Rich stuffed paneer gravy)", type: "veg", cals: 310, protein: "14g", carbs: "14g", fat: "22g" },
          { name: "Egg Bhurji Curry (Double Egg)", type: "non-veg", cals: 220, protein: "14g", carbs: "6g", fat: "15g" },
          { name: "Semiyan Kheer (Vermicelli pudding with dry fruits)", type: "veg", cals: 170, protein: "4g", carbs: "26g", fat: "6g" }
        ],
        highlight: "Rich royal Paneer Pasanda & rich saffron Semiyan Kheer",
        rating: 4.7
      }
    },
    Sunday: {
      breakfast: {
        items: [
          { name: "Paneer Paratha (2 pcs) with Amul Butter", type: "veg", cals: 380, protein: "12g", carbs: "48g", fat: "15g" },
          { name: "Boiled Eggs (2 pcs)", type: "non-veg", cals: 140, protein: "12g", carbs: "1g", fat: "9g" },
          { name: "Sweet Dahi (Misti Dahi cup)", type: "veg", cals: 120, protein: "4g", carbs: "18g", fat: "3g" },
          { name: "Tea / Coffee / Fruit Juice", type: "veg", cals: 95, protein: "1g", carbs: "18g", fat: "1g" }
        ],
        highlight: "Sunday leisurely breakfast with loaded Paneer Parathas",
        rating: 4.9
      },
      lunch: {
        items: [
          { name: "Fluffy Basmati Rice & Butter Rotis", type: "veg", cals: 280, protein: "7g", carbs: "58g", fat: "2g" },
          { name: "Odia Mung Dalma (Roasted moong with veggies)", type: "veg", cals: 160, protein: "9g", carbs: "24g", fat: "3g" },
          { name: "Paneer Butter Masala (Veg)", type: "veg", cals: 290, protein: "12g", carbs: "14g", fat: "22g" },
          { name: "Mutton Kassa OR Chicken Butter Masala (Non-Veg Special)", type: "non-veg", cals: 420, protein: "32g", carbs: "8g", fat: "28g" },
          { name: "Crispy Papad, Onion Salad & Sweet Chutney", type: "veg", cals: 80, protein: "2g", carbs: "14g", fat: "2g" },
          { name: "Cold Mango Drink", type: "veg", cals: 90, protein: "0g", carbs: "22g", fat: "0g" }
        ],
        highlight: "SUNDAY GRAND FEAST: Chicken Butter Masala & Festive Odia Dalma",
        rating: 4.95
      },
      snacks: {
        items: [
          { name: "Pani Puri / Puchka (6 pcs with spicy mint water)", type: "veg", cals: 180, protein: "3g", carbs: "32g", fat: "4g" },
          { name: "Special Masala Chai", type: "veg", cals: 90, protein: "2g", carbs: "14g", fat: "3g" }
        ],
        highlight: "Campus favorite Puchka Counter evening special",
        rating: 4.9
      },
      dinner: {
        items: [
          { name: "Special Ghee Rice & Soft Rumali Roti", type: "veg", cals: 290, protein: "6g", carbs: "54g", fat: "5g" },
          { name: "Dal Makhani", type: "veg", cals: 230, protein: "8g", carbs: "24g", fat: "10g" },
          { name: "Navratan Korma (Veg)", type: "veg", cals: 240, protein: "6g", carbs: "20g", fat: "15g" },
          { name: "Fish Finger / Egg Curry", type: "non-veg", cals: 290, protein: "18g", carbs: "12g", fat: "18g" },
          { name: "Hot Jalebi with Rabri (2 pcs)", type: "veg", cals: 220, protein: "4g", carbs: "34g", fat: "8g" }
        ],
        highlight: "Weekend finale: Crispy hot jalebis with rich thick rabri",
        rating: 4.9
      }
    }
  },

  // Sample Active Rebate Records
  rebates: [
    {
      id: "REB-2026-104",
      studentId: "std-001",
      studentName: "Sourav Mohapatra",
      rollNo: "B121045",
      hostel: "Mahanadi (BH-1)",
      messHall: "Central Mess",
      startDate: "2026-11-12",
      endDate: "2026-11-15",
      totalDays: 4,
      rebateAmount: 480, // 4 * 120
      reason: "Internship Interview & Techfest Hackathon at IIT Kharagpur",
      status: "Approved",
      appliedOn: "2026-11-05",
      approvedBy: "Dr. P. K. Sahoo (Warden)",
      approvedAt: "2026-11-06"
    },
    {
      id: "REB-2026-108",
      studentId: "std-001",
      studentName: "Sourav Mohapatra",
      rollNo: "B121045",
      hostel: "Mahanadi (BH-1)",
      messHall: "Central Mess",
      startDate: "2026-11-20",
      endDate: "2026-11-24",
      totalDays: 5,
      rebateAmount: 600,
      reason: "Attending Family Wedding in Cuttack",
      status: "Pending",
      appliedOn: "2026-11-07",
      approvedBy: null,
      approvedAt: null
    },
    {
      id: "REB-2026-092",
      studentId: "std-002",
      studentName: "Ananya Mishra",
      rollNo: "B222019",
      hostel: "Daya Hall (GH)",
      messHall: "South Mess",
      startDate: "2026-10-25",
      endDate: "2026-10-29",
      totalDays: 5,
      rebateAmount: 600,
      reason: "Medical leave for Dental Surgery",
      status: "Approved",
      appliedOn: "2026-10-20",
      approvedBy: "Dr. P. K. Sahoo (Warden)",
      approvedAt: "2026-10-21"
    }
  ],

  // Student Grievances & Food Quality Tickets
  grievances: [
    {
      id: "GRV-8012",
      studentId: "std-001",
      studentName: "Sourav Mohapatra",
      rollNo: "B121045",
      hostel: "Mahanadi (BH-1)",
      messHall: "Central Mess",
      category: "Food Temperature",
      meal: "Dinner",
      subject: "Rotis were cold during peak rush at 8:45 PM",
      description: "Counter 2 was serving pre-cooked rotis stacked in cold plates instead of hot casserole. Please ensure griddle rotation is maintained.",
      urgency: "Medium",
      status: "Resolved",
      submittedAt: "2026-11-04 21:05",
      response: "Caterer instructed to deploy two extra staff on tawa during 8:30-9:15 PM peak rush. Insulated warmers installed.",
      resolvedBy: "Ramesh Pradhan (Caterer) / Dr. P. K. Sahoo",
      rating: 4
    },
    {
      id: "GRV-8024",
      studentId: "std-002",
      studentName: "Ananya Mishra",
      rollNo: "B222019",
      hostel: "Daya Hall (GH)",
      messHall: "South Mess",
      category: "Water Quality & Hygiene",
      meal: "Lunch",
      subject: "RO Water Dispenser filter light is blinking red",
      description: "The drinking water cooler near the handwash area shows red service indicator. TDS should be tested urgently.",
      urgency: "High",
      status: "In Progress",
      submittedAt: "2026-11-06 14:10",
      response: "Maintenance technician dispatched; cartridge replacement in progress. Water test scheduled for tomorrow morning.",
      resolvedBy: "Estate Office & Warden",
      rating: null
    },
    {
      id: "GRV-8031",
      studentId: "std-001",
      studentName: "Sourav Mohapatra",
      rollNo: "B121045",
      hostel: "Mahanadi (BH-1)",
      messHall: "Central Mess",
      category: "Staff Hygiene",
      meal: "Breakfast",
      subject: "Counter staff missing headgear hairnets",
      description: "Two servers at the South counter were serving puris without hairnets or gloves.",
      urgency: "Medium",
      status: "Under Review",
      submittedAt: "2026-11-07 08:45",
      response: "Mess manager alerted. Mandatory hygiene gear checklist being verified.",
      resolvedBy: "Mess Committee",
      rating: null
    }
  ],

  // Extra Canteen / Add-on Items
  canteenExtras: [
    { id: "ext-1", name: "Double Egg Masala Omelette", price: 35, category: "Snacks", available: true, icon: "🍳" },
    { id: "ext-2", name: "Paneer Roll (Fresh Roomali)", price: 65, category: "Rolls", available: true, icon: "🌯" },
    { id: "ext-3", name: "Chicken Egg Kathi Roll", price: 80, category: "Rolls", available: true, icon: "🌯" },
    { id: "ext-4", name: "Cold Bournvita / Amul Kool (200ml)", price: 30, category: "Beverages", available: true, icon: "🧃" },
    { id: "ext-5", name: "Filter Coffee (Hot)", price: 20, category: "Beverages", available: true, icon: "☕" },
    { id: "ext-6", name: "Fresh Sweet Lime / Orange Juice", price: 40, category: "Beverages", available: true, icon: "🍊" },
    { id: "ext-7", name: "Extra Chicken Curry Bowl", price: 70, category: "Main Extras", available: true, icon: "🍗" },
    { id: "ext-8", name: "Extra Paneer Kadhai Bowl", price: 60, category: "Main Extras", available: true, icon: "🧀" },
    { id: "ext-9", name: "Gulab Jamun (Extra 2 pcs)", price: 30, category: "Dessert", available: true, icon: "🍯" }
  ],

  // Student Extra Purchases
  extraPurchases: [
    { id: "TX-401", studentId: "std-001", item: "Chicken Egg Kathi Roll", price: 80, date: "2026-11-04 22:30", status: "Billed" },
    { id: "TX-402", studentId: "std-001", item: "Double Egg Masala Omelette", price: 35, date: "2026-11-05 21:40", status: "Billed" },
    { id: "TX-403", studentId: "std-001", item: "Fresh Sweet Lime Juice", price: 40, date: "2026-11-06 17:15", status: "Billed" },
    { id: "TX-404", studentId: "std-001", item: "Amul Kool Kesar Milk", price: 30, date: "2026-11-07 18:20", status: "Billed" }
  ],

  // Pantry & Raw Material Inventory (Caterer Portal)
  inventory: [
    { id: "inv-1", name: "Basmati Rice (Grade A)", category: "Grains", currentStock: 340, unit: "kg", minThreshold: 150, lastRestocked: "2026-11-05", status: "Normal" },
    { id: "inv-2", name: "Whole Wheat Atta (Aashirvaad)", category: "Grains", currentStock: 280, unit: "kg", minThreshold: 120, lastRestocked: "2026-11-04", status: "Normal" },
    { id: "inv-3", name: "Arhar / Toor Dal", category: "Pulses", currentStock: 95, unit: "kg", minThreshold: 80, lastRestocked: "2026-11-02", status: "Low Stock" },
    { id: "inv-4", name: "Mustard Cooking Oil (Fortune)", category: "Oils", currentStock: 65, unit: "Litre", minThreshold: 40, lastRestocked: "2026-11-06", status: "Normal" },
    { id: "inv-5", name: "Refined Sunflower Oil", category: "Oils", currentStock: 80, unit: "Litre", minThreshold: 50, lastRestocked: "2026-11-06", status: "Normal" },
    { id: "inv-6", name: "Fresh Dairy Milk (OMFED)", category: "Dairy", currentStock: 120, unit: "Litre", minThreshold: 60, lastRestocked: "2026-11-07 (Daily)", status: "Normal" },
    { id: "inv-7", name: "Fresh Cottage Cheese (Paneer)", category: "Dairy", currentStock: 45, unit: "kg", minThreshold: 30, lastRestocked: "2026-11-07", status: "Normal" },
    { id: "inv-8", name: "Farm Chicken (Dress Cut)", category: "Meat", currentStock: 85, unit: "kg", minThreshold: 40, lastRestocked: "2026-11-07", status: "Normal" },
    { id: "inv-9", name: "Commercial LPG Cylinders (19kg)", category: "Fuel", currentStock: 5, unit: "Cylinders", minThreshold: 6, lastRestocked: "2026-11-03", status: "Low Stock" },
    { id: "inv-10", name: "Potatoes & Onions", category: "Vegetables", currentStock: 310, unit: "kg", minThreshold: 150, lastRestocked: "2026-11-06", status: "Normal" }
  ],

  // Vendor Procurement Invoices
  procurements: [
    { id: "PO-9912", vendor: "OMFED Milk Dairy Federation", items: "120 L Milk + 45 kg Paneer", amount: 15200, date: "2026-11-07", invoiceNo: "OMF/2026/884", paymentStatus: "Paid" },
    { id: "PO-9908", vendor: "Bhubaneswar Aiginia Wholesale Mandi", items: "Potatoes, Onions, Green Veggies", amount: 21450, date: "2026-11-06", invoiceNo: "AIG-7719", paymentStatus: "Paid" },
    { id: "PO-9895", vendor: "IOCL Commercial Gas Agency", items: "8x 19kg Commercial LPG Cylinders", amount: 14800, date: "2026-11-03", invoiceNo: "IOCL-GAS-441", paymentStatus: "Paid" }
  ],

  // Official Hygiene & FSSAI Audit Checklists (Warden Portal)
  audits: [
    {
      id: "AUD-2026-W44",
      date: "2026-11-06",
      messHall: "Central Mess",
      inspector: "Dr. P. K. Sahoo (Hostel Chief Warden)",
      scores: {
        cleanlinessUtensils: 92, // Max 100
        waterPurifierTDS: 95,
        foodTemperatureStorage: 90,
        staffHygieneGear: 86,
        wasteDisposalSegregation: 94
      },
      overallScore: 91.4,
      grade: "A (Excellent)",
      remarks: "Kitchen tiles and deep fryers steam-cleaned. Caterer advised to strictly enforce hairnets on all 4 serving counters.",
      fssaiCertExpiry: "2027-08-31"
    },
    {
      id: "AUD-2026-W43",
      date: "2026-10-30",
      messHall: "North Mess",
      inspector: "Mess Committee Inspection Squad",
      scores: {
        cleanlinessUtensils: 96,
        waterPurifierTDS: 98,
        foodTemperatureStorage: 94,
        staffHygieneGear: 92,
        wasteDisposalSegregation: 90
      },
      overallScore: 94.0,
      grade: "A+ (Outstanding)",
      remarks: "Exemplary cleanliness in dry storage pantry. All food temperature probes working accurately.",
      fssaiCertExpiry: "2027-06-15"
    }
  ],

  // Special Feast / Menu Voting Poll
  activePoll: {
    id: "POLL-2026-NOV2",
    title: "Upcoming Sunday Night Special Feast Menu",
    description: "Vote for your preferred grand dinner combo for Sunday, 15th November 2026.",
    closesIn: "3 Days remaining",
    totalVotes: 612,
    userHasVoted: false,
    selectedOption: null,
    options: [
      { id: "opt-1", name: "Hyderabadi Chicken Dum Biryani + Paneer Butter Masala + Gulab Jamun", votes: 348 },
      { id: "opt-2", name: "Kashmiri Pulao + Mutton Rogan Josh / Mushroom Tikka + Hot Jalebi Rabri", votes: 194 },
      { id: "opt-3", name: "Odia Royal Feast (Ghee Rice + Mutton Kassa / Dalma + Chhena Poda)", votes: 70 }
    ]
  },

  // Broadcast Circulars & Urgent Announcements
  announcements: [
    {
      id: "ANN-301",
      title: "Mid-Semester Examination Mess Timings Adjusted",
      date: "2026-11-06",
      category: "Exam Schedule",
      priority: "High",
      content: "In view of Mid-Sem Exams starting 16th Nov, Breakfast counters will remain open until 10:15 AM, and Night Canteen will operate extended hours until 2:30 AM with fresh tea, eggs and sandwiches.",
      issuedBy: "Chief Warden Office"
    },
    {
      id: "ANN-298",
      title: "Water Purifier Routine Maintenance across all 3 Messes",
      date: "2026-11-04",
      category: "Hygiene",
      priority: "Normal",
      content: "Quarterly servicing of commercial RO plants and ultraviolet filters will be conducted on Saturday between 3:00 PM and 4:30 PM. Standby bottled water dispensers are available.",
      issuedBy: "Estate Maintenance & Health Committee"
    },
    {
      id: "ANN-289",
      title: "Monthly Mess Rebate Cut-off Reminder",
      date: "2026-10-31",
      category: "Billing",
      priority: "Normal",
      content: "All students are reminded that rebate applications must be submitted at least 24 hours prior to leave start date. Minimum leave duration for rebate eligibility is 2 days.",
      issuedBy: "Mess Accounts Section"
    }
  ],

  // Live Scanned Tokens Log (for Mess Manager scanner simulation)
  scannedTokens: [
    {
      tokenCode: "IIITB-DIN-9942",
      studentName: "Sourav Mohapatra",
      rollNo: "B121045",
      hostel: "Mahanadi (BH-1)",
      meal: "Dinner",
      timestamp: "Today, 08:12 PM",
      status: "Verified & Punched",
      counter: "Counter 1"
    },
    {
      tokenCode: "IIITB-DIN-9940",
      studentName: "Ananya Mishra",
      rollNo: "B222019",
      hostel: "Daya Hall (GH)",
      meal: "Dinner",
      timestamp: "Today, 08:05 PM",
      status: "Verified & Punched",
      counter: "Counter 2"
    },
    {
      tokenCode: "IIITB-DIN-9937",
      studentName: "Rohan Tripathy",
      rollNo: "B121092",
      hostel: "Brahmaputra (BH-2)",
      meal: "Dinner",
      timestamp: "Today, 07:54 PM",
      status: "Verified & Punched",
      counter: "Counter 3"
    }
  ]
};
