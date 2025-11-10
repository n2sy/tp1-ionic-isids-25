let inpIntitule = document.getElementById("intitule");
let inpMontant = document.getElementById("montant");
let select = document.getElementById("categorie");
let listeDepenses = document.getElementById("list-dep");
let spanTotal = document.getElementById("total-dep");

let btnAdd = document.getElementById("btn-add");

let showNoDepenses = true;

const categoriesConfig = {
  alimentation: { emoji: "🍽️", label: "Alimentation", color: "success" },
  transport: { emoji: "🚗", label: "Transport", color: "primary" },
  loisirs: { emoji: "🎮", label: "Loisirs", color: "warning" },
  sante: { emoji: "⚕️", label: "Santé", color: "danger" },
  education: { emoji: "📚", label: "Éducation", color: "tertiary" },
  autres: { emoji: "📦", label: "Autres", color: "secondary" },
};
let total = 0;
btnAdd.addEventListener("click", () => {
  if (showNoDepenses) {
    listeDepenses.innerHTML = "";
    showNoDepenses = false;
  }

  let newBadge = document.createElement("ion-badge");
  newBadge.textContent = `${categoriesConfig[select.value].emoji} ${
    categoriesConfig[select.value].label
  }`;
  newBadge.color = categoriesConfig[select.value].color;
  newBadge.className = `category-${select.value} category-badge`;

  let newLabel = document.createElement("ion-label");
  newLabel.textContent = `${inpIntitule.value} : ${inpMontant.value}¥`;

  let newIcon = document.createElement("ion-icon");
  newIcon.name = "close-outline";
  newIcon.color = "danger";
  newIcon.addEventListener("click", showAlert);

  let newItem = document.createElement("ion-item");
  newItem.appendChild(newBadge);
  newItem.appendChild(newLabel);
  newItem.appendChild(newIcon);

  listeDepenses.appendChild(newItem);

  total += +inpMontant.value;
  spanTotal.textContent = `${total}¥`;
});

async function showAlert() {
  const alert = document.createElement("ion-alert");
  alert.header = "Supprimer une dépense";
  alert.message = "Que souhaitez-vous faire ?";
  alert.buttons = [
    {
      text: "Oui",
      handler: () => {
        console.log("Click sur oui");
      },
    },
    {
      text: "Non",
      handler: () => {
        console.log("Click sur Non");
      },
    },
  ];

  document.body.appendChild(alert);
  await alert.present();
}
