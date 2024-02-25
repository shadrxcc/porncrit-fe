import {
    Action,
    ThunkAction,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./auth-services/slice";

interface NoopStorage {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<string>;
    removeItem(key: string): Promise<void>;
}

const rootReducer = combineReducers({
    auth: authReducer,
});

const createNoopStorage = (): NoopStorage => {
    return {
        getItem(): Promise<string | null> {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string): Promise<string> {
            return Promise.resolve(value);
        },
        removeItem(): Promise<void> {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    RootStateType,
    unknown,
    Action
>;

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type StoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export default store;
