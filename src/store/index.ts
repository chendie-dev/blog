import {
  configureStore
} from '@reduxjs/toolkit'
import modelStatusReducer from './ModelStatusSlice'
const store = configureStore({
  reducer: {
    modelStatus: modelStatusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch