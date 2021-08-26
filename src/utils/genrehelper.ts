export const getColorFromName = (genre: string): string => {
  allGenres.add(genre)

  switch(genre.toLowerCase()) {
    case "adventure":
      return "#F94144";

    case "drama":
      return "#F3722C";

    case "fantasy":
      return "#90BE6D";

    case "psychological":
      return "#F9844A";

    case "supernatural":
      return "#F9C74F";

    case "mecha":
      return "#90BE6D";

    case "sci-fi":
      return "#43AA8B";

    case "comedy":
      return "#4D908E";

    case "romance":
      return "#ff7096";

    case "slice of life":
      return "#F9C74F";

    case "action":
      return "#277DA1";

    case "horror":
      return "#014f86";

    case "mystery":
      return "#90BE6D";

    case "ecchi":
      return "#F3722C";

    case "sports":
      return "#F8961E";

    default:
      return "maroon";
  }

}

export const getGenres = () => {
  return allGenres
}

const allGenres = new Set()