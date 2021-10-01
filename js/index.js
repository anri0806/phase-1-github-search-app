document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector("#github-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    //User Search Endpoint//
    fetch("https://api.github.com/search/users?q=octocat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        //console.log(userData)
        userData.items.forEach((item) => {
          if (e.target.search.value === item.login) {
            let userList = document.querySelector("#user-list");
            userList.innerHTML = `
                 <li id="user-btn"> ${item.login} </li>
                 <img src="${item.avatar_url}"/>
                 <li> Link: ${item.url} </li>
                `;

            //User Repos Endpoint//
            let userBtn = document.querySelector("#user-btn");
            userBtn.addEventListener("click", function (e) {
              fetch("https://api.github.com/users/octocat/repos", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/vnd.github.v3+json",
                },
              })
                .then((response) => response.json())
                .then((repoData) => {
                  repoData.forEach((item) => {
                    //console.log(item.owner.login)
                    if (userBtn.innerText === item.owner.login) {
                      let repoList = document.querySelector("#repos-list");
                      repoList.innerHTML = `
                          <li> ${item.owner.url}</li>
                          <li> ${item.owner.html_url}</li>
                          <li> ${item.teams_url}</li>
                        `;
                    }
                  });
                });
            });
          }
        });
      });
  });
});
