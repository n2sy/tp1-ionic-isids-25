let inpIntitule = document.getElementById("intitule");
let inpMontant = document.getElementById("montant");
let select = document.getElementById("categorie");
let listeDepenses = document.getElementById("list-dep");
let spanTotal = document.getElementById("total-dep");

let btnAdd = document.getElementById("btn-add");
let btnErase = document.getElementById("btn-reset");

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

  let newItem = document.createElement("ion-item");
  newItem.appendChild(newBadge);
  newItem.appendChild(newLabel);
  newItem.appendChild(newIcon);

  newItem.amount = inpMontant.value;

  newIcon.addEventListener("click", () => {
    showAlert(newItem);
  });

  listeDepenses.appendChild(newItem);

  total += +inpMontant.value;
  spanTotal.textContent = `${total}¥`;
  reinit();
});

btnErase.addEventListener("click", reinit);

function reinit() {
  inpMontant.value = "";
  inpIntitule.value = "";
  select.value = "";
}

async function showAlert(itemToDelete) {
  console.log(itemToDelete);

  const alert = document.createElement("ion-alert");
  alert.header = "Supprimer une dépense";
  alert.message = "Que souhaitez-vous faire ?";
  alert.buttons = [
    {
      text: "Supprimer cette dépense",
      handler: () => {
        total -= itemToDelete.amount;
        spanTotal.textContent = `${total}¥`;
        listeDepenses.removeChild(itemToDelete);
      },
    },
    {
      text: "Supprimer toutes les dépenses",
      handler: () => {
        listeDepenses.innerHTML = ` <ion-item>
                  <ion-badge color="medium" class="category-badge"
                    >💼 Aucune dépense
                  </ion-badge>
                  <ion-label>Aucune dépense enregistrée</ion-label>
                </ion-item>`;
        total = 0;
        spanTotal.textContent = `${total}¥`;
        showNoDepenses = true;
      },
    },
    "Annuler",
  ];

  document.body.appendChild(alert);
  await alert.present();
}
