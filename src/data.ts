
export const ABIDJAN = {
    "Abobo": ["Abobo Baoulé", "Abobo Gare", "Avocatier", "Banco", "Derrière Rails", "Dokui", "M'Pouto", "N'Dotré", "PK 18", "Sagbé", "Sogefiha", "Williamsville", "Autre"],
    "Adjamé": ["Adjamé Liberté", "Adjamé Village", "Anador", "Bracodi", "Carrefour", "Château", "Renouard", "Williamsville", "Autre"],
    "Attécoubé": ["Attécoubé", "Boribana", "Fleurier", "Klamé", "Résidentiel", "Santé", "Autre"],
    "Cocody": ["Angré", "Blockhauss", "Bonoumin", "Deux Plateaux", "Djibi", "Mermoz", "Riviera 1", "Riviera 2", "Riviera 3", "Riviera 4", "Saint-Jean", "Université", "Autre"],
    "Koumassi": ["Koumassi Campement", "Koumassi Centre", "Koumassi Garage", "Koumassi Prodomo", "Koumassi Remblai", "Résidentiel", "Autre"],
    "Marcory": ["Anoumabo", "Biétry", "Marcory Résidentiel", "Marcory Sans Fil", "Zone 4", "Autre"],
    "Plateau": ["Administratif", "Commerce", "Centre", "Hôtel de Ville"],
    "Port-Bouët": ["Aéroport", "Gonzagueville", "Koumassi Plage", "Petit Bassam", "Port-Bouët Village", "Vridi", "Autre"],
    "Treichville": ["Arras", "Résidentiel", "Treichville Centre", "Zone Industrielle", "Autre"],
    "Yopougon": ["Andokoi", "Banco", "Doukouré", "Ficgayo", "Kouté", "Millionnaire", "Niangon", "Selmer", "Siporex", "Toits Rouges", "Wassakara", "Zone Industrielle", "Autre"],
    "Bingerville": ["Bingerville Centre", "abatta", "Cité SIR", "Moossou", "Autre"],
    "Songon": ["Songon Agban", "Songon Kassemblé", "Songon Village", "Autre"],
} as const

export type Commune = keyof typeof ABIDJAN
export type Quartier = typeof ABIDJAN[Commune][number]

export const COMMUNES = Object.keys(ABIDJAN) as Commune[]