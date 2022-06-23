
export default function TooltipText (isLiked, quantityLikesPost)
{
    let text = "";
    if(quantityLikesPost === 0) return "Sem curtidas";
    
    if(isLiked) {
        if(quantityLikesPost === 1) return "Você curtiu isso.";

        if(quantityLikesPost === 2) return `Você e José curtiram isso`;

        text = `Você e José e outra(s) ${quantityLikesPost - 2} pessoa(s) curtiram isso`;
    } else {
        if(quantityLikesPost === 1) return "José curtiu isso.";
        if(quantityLikesPost === 2) return "José e um amigo curtiram isso".

        text = `José, amigo e outra(s) ${quantityLikesPost - 2} pessoa(s) curtiram isso`;
    }

    return text;
}