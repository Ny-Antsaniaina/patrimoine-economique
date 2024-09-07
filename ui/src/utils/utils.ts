// src/utils/utils.ts
export const renderChart = (data) => {
    // Assurez-vous que data est défini et a la structure attendue
    if (!data || !data.datasets || !Array.isArray(data.datasets)) {
        console.error('Les données du graphique sont manquantes ou mal formatées');
        return {}; // Retourne un objet vide si les données sont manquantes
    }

    // S'assure que nextDatasets est défini
    const nextDatasets = data.datasets.length > 0 ? data.datasets : [];

    // Exemple de gestion des datasets
    const chartData = {
        labels: data.labels || [], // Labels pour le graphique
        datasets: nextDatasets.map(dataset => ({
            ...dataset,
            // Ajoutez ou modifiez les propriétés du dataset ici si nécessaire
        }))
    };

    return chartData;
};
