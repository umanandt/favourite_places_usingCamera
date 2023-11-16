const GOOOGLE_API_KEY = "API key";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},{$lng}&zoom=14&size=400*200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOOGLE_API_KEY}`;
  return imagePreviewUrl();
}

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
