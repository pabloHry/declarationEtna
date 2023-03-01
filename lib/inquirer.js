const inquirer = require("inquirer");

module.exports = {
  askQuestions: () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "Quel est votre login Etna",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Veuillez entrer votre login Etna";
          }
        },
      },
      {
        name: "password",
        type: "password",
        message: "Quel est votre mot de passe Etna",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Veillez entrer votre mot de passe Etna";
          }
        },
      },
      {
        name: "module",
        type: "input",
        message:
          "Quelle est le module que vous voulez declarer (laisser vide par default PLI):",
      },
      {
        name: "messagePersonnalise",
        type: "input",
        message:
          "Quelle est le message que vous voulez envoyer (laisser vide pour un message par default serieux) ?",
      },
    ];
    return inquirer.prompt(questions);
  },
};
