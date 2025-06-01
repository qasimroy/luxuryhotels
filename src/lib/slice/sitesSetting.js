import { apis } from "@component/apiendpoints/api";
import axiosInstance from "@component/hooks/AxiosInstanse";



const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getCountry = createAsyncThunk(
  "getCountry",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_COUNTRY);
    
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const get_addons_home_Data = createAsyncThunk(
    "get_addons_home_Data",
    async (args, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(apis.GETADD_ONS_HOME_DATA);
      
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  export const search_hotel = createAsyncThunk(
    "search_hotel",
    async (args, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(apis.SEARCH_HOTEL);
      
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


// Function to fetch Newly Listed Hotels
export const getNewlyListedHotel = createAsyncThunk(
  "siteContent/getNewlyListedHotel",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_NEWLY_LISTED_HOTEL);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Function to fetch Country Videos
export const getCountryVideos = createAsyncThunk(
  "siteContent/getCountryVideos",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_COUNTRY_VIDEOS);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Function to fetch Partners
export const getPartners = createAsyncThunk(
  "siteContent/getPartners",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_PARTNERS);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Function to fetch All Hotels
export const getAllHotels = createAsyncThunk(
  "siteContent/getAllHotels",
  async ({currentPage}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${apis.GET_ALL_HOTELS}?page=${currentPage}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Function to fetch Best Luxury Hotel of the Year
export const getBestLuxuryHotelOfYear = createAsyncThunk(
  "siteContent/getBestLuxuryHotelOfYear",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_BEST_LUXURY_HOTEL_OF_YEAR);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Function to fetch Upcoming Magazine
export const getUpcomingMagazine = createAsyncThunk(
  "siteContent/getUpcomingMagazine",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_UPCOMMING_MAGAZINE);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Function to fetch Latest News
export const getLatestNews = createAsyncThunk(
  "siteContent/getLatestNews",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_LATEST_NEWS);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Function to fetch Travel News
export const getTravelNews = createAsyncThunk(
  "siteContent/getTravelNews",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_TRAVEL_NEWS);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Function to fetch Exclusive Offers
export const getExclusiveOffers = createAsyncThunk(
  "siteContent/getExclusiveOffers",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_EXCLUSIVEOFFERS);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Function to fetch Home Data
export const getHomeData = createAsyncThunk(
  "siteContent/getHomeData",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_HOME_DATA);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getRommenimeties = createAsyncThunk(
  "siteContent/getRommenimeties",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_ROOM_AMIMETIES);
      console.log(data,"getRommenimeties")
      return data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getHotelHightlight = createAsyncThunk(
  "siteContent/getHotelHightlight",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_Hotel_HIGHLIGTH);
      console.log(data,"getHotelHightlight")
      return data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getHotelfacility = createAsyncThunk(
  "siteContent/getHotelfacility",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(apis.GET_HOTEL_FACILITY);
      console.log(data,"getHotelfacility")
      return data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const siteContentSlice = createSlice({
  name: "siteContent",
  initialState: {
    newlyListedHotel: [],
    countryVideos: [],
    partners: [],
    allHotels: [],
    bestLuxuryHotelOfYear: [],
    upcomingMagazine: [],
    latestNews: [],
    travelNews: [],
    exclusiveOffers: [],
    homeData: [],
    hotel_highlight: [],
    hotel_facility: [],
    room_enimities: [],
    hotel_subscription_details: [],
    loading: false,
    error: null,
    pass_files:null,
    pass_information:null,
    loading: false,
  },
  reducers: {
   setFiles:(state,action)=>{
    state.pass_files=action.payload
   },
   setPassInformation:(state,action)=>{
    state.pass_information=action.payload
   },
   updateLoading:(state,action)=>{
    state.loading=action.payload
   },
   set_hotel_subscription_details:(state,action)=>{
    state.hotel_subscription_details=action.payload
   }

  },
  extraReducers: (builder) => {
  
    builder
      // getCountry
      .addCase(getCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.loading = false;
        // Store the response data in the appropriate state
        state.countryData = action.payload;
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // get_addons_home_Data
      .addCase(get_addons_home_Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_addons_home_Data.fulfilled, (state, action) => {
        state.loading = false;
        state.addonsHomeData = action.payload;
      })
      .addCase(get_addons_home_Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // search_hotel
      .addCase(search_hotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(search_hotel.fulfilled, (state, action) => {
        state.loading = false;
        state.searchHotelResults = action.payload;
      })
      .addCase(search_hotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Add cases for other async thunks in a similar pattern

      // For example: getNewlyListedHotel, getCountryVideos, getPartners, etc.
      .addCase(getNewlyListedHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewlyListedHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.newlyListedHotel = action.payload;
      })
      .addCase(getNewlyListedHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(getCountryVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountryVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.countryVideos = action.payload;
      })
      .addCase(getCountryVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(getPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(getAllHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.allHotels = action.payload;
      })
      .addCase(getAllHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(getBestLuxuryHotelOfYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBestLuxuryHotelOfYear.fulfilled, (state, action) => {
        state.loading = false;
        state.bestLuxuryHotelOfYear = action.payload;
      })
      .addCase(getBestLuxuryHotelOfYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(getLatestNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLatestNews.fulfilled, (state, action) => {
        state.loading = false;
        state.latestNews = action.payload;
      })
      .addCase(getLatestNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(getUpcomingMagazine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcomingMagazine.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMagazine = action.payload;
      })
      .addCase(getUpcomingMagazine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(getTravelNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTravelNews.fulfilled, (state, action) => {
        state.loading = false;
        state.travelNews = action.payload;
      })
      .addCase(getTravelNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(getExclusiveOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExclusiveOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.exclusiveOffers = action.payload;
      })
      .addCase(getExclusiveOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(getHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.homeData = action.payload;
      })
      .addCase(getHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(getRommenimeties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRommenimeties.fulfilled, (state, action) => {
        state.loading = false;
        state.room_enimities = action.payload;
      })
      .addCase(getRommenimeties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(getHotelHightlight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHotelHightlight.fulfilled, (state, action) => {
        state.loading = false;
        
        state.hotel_highlight = action.payload;
      })
      .addCase(getHotelHightlight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      
      .addCase(getHotelfacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHotelfacility.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload,"action.payload")
        state.hotel_facility = action.payload;
      })
      .addCase(getHotelfacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const siteContentActions = siteContentSlice.actions;
const SiteSettingReducer = siteContentSlice.reducer;
export default SiteSettingReducer;
