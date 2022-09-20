import React, { useState } from "react";
import { useHookstate } from '@hookstate/core';
import { localstored } from '@hookstate/localstored';

export const useYear = () =>  {

    const presentYear = new Date().getFullYear().toString()
    const year = useHookstate(presentYear, localstored({
        // key is optional,
        // if it is not defined, the extension requires and
        // uses the identifier from the @hookstate/identifiable
        key: 'state-key'
    }));

    const wrapState = (y) => ({
    get: () => y.value,
    select: (value) => year.set(value)
    })

    const accessYear = () => wrapState(year)

    return { accessYear };
}
