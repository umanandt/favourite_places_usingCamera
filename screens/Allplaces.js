import PlacesList from "../components/Places/PlacesList";
import { useIsFocused, use } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function Allplaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

 // const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    //  setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);
  return <PlacesList listofPlaces={loadedPlaces} />;
}

export default Allplaces;
