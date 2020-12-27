const baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=2319bf7a9b5a4e6cd5d19fdb546566d9";

let d = new Date();
let newDate = (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear();

document.querySelector("#generate").addEventListener("click", performAction);

function performAction(e) {
  e.preventDefault();
  const newZip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  getWeather(baseURL, newZip, apiKey)
    .then(function(data) {
      console.log(data);
      const temp = data.main.temp;
      return projectData("/add", { temp, date: newDate, content });
    })
    .then(updateUI);
}


const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};


 
 
const projectData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content
    })
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
  //  console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("error", error);
  }
};

  