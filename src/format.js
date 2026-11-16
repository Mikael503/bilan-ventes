export const USD_TO_FCFA = 600;
export default function fcfa(montantEnDollars){
    const montantEnFcfa = Math.round(montantEnDollars * USD_TO_FCFA);
    return `${new Intl.NumberFormat('fr-FR').format(montantEnFcfa)} FCFA`;
}