const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("./lib/inquirer");
const { _get, _post } = require("./utils/http");

(async () => {
  clear();

  console.log(
    chalk.yellow(figlet.textSync("ETNA Flemme", { horizontalLayout: "full" }))
  );

  const credentials = await inquirer.askQuestions();

  const responseIdentify = await _post(
    "https://auth.etna-alternance.net/identity",
    {
      login: credentials.username,
      password: credentials.password,
    }
  );

  const data = responseIdentify.headers["set-cookie"];
  const token = data.split(";")[0].split("=")[1];

  const responseCurrentActivities = await _get(
    "https://modules-api.etna-alternance.net/students/hanry_p/currentactivities",
    token
  );

  const module = credentials.module ? credentials.module : "TIC-PLI3";

  const resultActivitie = [];

  for (
    let index = 0;
    index < responseCurrentActivities.data[module].quest.length;
    index++
  ) {
    if (responseCurrentActivities.data[module].quest.length > 1) {
      resultActivitie.push({
        name: responseCurrentActivities.data[module].quest[1].name,
        id: responseCurrentActivities.data[module].quest[1].module_id,
      });
    } else {
      const element = responseCurrentActivities.data[module].quest[0];
      resultActivitie.push({
        id: element.module_id,
        name: element.name,
      });
    }
  }
  const responseDateDeclare = await _get(
    "https://gsa-api.etna-alternance.net/students/hanry_p/logs",
    token
  );

  const messagePersoObjectifs = `Mes objectifs sur le ${resultActivitie[0].name} aujourd'hui sont : Tout d'abord sont d'abord de finir les taches en cour du trello et ensuite faire un point avec l'equipe pour reunir nos travaux.`;
  const messagePersoActions = `J'ai travaille sur le module ${resultActivitie[0].name} aujourd'hui. j'ai pu travailler en commun avec M.Mejdi pour avancer plus vite.`;
  const messagePersoResultats = `Le projet avance bien nous avons pu mettre en oeuvre nos objectif`;

  const declaredDate = responseDateDeclare.data.contracts[0].schedules;
  for (let index = 0; index < declaredDate.length; index++) {
    const element = declaredDate[index];
    await _post(
      "https://intra-api.etna-alternance.net/modules/8859/declareLogs",
      {
        module: messagePersoResultats.id,
        declaration: {
          start: element.start,
          end: element.end,
          content: `Objectifs : ${messagePersoObjectifs}\\nActions : ${messagePersoActions}\\nRésultats : ${messagePersoResultats} \\nDifficultés rencontrées : /`,
        },
        sosJawa: false,
      },
      token
    );
  }
  console.log(chalk.redBright("Bien jouer tu as gagne 10m de ta vie"));
})();
