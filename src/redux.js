const { createSlice, configureStore } = require("@reduxjs/toolkit");

const alertSlice = createSlice({
  name: "alert",
  initialState: null,
  reducers: {
    addAlert: (state, action) => {
      //{ type: "alert/addAlert", payload:{ "color":"danger", "message":"Erreur 404"}}
      const newAlert = {
        color: action.payload.color,
        message: action.payload.message,
      };
      state = newAlert;
    },
    removeAlert: (state, action) => {
      //{ type: "alert/removeAlert", payload:null }
      state = null;
    },
  },
});

//petites fonction qui permettent de préciser uniquement le payload
export const { addAlert, removeAlert } = alertSlice.actions;

export const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
  },
});
