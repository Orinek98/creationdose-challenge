import React,{useState, useEffect} from "react";

export const StoreContext = React.createContext(null);
export default ({ children }) => {
    const [favourite, setFavourites] = useState( () => {
        const saved = localStorage.getItem("Favourite");
        const initialValue = JSON.parse(saved);
        return initialValue || []
    });

    useEffect(() => {
        localStorage.setItem("Favourite", JSON.stringify(favourite));
    },[favourite]);

    //console.log(Favourite)

    const addFavourite = async (movie) =>{
        if(!favourite.find(x => x.id === movie.id)){
            setFavourites(prev => [...prev, movie]);
        }
        else{
            setFavourites(favourite.filter(x => x.id!==movie.id));
        }
    }

    const store = {
        favourite: [favourite, setFavourites],
        storage: useEffect,
        addOrRemove: addFavourite
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}