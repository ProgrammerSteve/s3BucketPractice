const imageForm = document.querySelector("#imageForm");
const imageInput = document.querySelector("#imageInput");

imageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  //get a secure url from our server
  const file = imageInput.files[0];
  console.log("Filename:", file.name);
  console.log("Type:", file.type);
  console.log("Size:", file.size + " bytes");
  const { url } = await fetch("http://localhost:8080/s3Url").then((res) =>
    res.json()
  );
  console.log(url);

  //post the image directly to the s3 bucket

  if (file.type === "image/jpeg") {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: file,
    });
  } else {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
  }

  const imageUrl = url.split("?")[0];
  console.log("s3 image url:", imageUrl);

  //post request to my server to store extra data
  const img = document.createElement("img");
  img.src = imageUrl;
  document.body.appendChild(img);
});
