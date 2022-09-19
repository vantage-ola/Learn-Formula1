import React, { useState } from "react";
import { useHookstate } from '@hookstate/core';

export const useYear = () =>  {

    const presentYear = new Date().getFullYear().toString()
    const year = useHookstate(presentYear);

    const wrapState = (y) => ({
    get: () => y.value,
    select: (value) => year.set(value)
    })

    const accessYear = () => wrapState(year)

    return { accessYear };
}
