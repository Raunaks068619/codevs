
"use client";
import React,{ useState, useEffect } from 'react'

function useLoader(){
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const showLoader = (truth:boolean ) => {
        setIsLoading(truth)
    }

    useEffect(() => {
      if(isLoading) document.body.style.overflow ='hidden';
      else document.body.style.overflow ='noset';
    }, [isLoading])
    

    return { 
        showLoader: showLoader,
        isLoading: isLoading || false
    }
}

export default useLoader;