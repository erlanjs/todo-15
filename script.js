const LIST_USERS_API = "https://64340de21c5ed06c958dd2da.mockapi.io/users";
const listUsers = document.querySelector(".list");
const input = document.querySelector(".form input");
const addButton = document.querySelector(".form button");
let inputValue = input.value;

input.addEventListener("keyup", (e) => {
  inputValue = e.target.value;
});

addButton.addEventListener("click", () => {
  const dataPost = {
    name: input.value,
    id: new Date().getTime(),
  };

  fetch(LIST_USERS_API, {
    method: "POST",
    body: JSON.stringify(dataPost),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then(() => getUsersRequest());
});

function getUsersRequest() {
  fetch(LIST_USERS_API)
    .then((data) => data.json())
    .then((data) => {
      listUsers.innerHTML = "";

      data.map((user) => {
        const item = document.createElement("div");
        item.classList.add("item");

        const h3 = document.createElement("h3");

        h3.textContent = user.name || "";

        // const button = document.createElement("button");
        // button.textContent = "Delete";

        item.append(h3);
        // item.append(button);

        // button.addEventListener("click", () => {
        //   fetch(`${LIST_USERS_API}/${user.id}`, {
        //     method: "DELETE",
        //   })
        //     .then((data) => data.json())
        //     .then(() => getUsersRequest());
        // });

        listUsers.append(item);
      });
    });
}

getUsersRequest();
