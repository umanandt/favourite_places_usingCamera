import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHnadler(place) {
    await insertPlace(place)
    navigation.navigate("AllPlaces");
  }
  return <PlaceForm onCreatePlace={createPlaceHnadler} />;
}

export default AddPlace;
