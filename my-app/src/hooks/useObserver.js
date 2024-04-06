import {useEffect, useRef} from "react"

export const useObserver = (ref, canLoad, isLoading, onIntersecting) => {
    const observer = useRef();
    useEffect(
        () => {
          //console.log('useEffect')
          if(isLoading) return;
          if(observer.current) observer.current.disconnect()
          var callback = (entries, observer) => {
            if(entries[0].isIntersecting && canLoad){
              //console.log(page)
              onIntersecting()
            }  
          };
          observer.current = new IntersectionObserver(callback);
          observer.current.observe(ref.current)
        }, [isLoading]
      )
}