"use client"

import store from '@/services/config-store'
import React from 'react'
import { Provider } from 'react-redux'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>
        {children}
    </Provider>
}

export default AppLayout
