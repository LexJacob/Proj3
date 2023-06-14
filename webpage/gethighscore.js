export const ShrekGet = "${aws_api_gateway_rest_api.shrek.execution_arn}/*/*/*";

export async function getHighScore() {
  try {
    const response = await fetch(ShrekGet);
    const data = await response.json();

    // Map each object in the data array to a new object with properties playername and highscore
    const HighScore = data.map(item => ({
      PlayerName: item.PlayerName.S,
      HighScore: parseInt(item.HighScore.N)
    }));

    return HighScore;
  } catch (error) {
    console.log(error);
    return null;
  }
}
getHighScore().then((data) => console.log(data)).catch((error) => console.error(error));