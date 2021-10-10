class Location {
  constructor({
    lat = 0.0,
    lng = 0.0,
    description = "",
    id = "",
    code = "",
    formatted_address = "",
  }) {
    this.lat = lat;
    this.lng = lng;
    this.description = description;
    this.id = id;
    this.code = code;
    this.formattedAddress = formatted_address;
  }
}

export default Location;

// if formattedAddress.includes('description') ==> only formattedAddress. else: description + " " + formattedAddress
// (line before)+"::"+lat+","+lng
