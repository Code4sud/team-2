export const pollutantInfo: { [key: string]: { origin: string, healthEffects: string, environmentalEffects: string } } = {
    "SO2": {
        origin: "Provient principalement de la combustion de combustibles fossiles contenant du soufre, tels que le charbon et le pétrole.",
        healthEffects: "Peut irriter les voies respiratoires, aggraver l'asthme et causer des troubles respiratoires chez les personnes sensibles.",
        environmentalEffects: "Contribue à la formation de pluies acides, qui peuvent endommager les écosystèmes et les bâtiments."
    },
    "CO2": {
        origin: "Principalement émis par la combustion de combustibles fossiles (charbon, pétrole, gaz naturel) dans l'industrie, les transports et la production d'énergie.",
        healthEffects: "En concentrations élevées, peut causer des maux de tête, des vertiges, et dans des cas extrêmes, l'asphyxie. Contribue indirectement aux problèmes de santé liés au changement climatique.",
        environmentalEffects: "Principal gaz à effet de serre responsable du réchauffement climatique. Contribue à l'acidification des océans."
    },
    "NO": {
        origin: "Formé lors de la combustion à haute température dans les moteurs de véhicules et les centrales électriques.",
        healthEffects: "Seul, il est moins nocif, mais il réagit avec l'oxygène dans l'air pour former du dioxyde d'azote (NO2), un polluant plus dangereux.",
        environmentalEffects: "Contribue à la formation de smog photochimique et de l'ozone troposphérique."
    },
    "NO2": {
        origin: "Résulte de l'oxydation du monoxyde d'azote (NO). Il provient principalement des gaz d'échappement des véhicules et des centrales thermiques.",
        healthEffects: "Irritant pour les voies respiratoires, il peut aggraver l'asthme et d'autres maladies pulmonaires.",
        environmentalEffects: "Contribue à la formation d'ozone troposphérique et de particules fines, ainsi qu'à l'acidification des écosystèmes."
    },
    "NOx": {
        origin: "Désigne l'ensemble des oxydes d'azote, dont le monoxyde d'azote (NO) et le dioxyde d'azote (NO2). Produit lors de la combustion à haute température.",
        healthEffects: "Les NOx, en particulier le NO2, sont irritants pour le système respiratoire et peuvent provoquer des affections pulmonaires.",
        environmentalEffects: "Contribuent à la formation de smog, de pluies acides et d'ozone troposphérique."
    },
    "PM10": {
        origin: "Émis par la combustion de combustibles fossiles, les activités industrielles, les véhicules, et l'érosion des sols.",
        healthEffects: "Peut pénétrer dans les voies respiratoires supérieures et aggraver les maladies respiratoires et cardiaques.",
        environmentalEffects: "Les PM10 peuvent réduire la visibilité et affecter les écosystèmes en transportant des substances toxiques."
    },
    "PM2.5": {
        origin: "Émis par les moteurs diesel, les activités industrielles, et la combustion de biomasse.",
        healthEffects: "Capables de pénétrer profondément dans les poumons, elles augmentent le risque de maladies cardiovasculaires et respiratoires, et peuvent provoquer des cancers.",
        environmentalEffects: "Peut affecter la qualité de l'air, la visibilité et le climat en modifiant la quantité d'énergie solaire atteignant la Terre."
    },
    "PM1": {
        origin: "Produites par des processus de combustion, notamment les moteurs et la combustion de biomasse.",
        healthEffects: "Pénétrant encore plus profondément dans les poumons, elles peuvent atteindre la circulation sanguine, augmentant ainsi les risques de maladies cardiaques, pulmonaires et d'autres troubles systémiques.",
        environmentalEffects: "Moins étudiées que les PM10 et PM2.5, elles sont néanmoins un facteur de pollution atmosphérique et de réduction de la visibilité."
    }
};