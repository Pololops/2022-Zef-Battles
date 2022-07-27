const date = new Date();

// ? Pour afficher la date et l'heure en français :
const localDate = date.toLocaleString('fr-FR', {
	dateStyle: 'full',
	timeStyle: 'medium',
});
